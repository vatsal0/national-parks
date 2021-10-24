<template>
	<div>
		<Navbar />
		<b-container v-if="loading" class="d-flex mt-3">
			<div class="justify-content-center align-items-center mx-auto text-center">
				<h3>Fetching results...</h3>
				<b-spinner class="mt-1" variant="warning"></b-spinner>
			</div>
			
		</b-container>

		<b-container v-else class="d-flex justify-content-center mt-3">
			<div v-if="results.length > 0">
				<div class="justify-content-center align-items-center mx-auto text-center my-3">
					<h3>Search results for "{{query}}"</h3>
				</div>
				<b-list-group>
					<b-card 
					v-for="result in results" 
					:key="result.parkCode" 
					:title="result.fullName" 
					:img-src="result.images[0].url"
					img-alt="Image"
					img-left
					img-width="25%"
					bg-variant="dark" 
					text-variant="white"
					class="my-2">
						<b-card-text>
							{{result.description}}
						</b-card-text>
						<b-card-text>
							<b-badge pill v-for="activity in result.activities" :key="activity.id" class="mr-1">{{activity.name}}</b-badge>
						</b-card-text>
						<b-button :href="'/parks/' + result.parkCode" variant="primary">Learn more</b-button>
					</b-card>
					<b-card >

					</b-card>
				</b-list-group>
			</div>
			<div v-else>
				<div class="justify-content-center align-items-center mx-auto text-center">
					<h3>No results found for "{{query}}"</h3>
					<h6 class="mt-1">Try another search!</h6>
				</div>
			</div>
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
			query: '',
			results: [],
			loading: false
		}
	},
	methods: {
		search(query) {
			this.query = query
			this.loading = true
			
			parkAPI.allParks().then(data => {
				this.results = data.data.data.filter(park => park.name.toLowerCase().includes(query.toLowerCase()))
				this.loading = false
			}) 
		}
	},
	beforeRouteUpdate(to, from, next) {
		this.search(to.query.query)
    next()
  },
	mounted() {
		this.search(this.$route.query.query)
	}
}
</script>