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
					<ParkCard v-for="result in results" :key="result.parkCode" :park="result" />
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
import ParkCard from '../components/ParkCard.vue'

export default {
	components: {
		Navbar,
		ParkCard
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
	head() {
		return {
			title: "Search results for '" + this.query + "'"
		}
	},
	beforeRouteUpdate(to, from, next) {
		// Vue router does not reload the page if redirected to the same link with different query parameters. So, we search again manually.
		if (from.query.query != to.query.query) {
			this.search(to.query.query)
		}
    next()
  },
	mounted() {
		this.search(this.$route.query.query)
	}
}
</script>