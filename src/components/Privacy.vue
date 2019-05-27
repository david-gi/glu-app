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
								Your privacy is important to us at Glutenous.org. <br>
								<br>
								We do not any collect information for commercial purposes, nor do we sell or share information collected with 3rd parties or affliates.
								<br>
								<br>
								<i>When you use this site:</i> Basic anonymous web traffic statistics are collected for site management and analytics.
								<br>
								<br>
								<i>When you sign up:</i> We only collect the bare minimum, your email (only when signing up with a Google account) and account name (as displayed on Google or Facebook). You email is for sign in purposes only. We will never send you email of any kind.
								<br>
								<br>
								<i>When you login:</i> We only save data you enter and only for the purpose of this site's operation, which exclusively includes: reports (description and rating), your 'gluten-related disorder' and 'additional food intolerances'.
								<br>
								<br>
								<i>When your make a report:</i> The report description, your account name, your 'gluten-related disorder' and 'additional food intolerances' will be publicly displayed in a place's reports. This is to add legitmacy to reports and to provide relevant information for those reading the report.
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
