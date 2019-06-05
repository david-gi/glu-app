<template>
		<div class="modal fade" id="privacyModal" @keypress="closePrivacy" tabindex="-1" role="dialog" aria-labelledby="privacyModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content bg-light border border-primary" :class="{'mw-100': fullpage}"
					style="border-width:6px !important; box-shadow: 0px 0px 20px #666;">
					<div class="modal-header text-white bg-primary rounded-0">
						<h5 class="modal-title" id="privacyModalTitle">
							Our Privacy Policy
						</h5>
						<button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body bg-white text-dark" style="overflow-y:scroll; max-height:200px;">
						<p>
							<small>
								This is not-for-profit website and it's purpose is to provide a free gluten-free tool for true gluten-free living. 
								<br>
								Your privacy is important to us at Glutenous.org and this web app is specially designed to preserve it.<br>
								<br>
								We do not any collect information for commercial purposes, nor do we sell or share information collected with 3rd parties or affiliates.
								<br>
								<br>
								<i>When you use this site:</i> Basic anonymous web traffic statistics are collected for site management and analytics.
								<br>
								<br>
								<i>When you sign up:</i> We only collect your account name (as displayed on Twitter, Google or Facebook) and email (for Google only, for sign in purposes only). 
								Your information is protected and secure, it will never be shared and we will never send emails of any kind.
								<br>
								<br>
								<i>When you login:</i> We only save data you enter and only for the purpose of this site's operation, which exclusively includes: reports, your 'gluten-related disorder', 'additional food intolerances' and bug reports.
								<br>We do not share information with Twitter, Google or Facebook and they cannot track your usage of this site beyond knowing you logged in.
								<br>
								<br>
								<i>When your make a report:</i> The report description, your account name, your 'gluten-related disorder' and 'additional food intolerances' will be publicly displayed in a place's reports. This is to add legitimacy to reports and to provide relevant information for those reading the report.
								<br>
								<br>
								This site is build with Google Maps API. Therefore using Glutenous! also accepts <a href="https://www.google.com/intl/en-US_US/help/terms_maps/" target="_blank">these terms</a>.
								<br>
								<br>
								<i>By signing up to and using our website,</i> you agree to this privacy policy.
								<br>
								<br>

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
			mounted(){
				if(this.fullpage){
					this.open()
				}
			},
			computed:{
				...mapGetters([
				]),
				fullpage(){
					return window.location.hash == '#/privacy'
				}
			},
			methods: {
				open(){
					$("#privacyModal").modal({backdrop:false, show: true})
				},
				closePrivacy(){
					$("#privacyModal").modal("hide")
				}
			}
	}
</script>
<style>
#privacyModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
