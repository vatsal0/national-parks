<template>
	<b-navbar type="dark" variant="dark">
		<b-navbar-brand href="/">
			<b-avatar class="rounded-circle" src="https://d18qs7yq39787j.cloudfront.net/uploads/contest/2369/small_pic_national-park-service-hero.jpeg" />
			National Park Service Info
		</b-navbar-brand>
		
		<b-navbar-nav class="ml-auto">
			<b-nav-form @submit.stop.prevent="searchParks()">
				<b-form-input v-model="parkSearch" autocomplete="off" size="sm" class="mr-sm-2" placeholder="Search parks"></b-form-input>
			</b-nav-form>
		</b-navbar-nav>
	</b-navbar>
</template>

<script>
import parkAPI from '../utils/parkAPI.js'

export default {
	data() {
		return {
			parkSearch: '',
			parks: []
		}
	},
	methods: {
		searchParks() {
			if (this.parkSearch.trim().length > 0)
			this.$router.push({path: '/search', query: { query: this.parkSearch.trim().toLowerCase() }, force: true})
		}
	},
	mounted() {
		parkAPI.allParks().then(data => {
			this.parks = data.data.data
		}) 
	}
}
</script>