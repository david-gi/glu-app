<template>
		<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light border" style="min-width:340px;">
		    <div class="navbar-header">
		      <span class="navbar-brand text-success">
						<i class="glu-font d-block float-left" style="line-height:.8em">GLUTENOUS!</i><br> 
						<small class="font-weight-light text-black-50 d-block float-left mt-n2 ml-1" style="line-height:.1em">
							<small> 

								<span class="d-sm-none" style="font-size:.8em">
									<span class="txt-rotate" data-period="2000"></span>
									 Maps<span style="font-size:.8em">™</span>
									</span>

								<span class="d-none d-sm-inline">
									<span class="txt-rotate" data-period="2000">Gluten-Free</span>
									 Maps<span style="font-size:.8em">™</span>
									</span>

							</small>
						</small>
					</span>
		    </div>

		    <div class="collapse navbar-collapse clearfix mr-3 border-right" id="navCollapse">
		      	<ul class="nav navbar-nav justify-content-end col-12">
							
		      		<div class="nav-link" style="cursor:pointer">
								<a href="https://www.facebook.com/Glutenous-Gluten-Maps-281841432706483/" target="_blank" class="nav-item">
									<img title="facebook" class="mr-n1" src="/src/assets/f.png"/>
								</a>
								<a href="https://twitter.com/GlutenousMaps" target="_blank" class="nav-item ml-1">
									<img title="twitter" src="/src/assets/tw.png"/>
								</a>
		      		</div>

		      		<div class="nav-link " style="cursor:pointer" >
								<a @click="navAbout" class="nav-item text-muted font-weight-lighter">
									<small>About</small>
								</a>
							</div>
		      		<div class="nav-link" style="cursor:pointer">
								<a @click="navLearn" class="nav-item text-muted font-weight-lighter"><small>Learn</small></a>
		      		</div>
							
		      	</ul>
		    </div>

				<button class="navbar-toggler p-0 mr-4 position-absolute" :class="{'on': isLoggedIn, 'off': !isLoggedIn}" type="button" data-toggle="collapse"
					data-target="#navCollapse" aria-controls="navCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<span class="navbar-text " data-toggle="collapse">
					<button id="loginBtn" class="border border-primary bg-white pb-1 rounded btn-link text-primary ht" style="cursor:pointer"
						v-show="!isLoggedIn" @click="openLogin()" data-toggle="tooltip" data-placement="bottom" title="<strong>Free sign up!</strong>">
						<span class="d-inline-block">
							<small v-show="!loginLoading">
								<span class="d-block">
									<div>Sign in with..<div class="numDot"></div></div>
								</span>
							</small>
							<small v-show="loginLoading">Loading...</small>
						</span>
					</button>
					<a id="LoginIcon" href="#" v-show="isLoggedIn" @click="toggleProfile" class="align-middle"
							:class="{ active: showProfile }"	:style="{ backgroundImage: 'url('+photoUrl+')' }">
					</a>
				</span>

			<introModal ref="introNavModal"></introModal>
			<privacyModal ref="privacyNavModal"></privacyModal>
			<aboutModal ref="aboutNavModal"></aboutModal>
			<learnModal ref="learnNavModal"></learnModal>
			

		<div class="modal fade" id="logginModal" @keypress="closeLogin" tabindex="-1" role="dialog" 
			aria-labelledby="logginModalTitle" aria-hidden="true" style="z-index:99999;">
			<div class="modal-dialog float-right mt-0 mr-0 modal-sm">
				<div class="rounded">
				<div class="modal-content bg-light">
					<div class="row no-gutters">
					<strong class="text-muted p-2 ml-2 mt-n1"><small class="font-weight-bold">Sign in with: </small></strong>
					<button class="btn btn-sm btn-light pl-2 pr-2" @click="doLogin(2)">
						<img alt="Sign in with Facebook" width="32" height="32" class="rounded" src="src/assets/fb.png" />
					</button>
					<button class="btn btn-sm btn-light pl-2 pr-2" @click="doLogin(1)">
						<img alt="Sign in with Google" width="32" height="32" class="rounded" src="src/assets/g.png" />
					</button>
					<button class="btn btn-sm btn-light pl-2 pr-2" @click="doLogin(3)">
						<img width="32" height="32" class="rounded" src="src/assets/t.png" />
					</button><br>
					<button alt="Sign in with Twitter" class="ml-2 mt-n4 btn btn-link float-left" @click="navPrivacy"><small><small>Privacy Policy</small></small></button>
			</div>
			</div>
			</div>
			</div>
		</div>
		</nav>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import About from './About.vue'
	import Learn from './Learn.vue'
	import Privacy from './Privacy.vue'
	import Intro from './Intro.vue'
	import firebase from 'firebase/app'
	import gfRotate from '../utils/gfRotate.js'
    export default {
			...mapGetters([
				'auth'
			]),
    	data() {
    		return {
					loginLoading: false,
    		}
    	},
			components: {
				aboutModal: About,
				learnModal: Learn,
				privacyModal: Privacy,
				introModal: Intro
			},
			computed: {
				isLoggedIn(){
					return this.$store.state.auth != false
				},
				photoUrl(){
					return this.$store.state.auth != false ? this.$store.state.user.profile.photoURL : "";
				},
				showProfile(){
					return this.$store.state.showProfile && this.$store.state.auth
				}
			},
			methods: {
				...mapActions([
					'toggleProfile',
					'setLoading',
				]),
				openLogin(){
					$("#logginModal").modal({backdrop:false, show: true})
					setTimeout(() => {$("#logginModal").modal("hide")}, 3000)
				},
				closeLogin(){
					$("#logginModal").modal("hide")
				},
				doLogin(provId) {
					var provider = null
					switch(provId){
						case 1:
							provider = new firebase.auth.GoogleAuthProvider()
							break;
						case 2:
							provider = new firebase.auth.FacebookAuthProvider()
							break;
						case 3:
							provider = new firebase.auth.TwitterAuthProvider()
							break;
					}
					firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
						.then(function() {
							firebase.auth().signInWithRedirect(provider)
						})
				},
				navAbout(){
					this.$refs.aboutNavModal.open()
				},
				navLearn(){
					this.$refs.learnNavModal.open()
				},
				navPrivacy(){
					this.$refs.privacyNavModal.open()
				},
			},
			created(){
				var tthis = this
			},
			mounted(){
				var tthis = this
				this.loginLoading = true
				setTimeout(function(){ 
					tthis.loginLoading = false
					if(!tthis.isLoggedIn){
						tthis.$refs.introNavModal.open() 
						$('.ht').tooltip({html: true})
					} 
				}, 3000)
				this.$store.dispatch("autoLogin")
			}
	}
</script>
<style>
	#LoginIcon{
		border: 2px #ddd solid;
		border-radius: 100%;
		display: inline-block;
		width: 34px;
		height: 34px;
		margin: -4px 0px -3px 0px;
		background-size:contain;
	}
	#LoginIcon:hover,#LoginIcon.active{
		border: 2px #337ab7 solid;
	}
	.navbar-toggler.on{
		right: 66px;
	} 
	.navbar-toggler.off{
		right: 126px;
	}
	.navbar-collapse.show .nav div a{
		padding-left:12px;
	}
	.gLogo{
			background-image:url("/src/assets/G.svg");
			background-repeat: no-repeat;
			padding-left:28px;
	}
	.numDot{
			background-image:url("/src/assets/red3.png");
			background-repeat: no-repeat;
			position: absolute;
			top:2px;
			right:18px;
			width: 20px;
			height: 20px;
	}
</style>
