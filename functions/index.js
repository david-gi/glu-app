'use strict'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// Sum report ratings for a place when a new report is made and add points
exports.sumRatings = functions.firestore.document('reports/{report}')
    .onWrite((change, context) => {
        //user points
        var tally = (o, inc) => { o && isFinite(o) ? Number(o) + inc : inc }
        var userRef = admin.firestore().collection('users').doc(change.after.data().user.id)
        userRef.get()
        .then(res => {
            var oPoints = res.data().points
            userRef.set({
                points: tally(newPoints, 10),
            }, { merge: true })

            //place rating and tags
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
                    }
                    return placeRef.get().then(place => {
                        var oDedicatedCount = place.data().dedicatedCount
                        var oPDedicatedCount = place.data().oPDedicatedCount
                        var oMenuCount = place.data().menuCount
                        var oLabellingCount = place.data().labellingCount

                        placeRef.set({
                            rating: newRating,
                            dedicatedCount: change.after.data().dedicated ? tally(oDedicatedCount, 1)  : 0,
                            pDedicatedCount: change.after.data().pDedicated ? tally(oPDedicatedCount, 1) : 0,
                            menuCount: change.after.data().menuCount ? tally(oMenuCount, 1) : 0,
                            labellingCount: change.after.data().oLabellingCount ? tally(oLabellingCount, 1) : 0,
                        }, { merge: true })

                        return Promise.resolve(null)
                    })
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