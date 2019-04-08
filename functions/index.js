'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Sum report ratings for a place when a new report is made
exports.sumRatings = functions.firestore.document('reports/{report}')
    .onWrite((change, context) => {
        var placeRef = admin.firestore().collection('places').doc((change.after.data().place || change.before.data().place).id)
        admin.firestore().collection('reports')
            .where('place', '==', placeRef).get()
            .then(ss => {
                var sum = 0
                var count = ss.size
                ss.forEach(r => { sum = sum + Number(r.data().rating); })

                if(count > 0){
                    var newRating = Math.floor(sum / count)
                    if(newRating < 1) newRating = 1;
                    if(newRating > 5) newRating = 5;
                    placeRef.set({rating: newRating == NaN ? 0 : newRating}, { merge: true })
                    .catch(e => console.log(e))
                }
            })
            .catch(e => console.log(e))
        return Promise.resolve(null)
    })