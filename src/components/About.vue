<template>
		<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="aboutModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content bg-light border border-primary" 
					style="border-width:6px !important; box-shadow: 0px 0px 20px #666;">
					<div class="modal-header text-white bg-primary rounded-0">
						<h5 class="modal-title" id="aboutModalTitle">
							<small>Make gluten-free living a little easier...</small>
							</h5>
						<button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body bg-white text-dark">

						<div class="m-n3 p-3">
							<h5>Welcome to <i class="glu-font">Glutenous!</i></h5>
							<small class="text-dark">A Google Maps project dedicated to Gluten Sensitivity.</small>
						</div>
						<hr>

						<blockquote class="blockquote border border-success text-success bg-light col-sm-4 col-12 
							float-right text-center mt-0 mt-sm-4 ml-5 p-1 pt-3 pb-2 rounded">
							<p class="mb-1 glu-font">
								<small>
									<img width="120" height="120" src="src/assets/logo.png" /><br>
									<i class="font-weight-bolder">Glu′ten·ous! </i><br>
									<small>
										An exclaimation of horror upon realizing a gluten-free meal was in fact, <i class="font-weight-bolder">not so gluten-free after all.</i>
									</small>
								</small>
							</p>
						</blockquote>

						<p>
							<small>
								<strong class="text-primary">Being gluten-free ain't easy.</strong><br>
								If you suffer from a gluten-related disorder, <i>gluten-free isn't just preference, <strong>it's law.</strong></i>
								This makes going out often a trial by fire.
								<br>

								<strong class="text-primary mt-3 d-inline-block">Get informed before you go out.</strong><br>
								Gluten contamination and ignorance is everywhere, along with the many false "gluten-free" assurances. 
								Learn from other's mistakes and share your own - keeping track of gluten experiences has never been so easy.
								<br>
								
								<strong class=" mt-3 d-inline-block"><i>There's no sign up,</i> just login with your Google account and go!</strong><br>
								This community project is fueled by crowd-reporting from gluten sensitive people like you.<br>

								<strong class="text-primary mt-3 d-inline-block">Wanna support this?</strong> <br>
								Donate or buy some <i>Glutenous!</i> project stickers today. <a href="#donate">Find out more.</a><br>
								<i class="text-muted">This is a not-for-profit community project founded by a Celiac - no Ads, no paid commerical bias, no 3rd party affiliates and no emails! <span class="d-inline-block">Just what you see is what you get.</span></i><br>
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
			...mapGetters,
    	data() {
    		return {
				}
			},
			mounted(){
				$("#aboutModal").modal({backdrop:false, show: true})
			}
	}
</script>
<style>
#aboutModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
