<template>
	<div id="PlaceMain" v-if="showPlace" :class="{ expanded: isExpanded }" 
		class="bg-success text-white vw-100 border-top">
		<div class="card-body">
				<form>
					<div class="row">
						<div class="col-12 p-0 m-0 mt-n3 mb-n3">
							<p @click="toggleExpand" class="mx-auto" title="toggle expand" :class="{expander: true, down: isExpanded}"></p>
						</div>
						<div class="col-12 col-sm-8">
							<h5 class="text-break float-left pr-2" :title="placeName.length > 16 ? currentPlace.name : ''">
								{{placeName}}
							</h5>
							<span class="d-none d-sm-inline-block text-break location">{{currentPlace.city}}, {{currentPlace.province}}</span>
						</div>
						<div class="d-none d-sm-block col-sm-4 text-right">
							<span class="d-inline-block align-baseline">
								<i v-for="(x, index) in currentPlace.rating" :key="index"><span class="star a"></span></i><i v-for="(x, index) in (5 - currentPlace.rating)" :key="index"><span class="star b"></span></i>
							</span>
						</div>
						<div class="d-sm-none col-12 mt-n1">
							<span class="d-inline-block pr-2 mt-n2 text-break location ">{{currentPlace.city}}, {{currentPlace.province}}</span>
							<span class="d-inline-block float-right">
								<i v-for="(x, index) in currentPlace.rating" :key="index"><span class="star a"></span></i><i v-for="(x, index) in (5 - currentPlace.rating)" :key="index"><span class="star b"></span></i>
							</span>
						</div>
					</div>
					<hr style="margin:0 0 4px 0">
					<h5 class="clearfix m-0 mt-n2 pb-1">
						<div class="mt-3 p-0 text-middle col-12 col-sm-4 float-left"><small>Glutening Reports:</small></div>
						<div  class="input-group mt-2 p-0 col-12 col-sm-6 float-right ">
							<input id="SearchBox" type="text" class="form-control form-control-sm border-primary border" 
								placeholder="Search reports..." aria-label="Search reports..." aria-describedby="rsearch">
							<div class="input-group-append">
								<button class="btn btn-sm btn-primary text-top" type="button" id="rsearch"><small>Search</small></button>
							</div>
						</div>
					</h5>
					<div class="card bg-light text-dark pb-1">

            			<areport class=""></areport>

						<div class="border-bottom bg-white pt-1 pb-1" v-for="report in reports" :key="report.created">
							<span class="col-12">
								<span class="d-inline-block">
									<small>
										<span class="text-primary font-weight-bold mr-1">{{report.user.name}}</span> 
										<span class="text-muted d-inline-block">{{getConditionName(report.user.condition.id)}}</span> 
									</small>
								</span>
								<span class="d-inline-block float-right mr-2 ml-3">
									<small class="align-top font-italic text-muted mr-2">{{ getTSDate(report.created) }}</small>
									<span class="d-inline-block">
										<i v-for="(x, index) in report.rating" :key="index"><span class="star a ssmall"></span></i><i v-for="(x, index) in (5 - report.rating)" :key="index"><span class="star b ssmall"></span></i>
									</span>
								</span>
							</span>
							<span class="col-12 d-inline-block">
								{{report.note}}
							</span>
						</div>
						
					</div>
				</form>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    import AddReport from './AddReport.vue'
	export default {
    	components: {
    		areport: AddReport,
        },
		data() {
			return {
				expanded: false
			}
		},
		computed: {
			...mapGetters([
				'currentPlace',,
				'reports',
				'placeTypes',
				'conditions',
			]),
			placeName(){
				var _this = this
				if(this.showPlace){
					if(this.currentPlace.name.length > 16){  return _this.currentPlace.name.substring(0, 16) + "..." } 
					else { return _this.currentPlace.name }
				}
			},
			showPlace(){
				return this.$store.state.showPlace && this.currentPlace != null
			},
			isExpanded(){
				return this.expanded
			}
		},
		methods: {
			...mapActions([
				'getPlace',
				'getReports',
				'togglePlace',
				'errorMsg',
			]),
			getConditionName(id){
				var cnd = this.conditions.filter((x) => { return x.id == id })
				if(cnd[0]){
					return cnd[0].data().name
				} else{ 
					return "-"
				}
			},
			reloadPlace(){
				this.getPlace()
			},
			getTSDate(ts){
				var d = new Date(ts.seconds * 1000)
				var minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes()
				var hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours()
    			var ampm = d.getHours() >= 12 ? 'pm' : 'am'
    			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
				return months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' @ '+(hours > 12 ? hours - 12 : hours)+':'+minutes+ampm
			},
			toggleExpand(){
				this.expanded = !this.expanded;
			}
		},
		created(){
		},
		beforeMount(){
			var _this = this
			this.getPlace("123")
					.then(() => { 
						_this.togglePlace()
					})
					.catch(e => { _this.errorMsg(e+"") } )
		}
	}

</script>

<style scoped>
	#PlaceMain{
		position: fixed;
		min-height: 35%;
		max-height: 35%;
        overflow-y: auto;
		bottom:0;
	}
	#PlaceMain.expanded{
		max-height: 100%;
		top:42px;
	}
	#SearchBox{
		opacity: .70;
	}
	#SearchBox:focus, #SearchBox:hover {
		opacity: .95;
	}
	.location{
		font-size: .9em;
		line-height: 2em;
	}
	.expander{
		cursor: pointer;
		display: block;
		background-size: contain;
		width: 16px;
		height: 16px;
		background-image: url("~/src/assets/chev1.svg");
	}
	.expander.down{
		background-image: url("~/src/assets/chev0.svg");
	}
	.star{
		background-size: cover;
		display: inline-block;
		width: 24px;
		height: 24px;
		background-image: url("~/src/assets/star1.svg");
	}
	.star.a{
		background-image: url("~/src/assets/star1.svg");
	}
	.star.b{
		background-image: url("~/src/assets/star0.svg");
	}
	.star.a.small, .star.b.small{
		margin-right: 0px;
		width: 12px;
		height: 12px;
	}
</style>