import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

import user from './modules/user'
import places from './modules/places'

Vue.use(Vuex)

//firebase init
const db = firebase.initializeApp({
	apiKey: "AIzaSyAkl-CZ-sBxtpzN-zrB80Efn2zKMBI-bTc",
	authDomain: "glu-base.firebaseapp.com",
	databaseURL: "https://glu-base.firebaseio.com",
	projectId: "glu-base",
	storageBucket: "glu-base.appspot.com",
	messagingSenderId: "940963835002"
}).firestore()

var store = new Vuex.Store({
	state: {
		usersRef: db.collection("users"),
		conditionsRef: db.collection("conditions"),
		placesRef: db.collection("places"),
		placeTypesRef: db.collection("place-types"),
		reportsRef: db.collection("reports"),
		bugsRef: db.collection("bugs"),
		
		auth: false,
		msg: null,
		error: null,
		showProfile: false,
		loading: false
	},
	mutations: {
		setAuth (state, x) {
		  state.auth = x
		},
		setMsg (state, x) {
		  state.msg = x
		  setTimeout(() => {
			state.msg = null
		  }, 3000);
		},
		setError (state, x) {
		  state.error = x
		  setTimeout(() => {
			state.error = null
		  }, 8000);
		},
		setLoading (state, x) {
		  state.loading = x
		},
		toggleProfile (state) {
		  state.showProfile = !state.showProfile
		},
	},
	actions: {
		setAuth ({commit}, x){
			commit("setAuth", x)
		},
		setMsg ({commit}, x){
			commit("setMsg", x)
		},
		errorMsg ({commit}, x){
			commit("setError", x)
		},
		loading1 ({commit}){
			commit("setLoading", true)
		},
		loading0 ({commit}){
			commit("setLoading", false)
		},
		toggleProfile ({commit}){
			commit("toggleProfile")
		},
	},
	getters:{
		showProfile: state => {
			return state.showProfile
		},
		error: state => {
			return state.error
		},
	},
	modules: {
		user,
		places,
	},
})
export default store