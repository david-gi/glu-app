<template>
	<div>
		<div class="p-1 mb-2 ">			
			<button v-show="!isOpen" :disabled="alreadyReported || !isLoggedIn" :title="btnTitle" @click="openAddAReport" 
				:class="{'btn-outline-primary': isLoggedIn, 'btn-outline-secondary': !isLoggedIn}" type="button"
				class="float-right btn btn-sm pl-4 pr-4 mb-1 font-weight-bold">
				<small v-show="!alreadyReported">Add a Report!!</small>
				<small v-show="alreadyReported">Already reported today</small>
			</button>
		</div>
		<div v-show="isOpen" class="m-0 mt-n5 pt-2 pb-3 pl-3 pr-3 border-bottom rounded-top bg-white" style="border-bottom-width:9px !important">
			<h6 id='addBox' class="m-n1 pb-3">
				<button type="button" class="close text-dark" @click="closeAdd" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</h6>
			<div class="form-group row w-100">
				<div class="col-5 mt-n4">
					<vue-stars v-model="rating" :value="1" shadowColor="none" inactiveColor="#ddd"></vue-stars>
					<small v-show="rating < 1" class="text-warning font-italic ml-n2">&larr; rate it!</small>
				</div>
				<div class="col-12">
					<textarea @input="autoHeight" type="text" class="inputLine w-100 p-2" v-model="note" placeholder=" Share your gluten experience..."></textarea>
				</div>
				<i class="col-12 text-success"><small>Keep in mind this is a report about your gluten experience and not a review of the place itself.</small></i>
				<div class="col-12 mb-n3">
						<button type="button" class="btn btn-link text-muted pl-2 pr-2" @click="closeAdd">cancel</button>
					<button type="button" class="btn btn-sm btn-success mt-1 pl-5 pr-5 float-right" :disabled="rating < 1" @click="add">Submit</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import VueStars from "./VueStars.vue"
	export default {
		data() {
			return {
				rating: 0,
				note: "",
				opened: false,
			}
		},
		components: {
			VueStars,
		},
		computed: {
			...mapGetters([
				'profile',
				'conditions',
				'currentPlace',
				'reportedPlaceIds'
			]),
			alreadyReported(){
				if(this.currentPlace){
					return this.reportedPlaceIds.indexOf(this.currentPlace.id) > -1
				} else{
					return false
				}
			},
			isOpen(){
				return this.opened
			},
			isLoggedIn(){
				return this.$store.state.auth != false
			},
			btnTitle(){
				return this.$store.state.auth == false ? 'Login to add a report' : ""
			}
		},
		methods: {
			...mapActions([
				'addReport',
				'getPlace',
				'errorMsg',
			]),
			add(){
				var newReport = {
					rating: this.rating,
					note: this.note,
					place: this.currentPlace.id
				}
				var tthis = this
				this.addReport(newReport)
					.then(x => { 
						tthis.rating = 0
						tthis.note = ""
						tthis.opened = false
					})
					.catch(e => { tthis.errorMsg(e+"") } )
			},
			openAddAReport(){
				this.opened = true
			},
			closeAdd(){
				this.rating = 0
				this.note = ""
				this.opened = false
			},
			autoHeight(e) {
				e.target.style.height = ""
				e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
			}
		}
	}

</script>

<style scoped>
</style>