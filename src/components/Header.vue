<template>
		<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light border" >
		    <div class="navbar-header">
		      <span class="navbar-brand text-success"><i class="glu-font">Glutenous!</i> 
						<small class="font-weight-light text-black-50 d-inline-block w-75 text-wrap align-text-top">
							<small> 
								<span class="d-sm-none" style="font-size:.8em">Gluten Maps</span>
								<span class="d-none d-sm-inline">Gluten Maps</span>
							</small>
						</small>
					</span>
		    </div>
		    <div class="collapse navbar-collapse clearfix mr-3 border-right" id="navCollapse">
		      	<ul class="nav navbar-nav justify-content-end col-12">
		      		<div class="nav-link" style="cursor:pointer">
								<a @click="navAbout" class="nav-item text-muted font-weight-lighter"><small>About</small></a>
							</div>
		      		<div class="nav-link" style="cursor:pointer">
								<a @click="navLearn" class="nav-item text-muted font-weight-lighter"><small>Learn</small></a>
		      		</div>
		      	</ul>
		    </div>

				<button class="navbar-toggler p-0 position-absolute" :class="{'on': isLoggedIn, 'off': !isLoggedIn}" type="button" data-toggle="collapse" 
				data-target="#navCollapse" aria-controls="navCollapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<span class="navbar-text float-left pl-1">
					<a href="#" id="loginBtn" class="border border-primary p-2 rounded btn-link text-primary" v-show="!isLoggedIn" @click="doLogin">
						<img class="mr-n1" src="/src/assets/G.svg"/>
						<small>SIGN IN</small>
					</a>
					<a id="LoginIcon" href="#" v-show="isLoggedIn" @click="toggleProfile" class="align-middle"
							:class="{ active: showProfile }"	:style="{ backgroundImage: 'url('+photoUrl+')' }">
					</a>
				</span>
			<aboutModal ref="aboutNavModal"></aboutModal>
			<learnModal ref="learnNavModal"></learnModal>
		</nav>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import About from './About.vue'
	import Learn from './Learn.vue'
    export default {
			...mapGetters,
    	data() {
    		return {
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
				]),
				doLogin() {
					this.$store.dispatch("doLogin")
				},
				navAbout(){
					this.$refs.aboutNavModal.open()
				},
				navLearn(){
					this.$refs.learnNavModal.open()
				}
			},
			mounted(){
				var tthis = this
				this.$store.dispatch("autoLogin")
					this.$refs.learnNavModal.open()
				setTimeout(() => {
							if(!tthis.$store.state.auth){
								//tthis.$refs.aboutNavModal.open()
							}
						}, 4000)
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
</style>
