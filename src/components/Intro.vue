<template>
		<div class="modal fade" id="introModal" @keypress="closeIntro" tabindex="-1" role="dialog" aria-labelledby="introModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
				<div class="modal-content bg-light border border-primary"
					style="border-width:12px !important; border-top-width:48px !important; box-shadow: 0px 0px 20px #666;">
					<div class="modal-body bg-white text-dark p-0" style="">
							<iframe class="w-100" height="300px" title="How to use Glutenous!" src="https://www.youtube.com/embed/8UDToGtQYIQ?controls=0&amp;start=7" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
							<button type="button" class="btn btn-primary w-100 m-0 mt-n2 rounded-0" data-dismiss="modal">Close</button>
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
			methods: {
				open(){
					$("#introModal").modal({backdrop:false, show: true})
				},
				closeIntro(){
					$("#introModal").modal("hide")
				}
			}
	}
</script>
<style>
#introModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
