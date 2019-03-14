<template>
<div>
    <div class="vw-100" :class="{full: !placeShown, short: placeShown}" id="map"></div>
</div>
</template>
	


<script>
import {mapActions, mapGetters} from 'vuex'
export default {
		data() {
			return {
			}
		},
		mounted(){
			const map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 41.81, lng: -88},
				zoom: 15
			})
			const places = new google.maps.places.PlacesService(map)
			map.addListener('click', handleClick)

			//place click
			var tthis = this
      function handleClick(event) {
        if (event.placeId) {
					places.getDetails({placeId: event.placeId, fields: ['name', 'formatted_address', 'place_id']}, 
						function(place, status) {
							if (status === 'OK') {
								var addr =  place.formatted_address.split(',')
								var locality = addr[1].trim()
								var region = addr[2].split(' ')[1]
								var country = addr[3].trim()
								tthis.getPlace({
									pid: place.place_id, 
									pname: place.name, 
									pcity:  locality, 
									pprovince:  region,
									pcountry:  country
								})
								.then(()=>{
									
								})
							}
					})
        } else{
					tthis.clearPlace()
				}
      }

			//geolocate
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => 
				{
					map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude })
					map.zoom = 8
				}, ()=>{})
			} 

		},
		computed: {
			...mapGetters([
				'currentPlace',
			]),
			placeShown(){
				return this.currentPlace != null
			}
		},
		methods: {
			...mapActions([
				'getPlace',
				'clearPlace',
				'errorMsg',
			]),
		}
	}
</script>

<style scoped>
	#map.short{
		height: 62%;
	}
	#map.full{
		height: 100%;
	}
	
	.title {
		font-weight: bold;
	}
	#infowindow-content {
		display: none;
	}
	#map #infowindow-content {
		display: inline;
	}

</style>