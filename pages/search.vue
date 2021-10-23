<template>
	<div>
		<Navbar />
		<h6 v-if="loading">Loading!</h6>
		<div v-if="!loading">
			<h6 v-for="result in results" :key="result.parkCode">{{result.fullName}}</h6>
		</div>
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