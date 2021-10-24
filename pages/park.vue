<template>
	<div>
		<b-modal id="exceptions-modal" title="Operating Hours Exceptions">
			<div v-for="exception in exceptions" :key="exception.name" class="mb-2">
				<h6>{{exception.name}}</h6>
				<p>{{new Date(exception.startDate).toLocaleDateString("en-US", dateOptions)}} through {{new Date(exception.endDate).toLocaleDateString("en-US", dateOptions)}}</p>
				<b-row v-for="day in days" :key="day">
					<b-col>{{day}}</b-col>
					<b-col>{{exception.exceptionHours[day.toLowerCase()] || "Closed"}}</b-col>
				</b-row>
			</div>
		</b-modal>

		<Navbar />
		<b-container v-if="loading" class="d-flex mt-3">
			<div class="justify-content-center align-items-center mx-auto text-center">
				<h3>Loading...</h3>
				<b-spinner class="mt-1" variant="warning"></b-spinner>
			</div>
		</b-container>
		<b-container v-else-if="parkData == undefined" class="text-center mt-2">
			<h1>Park not found.</h1>
		</b-container>
		<b-container v-else class="mt-2">
			<h1 class="d-flex align-items-center justify-content-center">
				{{parkData.fullName}} 
				<b-link :href="parkData.url" target="_blank" class="ml-2">
					<b-icon lg icon="link45deg">
				</b-icon></b-link> 
			</h1>

			<b-row class="my-4">
				<b-col>
					<h3>About</h3>
					<p>
						{{parkData.description}}
					</p>

					<h3>Activities</h3>
					<b-badge pill variant="warning" v-for="activity in parkData.activities" :key="activity.id" class="mr-1">{{activity.name}}</b-badge>

					<h3 class="mt-4">Operating Hours</h3>
					<div v-for="operatingHours in parkData.operatingHours" :key="operatingHours.name" class="mb-2">
						<h6 class="d-flex align-items-center">
							{{operatingHours.name}} 
							<b-button 
							@click="showExceptions(operatingHours.exceptions)"
							v-if="operatingHours.exceptions.length > 0" 
							variant="danger" 
							size="sm" 
							class="ml-2">
							<b-icon icon="exclamation-circle"></b-icon> Exceptions</b-button> 
						</h6>
						
						<p>{{operatingHours.description}}</p>
						<b-row v-for="day in days" :key="day">
							<b-col>{{day}}</b-col>
							<b-col>{{operatingHours.standardHours[day.toLowerCase()]}}</b-col>
						</b-row>
					</div>
				</b-col>
				<b-col>
					<b-card class="mb-4">
						<div id="map" style="min-height:25rem"></div>
					</b-card>

					<h3 class="d-flex align-items-center">
						Directions
						<b-link :href="parkData.directionsUrl" target="_blank" class="ml-2">
							<b-icon lg icon="link45deg">
						</b-icon></b-link> 
					</h3>
					<p>
						{{parkData.directionsInfo}}
					</p>
				</b-col>
			</b-row>

			<h3 class="d-flex align-items-center">
				Image Gallery
				<b-button 
				@click="showWebcams()" 
				variant="success" 
				size="sm" 
				class="ml-2">
				<b-icon icon="camera"></b-icon> View webcam pictures</b-button> 
			</h3>

			<b-carousel
				id="park-pictures"
				v-model="slide"
				:interval="4000"
				controls
				fade
				indicators
				background="#333"
				class="text-center my-2"
				style="text-shadow: 2px 2px 3px #333;"
			>
				<b-carousel-slide
					v-for="image, index in parkData.images"
					:key="index"
					:caption="image.title"
					:text="image.caption"
					:img-src="image.url"
				>
				<template v-slot:img>
					<b-aspect aspect="16:9" class="overflow-hidden">
						<b-img 
							:src="image.url" 
							height="625rem">
						</b-img>
					</b-aspect>
				</template>
				</b-carousel-slide>
			</b-carousel>
		</b-container>
	</div>
</template>

<script>
import parkAPI from '../utils/parkAPI.js'
import Navbar from '../components/Navbar.vue'

export default {
	components: {
		Navbar
	},
	data() {
		return {
			loading: true,
			parkData: {},
			slide: 0,
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			dateOptions: {
				weekday: 'long', 
				year: 'numeric', 
				month: 'long', 
				day: 'numeric'
			},
			exceptions: []
		}
	},
	methods: {
		showExceptions(exceptions) {
			this.exceptions = exceptions
			this.$bvModal.show('exceptions-modal')
		},
		showWebcams() {
			parkAPI.getWebcams(this.parkCode).then(data => {
				console.log(data.data.data.filter(cam => cam.images.length > 0))
			})
		}
	},
	head () {
		return {
			title: this.parkData.fullName,
			script: [
				{
					src: 'https://cdn.klokantech.com/mapbox-gl-js/v0.43.0/mapbox-gl.js'
				}
			],
			link: [
				{
					rel: 'stylesheet',
					href: "https://cdn.klokantech.com/mapbox-gl-js/v0.43.0/mapbox-gl.css"
				}
			]
		}
	}, 
	mounted() {
		parkAPI.getPark(this.$route.query.parkCode).then(data => {
			this.parkData = data.data.data[0]
			this.loading = false

			if (this.parkData != undefined) {
				const mapboxgl = require('mapbox-gl')

				this.$nextTick(() => {
					new mapboxgl.Map({
						accessToken: process.env.MAPBOX_TOKEN,
						container: 'map',
						style: 'mapbox://styles/mapbox/streets-v11',
						center: [parseFloat(this.parkData.longitude), parseFloat(this.parkData.latitude)],
						zoom: 15,
						maxZoom: 18,
						maxBounds: [
							[parseFloat(this.parkData.longitude) - .3, parseFloat(this.parkData.latitude) - .1],
							[parseFloat(this.parkData.longitude) + .3, parseFloat(this.parkData.latitude) + .1]
						]
					})
				})
	
			}
		})
	}
}
</script>
