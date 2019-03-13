<template>
		<nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light border" >
		    <div class="navbar-header">
		      <span class="navbar-brand text-success">Glutenous! 
						<small class="font-weight-light text-black-50 align-center w-25 text-wrap"><small> 
							<span class="d-sm-none" style="font-size:.8em">Crowdmapping Gluten</span>
							<span class="d-none d-sm-inline">Crowdmapping Gluten</span>
						</small>
						</small>
					</span>
		    </div>
		    <div class="collapse navbar-collapse clearfix mr-3 border-right" id="navCollapse">
		      	<ul class="nav navbar-nav justify-content-end col-12">
		      		<router-link to="/" class="nav-link" activeClass="active" tag="li">
								<a class="nav-item text-muted font-weight-lighter"><small>About</small></a>
							</router-link>
		      		<router-link to="/" class="nav-link" activeClass="active" tag="li">
								<a class="nav-item text-muted font-weight-lighter"><small>Learn</small></a>
							</router-link>
		      	</ul>
		    </div>

				<button class="navbar-toggler p-0  position-absolute" type="button" data-toggle="collapse" data-target="#navCollapse" 
					aria-controls="navCollapse" aria-expanded="false" aria-label="Toggle navigation" style="right:68px;">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<span class="navbar-text float-left pl-1">
					<a href="#" id="loginBtn" class="btn-link text-primary" v-show="!isLoggedIn" @click="doLogin"><small>Sign in</small></a>
					<a id="LoginIcon" href="#" v-show="isLoggedIn" @click="toggleProfile" class="align-middle"
							:class="{ active: showProfile }"	:style="{ backgroundImage: 'url('+photoUrl+')' }">
					</a>
				</span>
		</nav>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    export default {
			...mapGetters,
    	data() {
    		return {
    		}
    	},
		computed: {
			isLoggedIn(){
				return this.$store.state.auth != false
			},
			photoUrl(){
				return this.$store.state.auth != false ? this.$store.state.user.profile.photoURL : "";
			},
			showProfile(){
				return this.$store.state.showProfile && this.$store.state.auth != false
			},
		},
		methods: {
			...mapActions([
				'toggleProfile',
			]),
			doLogin() {
				this.$store.dispatch("doLogin")
			}
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
</style>
