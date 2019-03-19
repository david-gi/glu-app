<template>
		<div class="modal fade" id="aboutModal" tabindex="-1" role="dialog" aria-labelledby="aboutModalTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content bg-light" style="box-shadow: 0px 0px 20px #666;">
					<div class="modal-header">
						<h5 class="modal-title text-success" id="aboutModalTitle">Welcome to Glutenous!</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body bg-white">
						We are on a mission to crowdmap gluten!
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
</style>
