<template>
	<div class="" v-if="showProfile">
		<div class="bg-primary text-white">
			<div class="card-body">
					<form>
						<div class="form-group">
						<button type="button" class="close text-white" @click="close"  aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
							<span class="font-weight-bold">{{profile.name}}</span><br>
							<span class="text-white-50">{{profile.email}}</span><br><br>
							<label for="cndInp">Gluten Condition:</label>
							<select class="form-control" id="cndInp" :value="cId" @input="cId = $event.target.value">
								<option value=" ">- None -</option>
								<option v-for="cnd in conditions" :key="cnd.id" :value="cnd.id">{{cnd.data().name}}</option>
							</select>
						</div>
						<br>
						<button type="button" class="btn btn-primary" @click="signOff">Logout</button>
						<button type="button" class="btn btn-success float-right" @click="save">Save</button>
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
				cId: ""
			}
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
				'logout'
			]),
			save(){
				this.saveProfile(this.cId)
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