<template>

    <div class="vw-100" id="map"></div>

</template>
	

<script>
export default {
		data() {
			return {
			}
		},
		created(){
			
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
			}
			
		}
	}

</script>

<style scoped>
	#map{
		height: 62%;
	}
</style>