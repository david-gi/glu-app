<template>
	<div>
		<div class="p-1 mb-2 ">			
			<button v-show="!isOpen" :disabled="alreadyReported || !isLoggedIn" :title="btnTitle" @click="openAddAReport" 
				:class="{'btn-outline-primary': isLoggedIn, 'btn-outline-secondary': !isLoggedIn}" type="button"
				class="float-right btn btn-sm pl-4 pr-4 mb-1 font-weight-bold">
				<small v-show="!alreadyReported">Add a Report</small>
				<small v-show="alreadyReported">Already reported today</small>
			</button>
		</div>
		<div v-show="isOpen" class="m-0 pt-2 pb-3 pl-3 pr-3 border-bottom rounded-top bg-white" style="border-bottom-width:9px !important">
			<h6 id='addBox' class="m-n1 pb-3">
				<button type="button" class="close text-dark" @click="closeAdd" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</h6>
			<div class="form-group row w-100">
				<div class="col-12 mt-n4">
					<vue-stars v-model="rating" :value="1" shadowColor="none" inactiveColor="#ddd"></vue-stars>
				</div>
				<small class="text-success pl-3">
					<span class="d-inline-block">&nbsp;How was your gluten experience?</span>
					<span class="d-inline-block">&nbsp;How helpful were the staff?</span>
					<span class="d-inline-block">&nbsp;What did you order?</span>
				</small>
				<div class="col-12">
					<textarea @input="autoHeight" type="text" class="inputLine w-100 p-2" v-model="note" 
						id="note" placeholder="No problems, good, ordered the..."></textarea>
				</div>
				<div class="col-12 tags">
					<div class="m-1 text-white rounded p-1" @click="dedicatedGFToggle()" 
						:class="{'bg-success border border-success': dedicatedGF,'border border-secondary text-dark': !dedicatedGF}">
						Dedicated GF
					</div>
					<div class="m-1 text-white rounded p-1" @click="pDedicatedGFToggle()" 
						:class="{'bg-success border border-success': pDedicatedGF,'border border-secondary text-dark': !pDedicatedGF}">
						Partly Dedicated GF
					</div>
					<div class="m-1 text-white rounded p-1" @click="GFMenuToggle()" 
						:class="{'bg-success border border-success': GFMenu,'border border-secondary text-dark': !GFMenu}">
						GF Menu
					</div>
					<div class="m-1 text-white rounded p-1" @click="GFLabellingToggle()" 
						:class="{'bg-success border border-success': GFLabelling,'border border-secondary text-dark': !GFLabelling}">
						GF Labelling
					</div>
				</div>
				<div class="col-12">
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
				dedicatedGF: false,
				pDedicatedGF: false,
				GFMenu: false,
				GFLabelling: false,
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
			dedicatedGFToggle(){
				this.dedicatedGF = !this.dedicatedGF
			},
			pDedicatedGFToggle(){
				this.pDedicatedGF = !this.pDedicatedGF
			},
			GFMenuToggle(){
				this.GFMenu = !this.GFMenu
			},
			GFLabellingToggle(){
				this.GFLabelling = !this.GFLabelling
			},
			add(){
				var newReport = {
					rating: this.rating,
					note: this.note,
					place: this.currentPlace.id,
					dedicated: this.dedicatedGF,
					pDedicated: this.pDedicatedGF,
					menu: this.GFMenu,
					labelling: this.GFLabelling
				}
				var tthis = this
				this.addReport(newReport)
					.then(x => { 
						tthis.rating = 0
						tthis.note = ""
						tthis.opened = false
						tthis.dedicatedGF = false
						tthis.pDedicatedGF = false
						tthis.GFMenu = false
						tthis.GFLabelling = false
					})
					.catch(e => { tthis.errorMsg(e+"") } )
			},
			openAddAReport(){
				this.opened = true
				this.$emit('fullsize')
				setTimeout(()=>{$("#note").focus()},200)
			},
			closeAdd(){
				this.rating = 0
				this.note = ""
				this.opened = false
				this.dedicatedGF = false
				this.pDedicatedGF = false
				this.GFMenu = false
				this.GFLabelling = false
			},
			autoHeight(e) {
				e.target.style.height = ""
				e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
			}
		}
	}

</script>

<style scoped>
.tags{
	font-size: .65em;
	font-weight: bold;
}
	.tags div {
		display: inline-block;
		cursor: pointer;
	}
	.tags div:hover {
		opacity: .9;
	}
</style>