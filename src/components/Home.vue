<template>
	<div>
	<input v-model="errz" :value="errz" type="text" @change="err1"/>
		<aboutModal></aboutModal>
		<div class="vw-100" :class="{full: !placeShown, short: placeShown}" id="map"></div>
		<input id="search-input" class="controls d-absolute mt-1 ml-1 border border-success" type="text" placeholder="Search map...">
	</div>
</template>
	


<script>
import {mapActions, mapGetters} from 'vuex'
import About from './About.vue'
export default {
    	components: {
			aboutModal: About
		},
		data() {
			return {
				errz: this.error
			}
		},
		created(){
			this.loadPlaceTypes()
		},
		mounted(){
			//Load Map
			const map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: 41.81, lng: -88},
				zoom: 15,
				disableDefaultUI: true,
				zoomControl: true,
				zoomControlOptions: {
						position: google.maps.ControlPosition.RIGHT_TOP
				},
			})
			const places = new google.maps.places.PlacesService(map)
			map.addListener('click', handleClick)

			//Search box
			var input = document.getElementById('search-input')
			var searchBox = new google.maps.places.SearchBox(input)
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

			// Bias the SearchBox results towards current map's viewport.
			map.addListener('bounds_changed', function() {
				searchBox.setBounds(map.getBounds())
			});
			
			//place get details
			var tthis = this
			function getPlaceDetails(placeId){
				if (placeId) {
					places.getDetails({placeId: placeId, fields: ['name', 'formatted_address', 'place_id', 'types']}, 
						function(place, status) {

							//discriminate on place type
							var ofType = false;
							tthis.placeTypes.forEach(t=>{
								if(place.types.includes(t.id.toLowerCase().trim().replace(' ','_'))){ ofType = true }
							})
							
							if (status === 'OK' && ofType) {
								//parse address parts
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
							}
						})
				}
			}

			var markers = [];
			searchBox.addListener('places_changed', function() {
				var sPlaces = searchBox.getPlaces()

				if (sPlaces && sPlaces.length == 0) { return; }

				// Clear old markers
				markers.forEach(function(marker) { marker.setMap(null); })
				markers = [];

				// For each place, get the icon, name and location
				var bounds = new google.maps.LatLngBounds()
				sPlaces.forEach(function(place) {
					if (!place.geometry) {
						console.log("Returned place contains no geometry")
						return;
					}

					// Create a marker for each place
					var m = new google.maps.Marker({
						map: map,
						title: place.name,
						position: place.geometry.location
					})
					m.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
					m.addListener('click', function() {
						map.setZoom(map.getZoom() + 1)
						map.panTo(place.geometry.location)
					})
					m.addListener('dblclick', function() {
						map.setZoom(19)
						map.panTo(place.geometry.location)
						getPlaceDetails(place.place_id)
					})
					markers.push(m)

					if (place.geometry.viewport) {
						// Only geocodes have viewport
						bounds.union(place.geometry.viewport)
					} else {
						bounds.extend(place.geometry.location)
					}

				});
				//Select Place if only one
				if(sPlaces.length == 1){
					getPlaceDetails(sPlaces[0].place_id)
				} else {
					tthis.clearPlace()
				}
				map.fitBounds(bounds)
			});

			//place click
      function handleClick(event) {
				getPlaceDetails(event.placeId)
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
				'placeTypes',
				'error'
			]),
			placeShown(){
				return this.currentPlace != null
			},
		},
		methods: {
			...mapActions([
				'getPlace',
				'loadPlaceTypes',
				'clearPlace',
				'errorMsg',
			]),
			err1(){
				this.errorMsg(this.errz)
			}
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

		#search-input {
			background-color: #fff;
			font-size: 15px;
			padding: 7px 9px;
			width: auto;
			min-width: 120px;
			max-width: 400px;
			border-radius: 3px;
		}

		#search-input:focus {
			width: 75%;
			max-width: auto;
		}

</style>