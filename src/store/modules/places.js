import firebase from 'firebase'

const state = {
	currentPlace: null,
	reports: null,
}

const mutations = {
	'setCurrentPlace' (state, x) {
		state.currentPlace = x
	},
	'setReports' (state, x) {
		state.reports = x
	},
}

const actions = {
	getPlace: (context, pid) => {
		var id = pid.trim()
		if(id != null && id != ""){
			var placeRef = context.rootState.placesRef.doc(id)
			placeRef.get()
				.then(res => {
					if(res.exists){
						context.commit("setCurrentPlace", res.data())
						context.dispatch("getReports", placeRef)
					} else {
						//context.dispatch("newPlace", id)
						context.commit("setCurrentPlace", {})
					}
				})
				.catch(e => console.log(e+""))
		}
	},
	getReports: (context, placeRef) => {
		context.rootState.reportsRef.where("place", "==", placeRef).orderBy("created", "desc").get()
			.then(ss => {
				var reports = []
				var i = ss.size
				ss.forEach(doc => {
					var r = doc.data()
					context.rootState.usersRef.doc(r.user.id).get()
						.then(u => { 
							reports.push({rating: r.rating, note: r.note, created: r.created, user: u.data()})
							if(--i == 0){
								context.commit("setReports", reports)
							}
						})
				})
			})
			.catch(e => console.log(e+""))
	},
	// loadPlaceTypes: (context) => {
	// 	if(state.placeTypes == null){
	// 		context.rootState.placeTypesRef.get()
	// 		.then(res => {
	// 			context.commit('setPlaceTypes', res.docs)
	// 		})
	// 	}
	// },
}

const getters = {
	currentPlace: state => {
		return state.currentPlace
	},
	reports: state => {
		return state.reports
	}
}

export default {
	state,
	mutations,
	actions, 
	getters
}