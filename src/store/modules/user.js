import firebase from 'firebase'

const state = {
	profile: { id: null, email: "", name: "", condition: null },
	conditions: null,
}

const mutations = {
	'setProfile' (state, x) {
		state.profile = x
	},
	'setConditions' (state, x) {
		state.conditions = x
	},
}

const actions = {
	doLogin: (context) => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                var docRef = context.rootState.usersRef.doc(res.user.uid)
				docRef.get()
					.then(p => {
						if(p.exists){
							var refreshProfile = { email: res.user.email, name: res.user.displayName, photoURL: res.user.photoURL, condition: p.data().condition }
							docRef.set(refreshProfile, { merge: true })
							context.commit('setProfile', refreshProfile)
							context.commit('setAuth', true)
							if(p.data().condition == null){ context.commit('toggleProfile') }
						} else{
							var newProfile = { email: res.user.email, name: res.user.displayName, photoURL: res.user.photoURL, condition: null }
							docRef.set(newProfile)
							console.log("New user created")
							context.commit('setProfile', newProfile)
							context.commit('toggleProfile')
							context.commit('setAuth', true)
						}
					})
            })
			.catch(e => { console.log("Auth Failed: " + e) })			
	},
	autoLogin: (context, uid) => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('autologin...')
				var docRef = context.rootState.usersRef.doc(user.uid)
				docRef.get()
					.then(p => {
						if(p.exists){
							var refreshProfile = { email: user.email, name: user.displayName, photoURL: user.photoURL, condition: p.data().condition }
							docRef.set(refreshProfile, { merge: true })
							context.commit('setProfile', refreshProfile)
							context.commit('setAuth', true)
							if(p.data().condition == null){ context.commit('toggleProfile') }
						}
					})
			}
		})
	},
	loadConditions: (context) => {
		if(state.conditions == null){
			context.rootState.conditionsRef.get()
				.then(cnds => {
					context.commit('setConditions', cnds.docs.reverse())
				})
		}
	},
	saveProfile: (context, cndId) => {
		var docRef = context.rootState.usersRef.doc(firebase.auth().currentUser.uid)
		docRef.get()
			.then(res => {
				if(res.exists){
					var cnd = context.rootState.conditionsRef.doc(cndId)
					context.state.profile.condition = cnd
					docRef.set({condition: cnd}, { merge: true })
					context.commit("setProfile", context.state.profile)
					context.commit('setMsg', 'Saved!')
				} else {
					throw "User does not exist!"
				}
			})
			.catch(e => console.log(e))
	},
	logout: (context) => {
		firebase.auth().signOut().then(() => {
			console.log("logged out")
			context.commit('setAuth', false)
			context.commit('toggleProfile')
			context.commit("setProfile", { id: null, email: "", name: "", condition: null })
			context.commit('setMsg', 'Signed out!')
		})
	}
}

const getters = {
	profile: state => {
		return state.profile
	},
	conditions: state => {
		return state.conditions
	},
}

export default {
	state,
	mutations,
	actions, 
	getters
}


		//**Clear Firestore** CANNOT BE UNDONE!
		// context.rootState.reportsRef.get()
		// 	.then(x => {
		// 		console.log("reports"+x.docs.length)
		// 		x.docs.forEach(d => {
		// 			context.rootState.reportsRef.doc(d.id).delete()
		// 		})
		// 		context.rootState.placesRef.get()
		// 			.then(y => {
		// 				console.log("places"+y.docs.length)
		// 				y.docs.forEach(d => {
		// 					context.rootState.placesRef.doc(d.id).delete()
		// 				})
		// 				context.rootState.usersRef.get()
		// 					.then(z => {
		// 						console.log("users"+z.docs.length)
		// 						z.docs.forEach(d => {
		// 							context.rootState.usersRef.doc(d.id).delete()
		// 						})
		// 					})
		// 			})
		// 	})
		// 	.catch(e => { console.log(e) })
		//////////////////////////////////////