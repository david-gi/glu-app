'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Sum report ratings for a place when a new report is made and add points
exports.sumRatings = functions.firestore.document('reports/{report}')
    .onWrite((change, context) => {
        //points
        var userRef = admin.firestore().collection('users').doc(change.after.data().user.id)
        userRef.get()
        .then(res => {
            var oldPoints = res.data().points
            var increment = 10
            var newPoints = oldPoints && isFinite(oldPoints) ? Number(oldPoints) + increment : increment
            userRef.set({points: newPoints}, { merge: true })

            //rating
            var placeRef = admin.firestore().collection('places').doc((change.after.data().place || change.before.data().place).id)
            return admin.firestore().collection('reports')
                .where('place', '==', placeRef).get()
                .then(ss => {
                    var sum = 0
                    var count = ss.size
                    ss.forEach(r => { sum = sum + Number(r.data().rating); })

                    if(count > 0){
                        var newRating = Math.floor(sum / count)
                        newRating = isNaN(newRating) ? 0 : newRating
                        if(newRating < 1) newRating = 1;
                        if(newRating > 5) newRating = 5;
                        placeRef.set({rating: newRating}, { merge: true })
                        .catch(e => console.log(e))
                    }
                    return Promise.resolve(null)
                })
                .catch(e => {
                    console.log(e);
                })
            })
            .catch(e => {
                console.log(e);
            })
            return Promise.resolve(null)
    })
exports.sponsorClick = functions.https.onRequest((req, res) => {
    console.log(req.query)
    var ref = admin.firestore().collection("sponsors").doc(req.query.x)
    ref.get().then(r => {
        if(r.exists){
            var s = r.data()
            var newClicks = s.clicks ? s.clicks + 1 : 1
            ref.set({clicks: newClicks}, { merge: true })
        }
        res.send("OK")
        return
    })
    .catch(e => {
        console.log(e);
    })
    return
})