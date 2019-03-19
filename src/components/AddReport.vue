<template>
	<div>
		<div class="p-1 ">			
			<button v-show="!isOpen" :disabled="!isLoggedIn" :title="btnTitle" @click="open" :class="{'btn-outline-primary': isLoggedIn, 'btn-outline-secondary': !isLoggedIn}"
			class="float-right btn btn-sm pl-4 pr-4 mb-1 font-weight-bold"><small>Add a Report</small></button>
		</div>
		<div v-show="isOpen" class="m-x1 mt-n1 pt-2 pb-3 pl-3 pr-3 border-bottom" style="border-width:9px !important">
			<h6 class="mt-1">
				<button type="button" class="close text-white" @click="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</h6>
			<div class="form-group row">
				<div class="col-5">
					<vue-stars :max="5" v-model="rating" shadowColor="none" inactiveColor="#ddd"></vue-stars>
				</div>
				<div class="col-12">
					<textarea @input="autoHeight" type="text" class="inputLine w-100 p-2" v-model="note" placeholder=" Share your gluten experience"></textarea>
				</div>
				<div class="col-12 mb-n3">
						<button type="button" class="btn btn-link text-muted pl-2 pr-2" @click="close">cancel</button>
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
				opened: false
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
			]),
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
				'errorMsg',
			]),
			add(){
				var newReport = {
					rating: this.rating,
					note: this.note,
					place: this.currentPlace.id
				}
				this.addReport(newReport)
					.then(() => { 
						this.close() 
					})
					.catch(e => { _this.errorMsg(e+"") } )
			},
			open(){
				this.opened = true
			},
			close(){
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
	.inputLine{
		background-color: transparent;
		color:#555;
		opacity: 1;
		border: 0;
		border-bottom: 2px solid #28A744;
		margin-bottom: 6px;
		height: 50px;
		resize: none;
		overflow: hidden;
	}
	.inputLine::placeholder {
		opacity: 1;
	}
</style>