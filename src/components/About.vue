<template>
		<div class="modal fade" id="aboutModal" @keypress="closeAbout" tabindex="-1" role="dialog" 
		aria-labelledby="aboutModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content bg-light border border-primary" 
					style="border-width:6px !important; box-shadow: 0px 0px 20px #666;">
					<div class="modal-header text-white bg-primary rounded-0">
						<h5 class="modal-title" id="aboutModalTitle">
							Welcome to <i class="glu-font">GLUTENOUS!</i>
							</h5>
						<button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body bg-white text-dark">

						<div class="m-n3 p-3">
							<span class="text-dark">Gluten Maps: Google Maps for Gluten-free living.</span>
						</div>
						<hr>

						<blockquote class="blockquote border border-success text-success bg-light col-sm-4 col-12 
							float-right text-center mt-0 mt-sm-4 ml-5 p-2 pt-3 pb-2 rounded">
							<p class="mb-1 glu-font">
								<small>
									<img width="120" height="120" src="src/assets/stickers.gif" /><br>
									<i class="font-weight-bolder">Glu′ten·ous! </i><br>
									<small>
										An exclamation of horror upon realizing a 'gluten-free' meal was in fact, <i class="font-weight-bolder">not so gluten-free after all.</i>
									</small>
								</small>
							</p>
						</blockquote>

						<p>
							<small>
								<strong class="text-primary">Being gluten-free just got easier...</strong><br>
								<strong>Gluten-safe places by gluten-free people</strong> with the power of Crowd-Reporting and Google Maps. 
								Get informed <i>before</i> you go out, report your gluten experiences and share them. Let's hold businesses accountable when they say 'gluten-free'.
								
								<br>
								
								<strong class="text-primary mt-3 d-inline-block">It's glutenous world out there.</strong><br>								 
								Gluten is one of the most common food ingredients; it's everywhere, along with those false "gluten-free" assurances too. 
								For those of us who suffer from a gluten-related disorder, <i><span class="d-inline-block">gluten-free</span> isn't just preference, <strong>it's precedent.</strong></i>
								<br>
								
								<strong class="text-primary mt-3 d-inline-block">100% free, world-wide from any device.</strong><br>
								<strong><span class="text-success"></span><i>No sign up,</i> just login with your Google account and go!</strong>
								This community project is fueled by crowd-reporting from gluten-free people like you. No app download, as a progressive web app (PWA) it's accessible on the web from any device, anywhere.<br>

								<strong class="text-primary mt-3 d-inline-block">Wanna support this?</strong> <br>
								Check out our Indiegogo Campaign. <a href="#donate">Find out more.</a><br>
								<i class="text-muted">This is a not-for-profit community project founded by a Celiac - no ads, no paid commercial bias, no 3rd party affiliates and no promo emails! <span class="d-inline-block">Just what you see is what you get.</span></i><br>
							</small>
						</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary w-25" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    export default {
    	data() {
    		return {
				}
			},
			computed:{
				...mapGetters([
				]),
			},
			methods: {
				open(){
					$("#aboutModal").modal({backdrop:false, show: true})
				},
				closeAbout(){
					$("#aboutModal").modal("hide")
				}
			}
	}
</script>
<style>
#aboutModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
