<template>
	<div class="">
		<div class="p-1 ">
			<button v-show="!isOpen" @click="open" class="float-right btn btn-sm pl-4 pr-4  font-weight-bold btn-outline-primary">Add a Report</button>
		</div>
		<form v-show="isOpen" class="bg-primary text-white m-1 mt-n1 pt-2 pb-2 pl-3 pr-3 rounded">
			<h5 class="mt-1">New report
				<button type="button" class="close text-white" @click="close"  aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</h5>
			<div class="form-group row">
				<div class="col">
					<span class="">
						<i v-for="(x, index) in rating" :key="index"><span class="star a small"></span></i><i v-for="(x, index) in (5 - rating)" :key="index"><span class="star b small"></span></i>
					</span>
				</div>
				<div class="col-12">
					<textarea class="w-100 p-2 rounded" maxlength="140" placeholder="Report your gluten experience...">
					</textarea>
				</div>
				<div class="col-12 mb-n3">
					<button type="button" class="btn btn-sm btn-success mt-1 pl-5 pr-5 float-right" @click="add">Submit</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				rating: 3,
				note: "",
				opened: false
			}
		},
		computed: {
			...mapGetters([
				'profile',
				'conditions',
			]),
			isOpen(){
				return this.opened
			},
		},
		methods: {
			...mapActions([
				'errorMsg',
			]),
			add(){
				this.saveProfile(this.cId)
					.then(() => { 
						this.toggleProfile() 
					})
					.catch(e => { _this.errorMsg(e+"") } )
			},
			open(){
				this.opened = true
			},
			close(){
				this.opened = false
			}
		},
		created(){
			//this.loadConditions()
			//	.catch(e => { _this.errorMsg(e+"") } )
		},
	}

</script>

<style scoped>
	.star{
		background-size: contain;
		display: inline-block;
		margin-right: 2px;
		width: 32px;
		height: 32px;
		background-image: url("~/src/assets/star1.svg");
	}
	.star.a{
		background-image: url("~/src/assets/star1.svg");
	}
	.star.b{
		background-image: url("~/src/assets/star0.svg");
	}
</style>