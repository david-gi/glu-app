<template>
		<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light border" >
		    <div class="navbar-header">
		      <span class="navbar-brand text-success">
						<i class="glu-font d-block float-left" style="line-height:.8em">GLUTENOUS!</i><br> 
						<small class="font-weight-light text-black-50 d-block float-left mt-n2 ml-1" style="line-height:.1em">
							<small> 
								<span class="d-sm-none" style="font-size:.8em">Gluten-Free Maps<span style="font-size:.8em">™</span></span>
								<span class="d-none d-sm-inline">Gluten-Free Maps<span style="font-size:.8em">™</span></span>
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
								<a href="https://bit.ly/2VKBSTT" target="_blank" class="nav-item ml-0">
									<img title="Indiegogo" src="/src/assets/go.png"/>
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
					<a id="loginBtn" class="border border-primary bg-white p-2 rounded btn-link text-primary ht" style="cursor:pointer"
						v-show="!isLoggedIn" @click="openLogin()" data-toggle="tooltip" data-placement="bottom" title="<strong>Free sign up!</strong> <br>Sign up now using <br>Google or Facebook">
						<span class="d-inline-block">
							<small v-show="!loginLoading">
								<span class="d-inline-block">
									<div class="">Login<i style="padding:0 3px;">|</i>Sign Up</div>
								</span>
							</small>
							<small v-show="loginLoading">Loading...</small>
						</span>
					</a>
					<a id="LoginIcon" href="#" v-show="isLoggedIn" @click="toggleProfile" class="align-middle"
							:class="{ active: showProfile }"	:style="{ backgroundImage: 'url('+photoUrl+')' }">
					</a>
				</span>

			<aboutModal ref="aboutNavModal"></aboutModal>
			<learnModal ref="learnNavModal"></learnModal>
			

		<div class="modal fade" id="logginModal" @keypress="closeLogin" tabindex="-1" role="dialog" 
			aria-labelledby="logginModalTitle" aria-hidden="true" style="z-index:99999;">
			<div class="modal-dialog float-right mt-0 mr-0 modal-sm">
				<div class="rounded">
				<div class="modal-content bg-light">
					<div class="row no-gutters">
					<strong class="text-muted p-2"><small class="font-weight-bold">Choose account: </small></strong>
					<button class="btn btn-sm btn-light pl-3 pr-3" @click="doLogin(2)">
						<img width="32" height="32" class="rounded" src="src/assets/fb.png" />
					</button>
					<button class="btn btn-sm btn-light pl-3 pr-3" @click="doLogin(1)">
						<img width="32" height="32" class="rounded" src="src/assets/g.png" />
					</button>
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
	import firebase from 'firebase/app'
    export default {
			...mapGetters([
				'auth'
			]),
    	data() {
    		return {
					loginLoading: false
    		}
    	},
			components: {
				aboutModal: About,
				learnModal: Learn
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
				},
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
			},
			created(){
				var tthis = this
			},
			mounted(){
				var tthis = this
				this.loginLoading = true
				setTimeout(function(){ 
					tthis.loginLoading = false
					if(!this.auth){ $('.ht').tooltip({html: true}) } 
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
	.gLogo{
			background-image:url("/src/assets/G.svg");
			background-repeat: no-repeat;
			padding-left:28px;
	}
</style>
