<template>
		<div v-show="isOpen" id="introModal" @keypress="closeIntro" @mousemove="noClear" class="rounded-top border border-primary"
			style="width:228px; height:159px; position:fixed; bottom:0; right:0; border-width:3px !important;">
						<button type="button" class="mb-n5 close text-light" @click="closeIntro">
							<span aria-hidden="true" style="font-size:1.4em">&times;</span>
						</button>
			<iframe class="w-100 h-100" width="auto" height="auto" title="How to use Glutenous!"  @mousemove="noClear" 
				src="https://www.youtube.com/embed/vf15MhiT-OU?controls=1&amp;start=1" frameborder="0" 
				allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
			<br>
		</div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
    export default {
    	data() {
    		return {
					timer: null,
					isOpen: false
				}
			},		
			mounted(){
				this.timer = setTimeout(()=> { this.isOpen = false }, 12000)
			},
			methods: {
				noClear(){
					clearTimeout(this.timer)
				},
				open(){
					this.isOpen = true
					//$("#introModal").modal({backdrop:false, show: true})
				},
				closeIntro(){
					this.isOpen = false
					//$("#introModal").modal("hide")
				}
			}
	}
</script>
<style>
#introModal{
	font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
