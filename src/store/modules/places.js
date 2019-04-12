import firebase from 'firebase'

const state = {
	currentPlace: null,
	reports: null,
	reportsFiltered: null,
	placeTypes: null,
	reportedPlaceIds: []
}

const mutations = {
	'setCurrentPlace' (state, {x, id}) {
		x["id"] = id
		state.currentPlace = x
	},
	'clearCurrentPlace' (state) {
		state.currentPlace = null
	},
	'setReports' (state, x) {
		state.reports = x
		state.reportsFiltered = x
	},
	'setReportsFiltered' (state, x) {
		state.reportsFiltered = x
	},
	// 'pushReport' (state, x) {
	// 	if(state.reports){ state.reports.unshift(x) }
	// 	else { state.reports = [x] }
	// 	state.reports = state.reports
	// },
	'setPlaceTypes' (state, x) {
		state.placeTypes = x
	},
	'addReportedPlaceId' (state, x){
		state.reportedPlaceIds.push({id: x, date: Date.now()})
	}
}

const actions = {
	clearPlace: (context) => {
		context.commit("clearCurrentPlace")
	},
	getPlaceRatings: (context, ratingDict) => {
		var res = { }
		var count = 0;
		var length = ratingDict.length
		return new Promise((resolve, reject) => {
			ratingDict.forEach(function(key){
				//TODO - change to  where query
				context.rootState.placesRef.doc(key).get()
					.then(p => {
						count++;
						if(p.exists){
							res[key] = p.data().rating
						} else {
							res[key] = 0 //Math.round(Math.random() * 10 /2)
						}
						if(count == length){
							resolve(res)
						}
					})
					.catch(e =>{ console.log(e+""); reject(e);})
			})
		})
		.catch(e =>{ console.log(e+""); })
	},
	getPlace: (context, {pid, pname, pcity, pprovince, pcountry}) => {
		var id = pid.trim()
		if(id != null && id != ""){
			var placeRef = context.rootState.placesRef.doc(id)
			placeRef.get()
				.then(res => {
					if(res.exists){ 
						context.commit("setCurrentPlace", {x: res.data(), id: id})
						context.dispatch("getReports", placeRef)
					} else {
						var newPlace = {
							name: pname,
							city: pcity,
							province: pprovince,
							country: pcountry,
							rating: 0
						}
						placeRef.set(newPlace).then(()=>{
							context.commit("setReports", [])
							context.commit("setCurrentPlace", {x: newPlace, id: id})
						})
					}
				})
				.catch(e => console.log(e+""))
		}
	},
	getReports: (context, placeRef) => {
		context.rootState.reportsRef.where("place", "==", placeRef).orderBy("created", "desc").get()
			.then(ss => {
				context.commit("setReports", [])
				var reports = []
				var i = ss.size;
				ss.forEach(doc => {
					var r = doc.data()
					context.rootState.usersRef.doc(r.user.id).get()
						.then(u => { 
							var user = u.data()
							reports.push({rating: r.rating, note: r.note, created: r.created, 
								user: { name: user.name, condition: user.condition, points: user.points, photoURL: user.photoURL } })
							if(--i == 0){
								context.commit("setReports", reports)
							}
						})
				})
			})
			.catch(e => console.log(e+""))
	},
	filterReports:(context, query) => {
		var q = query.trim().toLowerCase()
		var filtered = context.state.reports.filter(r => {
			if(q.indexOf(" star") != -1){
				switch (q){
					case "1 star":
						return r.rating == 1;
					case "2 star":
						return r.rating == 2;
					case "3 star":
						return r.rating == 3;
					case "4 star":
						return r.rating == 4;
					case "5 star":
						return r.rating == 5;
					case "1 stars":
						return r.rating == 1;
					case "2 stars":
						return r.rating == 2;
					case "3 stars":
						return r.rating == 3;
					case "4 stars":
						return r.rating == 4;
					case "5 stars":
						return r.rating == 5;
				}
			} else{
				return r.note.toLowerCase().indexOf(q) != -1
			}
		})
		context.commit("setReportsFiltered", filtered)
	},
	addReport: (context, report) => {
		var uid = firebase.auth().currentUser.uid
		var repRef = context.rootState.reportsRef

		var place = context.rootState.placesRef.doc(report.place)
		var user = context.rootState.usersRef.doc(uid)
			
		var newReport = {
			note: report.note,
			rating: report.rating,
			place: place,
			user: user,
			created: firebase.firestore.FieldValue.serverTimestamp()
		}
		repRef.add(newReport).then(()=>{
			context.commit('addPoints')
			context.commit('addReportedPlaceId', place.id)
			context.dispatch("getReports", place)
			context.commit('setMsg', 'Report added!')
		})
		.catch(e => console.log(e));
	},
	loadPlaceTypes: (context) => {
		if(state.placeTypes == null){
			context.rootState.placeTypesRef.get()
			.then(res => {
				context.commit('setPlaceTypes', res.docs)
			})
		}
	},
}

const getters = {
	currentPlace: state => {
		return state.currentPlace
	},
	placeTypes: state => {
		return state.placeTypes
	},
	reports: state => {
		return state.reports
	},
	reportsFiltered: state => {
		return state.reportsFiltered
	},
	reportedPlaceIds: state => {
		var ids = []
		state.reportedPlaceIds.forEach(x => {
			if(x.date - Date.now() < 86400000){
				ids.push(x.id)
			}
		});
		return ids;
	}
}

export default {
	state,
	mutations,
	actions, 
	getters
}