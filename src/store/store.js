import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import VuexPersist from 'vuex-persist';

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
		itemsRef: db.collection("items"),
		
		auth: false,
		msg: null,
		error: "!",
		showProfile: false,
		loading: false
	},
	mutations: {
		setAuth (state, x) {
		  state.auth = x
		},
		setError (state, x) {
		  state.error = x
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
		errorMsg ({commit}, x){
			commit("setError", x)
			setTimeout(() => {
				commit("setError", "")
			}, 10000);
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
	plugins: [
		new VuexPersist({
			key: 'vuex',
			storage: window.localStorage
		}).plugin
	]
})
export default store