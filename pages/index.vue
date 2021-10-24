<template>
	<div>
		<Navbar />
		<b-container>
			<div class="my-2 text-center">
				<h1>Welcome!</h1>
				<h3>Select from the list of activities below:</h3>
			</div>

			<div class="text-center mb-4">
				<b-badge variant="warning" v-for="activity, index in activities" :key="activity.id" class="mr-1 mt-2">
					<span class="d-flex align-items-center justify-content-center pl-2">
						{{activity.name}}
						<b-form-checkbox v-model="selected" class="ml-1" :disabled="loading" :value="index"></b-form-checkbox>
					</span>
				</b-badge>
			</div>

			<div v-if="loading" class="justify-content-center align-items-center mx-auto text-center">
				<h3>Fetching results...</h3>
				<b-spinner class="mt-1" variant="warning"></b-spinner>
			</div>
			
			<div v-else-if="parks.length > 0">
				<b-pagination
				v-model="page"
				:total-rows="parks.length"
				:per-page="5"
				aria-controls="parkList"
				align="center"
				first-number
				last-number
				></b-pagination>
				<ul id="parkList">
						<ParkCard v-for="park in parkPage" :key="park.parkCode" :park="park" />
				</ul>
			</div>

			<div v-else-if="selected.length > 0" class="text-center">
				<h3>No parks were found with all of these activities.</h3>
				<h6>Try broadening your search!</h6>
			</div>
			
		</b-container>
	</div>
</template>

<script>
import parkAPI from '../utils/parkAPI.js'
import Navbar from '../components/Navbar.vue'
import ParkCard from '../components/ParkCard.vue'

export default {
	components: {
		Navbar,
		ParkCard
	},
	data() {
		return {
			allParks: [],
			activitySearch: '',
			activities: [],
			selected: [],
			loading: false,
			parks: [],
			page: 1,
			parkPage: []
		}
	},
	methods: {
		loadPage(page) {
			this.parkPage = this.parks.slice((page - 1) * 5, page * 5)
		}
	},
	head() {
		return {
			title: "National Park Service Info"
		}
	},
	mounted() {
		parkAPI.getAllActivities().then(data => {
			this.activities = data.data.data
		})

		parkAPI.getAllParks().then(data => {
			this.allParks = data.data.data
		})
	},
	watch: {
		selected(newArray) {
			var indexList = newArray.map(index => this.activities[index].id).join(',')
			this.loading = true

			parkAPI.getParksByActivity(indexList).then(data => {
				var activityData = data.data.data

				// Merge the results in linear time
				var parkCodeTable = {}

				activityData.forEach((activity, i) => {
					activity.parks.forEach((park, j) => {
						if (i == 0) {
							parkCodeTable[park.parkCode] = 1
						} else if (park.parkCode in parkCodeTable) {
							parkCodeTable[park.parkCode] += 1
						}
					})
				});

				this.parks = this.allParks.filter(park => park.parkCode in parkCodeTable && parkCodeTable[park.parkCode] == activityData.length)
				this.loading = false
				this.page = 1
				this.loadPage(this.page)
			})
		},
		page(newPage) {
			this.loadPage(newPage)
		}
	}
}
</script>