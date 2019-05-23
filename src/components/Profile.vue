<template>
	<div class="" v-if="showProfile">
		<div class="bg-primary text-white">
			<div class="card-body">
					<form>
						<div class="form-group">
							<button type="button" class="close text-white" @click="close"  aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<span class="font-weight-bold clearfixc">{{profile.name}}</span>
							<span class="text-warning d-inline-block pl-1 pr-1 pb-1 pt-0 rounded ">
								<small>
									<strong class="">{{profile.points}}</strong>
									<small>reputation</small>
								</small>
							</span><br>
							<span class="text-white-50">{{profile.email}}</span><br>
							<label class="mt-2" for="cndInp"><small>Gluten-related disorder:</small></label>
							<select class="form-control form-control-sm" id="cndInp" :value="cId" @input="cId = $event.target.value">
								<option value=" ">- None -</option>
								<option v-for="cnd in conditions" :key="cnd.id" :value="cnd.id">{{cnd.data().name}}</option>
							</select>
							<label class="mt-3" for="afiInp"><small>Additional food intolerances:</small></label>
							<input type="text" class="form-control form-control-sm mb-n1" id="extraInp" v-model="afi" 
								max-length="90" :class="{'border-danger': afi.length > 90}" placeholder="dairy, corn, oats..."/>
							<small v-show="afi.length > 90" class="ml-1 rounded pl-1 pr-1 bg-danger">Max length 90 characters.</small>
						</div>
						<br>
						<div class="text-right  mt-n3">
							<button type="button" class="btn btn-primary btn-sm mt-2" @click="signOff">Logout</button>
							<button type="button" class="btn btn-primary btn-sm ml-4 mt-2" @click="toggleBug">Report a Bug</button>
							<button type="button" class="btn btn-success clearfix ml-4 mt-2" @click="save">Save</button>
						</div>
						<hr v-show="bugOpen">
						<div class="card mt-3" v-show="bugOpen">
							<div class="col-12">
								<textarea id="bugInp" @input="autoHeight" type="text" class="inputLine w-100 p-2" v-model="bugText" 
								placeholder="Bug report details..."></textarea>
								<button type="button" class="btn btn-link text-muted pl-2 pr-2" @click="toggleBug">cancel</button>
								<button type="button" class="btn btn-sm btn-success mt-1 pl-5 pr-5 float-right" @click="sendBugReport">Submit</button>
							</div>
						</div>
					</form>
			    </div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				cId: "",
				afi:"",
				bugOpen: false,
				bugText: "",
			}
		},
		created() {
			this.afi = this.profile.notes
		},
		computed: {
			...mapGetters([
				'profile',
				'conditions',
			]),
			showProfile(){
				return this.$store.state.showProfile && this.$store.state.auth != false
			},
		},
		methods: {
			...mapActions([
				'saveProfile',
				'loadConditions',
				'toggleProfile',
				'errorMsg',
				'logout',
				'sendBug'
			]),
			save(){
				this.saveProfile({cndId :this.cId, addition: this.afi })
					.then(() => { 
						this.toggleProfile() 
					})
					.catch(e => { _this.errorMsg(e+"") } )
			},
			close(){
				this.toggleProfile() 
			},
			signOff(){
				this.logout()
					.catch(e => { _this.errorMsg(e+"") } )
			},
			toggleBug(){
				this.bugOpen = !this.bugOpen
			},
			sendBugReport(){
				if(this.bugText != null && this.bugText.length > 3){
					var tthis = this
					this.sendBug(tthis.bugText)
						.then(x => { 
							tthis.bugText = ""
							tthis.bugOpen = false
						})
						.catch(e => { _this.errorMsg(e+"") } )
				}
			},
			autoHeight(e) {
				e.target.style.height = ""
				e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
			}
		},
		created(){
			this.loadConditions()
				.catch(e => { _this.errorMsg(e+"") } )
		},
		updated() {
			if(this.showProfile && this.cId == "") { this.cId = this.profile.condition ? this.profile.condition.id : " " }
		}
	}

</script>

<style scoped>

</style>