<template>
	<div id='placeBox' v-if="currentPlace != null" :class="{ expanded: isExpanded }" 
		class="PlaceMain bg-success text-white vw-100 border-top">
		<button type="button" class="close text-white p-1 mt-n1" @click="close" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
		<div class="card-body">
				<form>
					<div class="row">
						<div class="col-12 p-0 m-0 mt-n3 mb-n3">
							<p @click="toggleExpand" class="mx-auto" title="toggle expand" :class="{expander: true, down: isExpanded}"></p>
						</div>
						<div class="col-12 col-sm-8">
							<h5 class="text-break float-left ml-n3 pr-2 text-truncate" style="max-width:70%" >
								<a id='name' title="Click to Open in Google Maps" class="text-white" target="blank" :href="'https://www.google.com/maps/place/?q=place_id:' + currentPlace.id">
									{{currentPlace.name}}
								</a>
							</h5>
							<span class="d-none d-sm-inline-block text-break location">{{currentPlace.city}}, {{currentPlace.province}}</span>
						</div>
						<div class="d-none d-sm-block col-sm-4 text-right">
							<span class="d-inline-block align-baseline">
								<i v-for="(x, index0) in Number(currentPlace.rating)" :key="index0 + Math.random()"><span class="star a">★</span></i><i v-for="(x, index01) in (5 - currentPlace.rating)" :key="index01 + Math.random()"><span class="star b">★</span></i>
							</span>
						</div>
						<div class="d-sm-none col-12 mt-n1">
							<span class="d-inline-block ml-n3 pr-2 mt-n2 text-break location ">{{currentPlace.city}}, {{currentPlace.province}}</span>
							<span class="d-inline-block float-right">
								<i v-for="(x, index00) in Number(currentPlace.rating)" :key="index00 + Math.random()"><span class="star a">★</span></i><i v-for="(x, index02) in (5 - currentPlace.rating)" :key="index02 + Math.random()"><span class="star b">★</span></i>
							</span>
						</div>
					</div>
					<hr style="margin:0 0 4px 0">
					<h5 class="clearfix m-0 mt-n2 pb-1">
						<div class="mt-3 p-0 text-middle col-12 col-sm-4 float-left"><small>Reports</small></div>
						<div v-show="reports != null && reports.length > 0" class="input-group mt-2 p-0 col-12 col-sm-6 float-right ">
							<input id="SearchBox" v-model="filterQuery" v-on:keydown="clearQuery" v-on:keyup.enter="queryReports"  type="text" 
								class="form-control form-control-sm border-primary border" 
								placeholder="Ex: 'Soup' or '5 stars'" aria-label="Filter reports..." aria-describedby="rsearch">
							<div class="input-group-append">
								<button @click="queryReports" class="btn btn-sm btn-primary text-top" type="button" id="rsearch"><small>Filter</small></button>
							</div>
						</div>
					</h5>
					<div class="rounded bg-light text-dark pb-1">

						<areport ref="areport"></areport><br>

						<small class="text-muted pl-3 w-50 pb-2 mt-n4" v-if="reports == null || reports.length < 1">
							Be the first to make a report!
						</small>

						<div class="border bg-white pt-2" :class="{'pb-2': report.note, 'mb-n2': !(report.note)}" 
						v-for="(report, index) in reportsFiltered" :key="index + report.created + Math.random()">
							<span class="col-12">
								<span class="d-inline-block">
									<small>
										<span class="text-primary font-weight-bold mr-1">{{report.user.name}}</span> 
										<span title="reputation" class="text-warning border border-warning d-inline-block font-weight-bold mr-1 rounded pl-1 pr-1"><small>{{report.user.points}}</small></span> 
										<span @click="toggleAfi" :title="'Additional food intolerances: '+report.user.notes" 
												class="text-muted d-inline-block afi-ht">
											{{getConditionName(report.user.condition.id)}}
										</span>
									</small>
								</span>
								<span class="d-inline-block float-right mr-2 ml-3">
									<small class="align-top font-italic text-muted mr-2">{{ getTSDate(report.created) }}</small>
									<span class="d-inline-block">
										<i v-for="(x, index2) in Number(report.rating)" :key="index2 + '2'"><span class="star a small">★</span></i><i v-for="(x, index3) in (5 - report.rating)" :key="index3 + '3'"><span class="star b small">★</span></i>
									</span>
								</span>
							</span>
							<span class="col-12 d-inline-block text-truncate note" @click="toggleMore">
								{{report.note}}
							</span>
							<sponsor v-if="(index % 2) "></sponsor>
						</div>
						
					</div>
				</form>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    import AddReport from './AddReport.vue'
    import Sponsor from './Sponsor.vue'
	export default {
    	components: {
    		areport: AddReport,
    		sponsor: Sponsor,
        },
		data() {
			return {
				filterQuery: "",
				expanded: false
			}
		},
		computed: {
			...mapGetters([
				'profile',
				'currentPlace',
				'reports',
				'reportsFiltered',
				'placeTypes',
				'conditions',
			]),
			isExpanded(){
				return this.expanded
			},
			nameWatch(){
				return this.currentPlace
			}
		},
		methods: {
			...mapActions([
				'getPlace',
				'clearPlace',
				'getReports',
				'filterReports',
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
			getTSDate(ts){
				var d = new Date(ts.seconds * 1000)
				var minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes()
				var hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours()
    			var ampm = d.getHours() >= 12 ? 'pm' : 'am'
    			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
				return months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' @ '+(hours > 12 ? hours - 12 : hours)+':'+minutes+ampm
			},
			toggleAfi(e){
				$(e.target).tooltip({trigger: 'manual'}).tooltip('toggle')
				$('.tooltip').on('click', function(){ $(this).tooltip('hide') })
			},
			toggleExpand(e){
					this.expanded = !this.expanded;
			},
			toggleMore(e){
				$(e.target).toggleClass('text-truncate').toggleClass('more')
			},
			showMore(){
				$(".note").each(function() {
					if(this.scrollHeight > this.clientHeight || this.scrollWidth > this.clientWidth){
						$(this).addClass('more')
					}
				});
			},
			queryReports(){
				this.filterReports(this.filterQuery)
			},
			clearQuery(){
				if(this.filterQuery.length < 1){
					this.filterReports("")
				}
			},
			close(){
				this.clearPlace()
				this.expanded = false
				this.filterQuery = ""
				this.rating = 0
				this.note = ""
			},
		},
		mounted(){
			var tthis = this
			tthis.showMore()
			$(window).on("resize", function(){ tthis.showMore() })
		},
		watch: {
			nameWatch(x, y){
				//close add report form
				if(this.$refs.areport){
					this.$refs.areport.closeAdd()
					this.filterQuery = ""
					this.rating = 0
					this.note = ""
				}
			}
		}
	}

</script>

<style scoped>
	.afi-ht{ cursor: pointer;}
	.PlaceMain{
		position: fixed;
		min-height: 35%;
		max-height: 35%;
        overflow-y: auto;
		bottom:0;
	}
	.PlaceMain.expanded{
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
	.note{
		padding-right: 50px;
		font-size: .9em;
	}
	.more{
		cursor: pointer;
	}
	.note.moreX::before{
		content: "[more]";
		float:right;
		font-size: .7em;
		color:#0056b3;
		margin: 4px -30px 0 0;
	}
	.note.moreX.less::before{
		content: "[less]";
	}
	.star{
		display: inline-block;
		font-style: normal;
		font-size: 30px;
		line-height: 25px;
		overflow: visible;
	}
	.star.a{
		color: yellow;
	}
	.star.b{
		color: #ddd;
	}
	.star.small{
		font-size: 24px;
		line-height: 18px;
	}
</style>