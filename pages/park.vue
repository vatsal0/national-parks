<template>
	<div>
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

		<ParkInfo v-else :parkData="parkData" class="mt-2" />
	</div>
</template>

<script>
import parkAPI from '../utils/parkAPI.js'
import Navbar from '../components/Navbar.vue'
import ParkInfo from '../components/ParkInfo.vue'

export default {
	components: {
		Navbar,
		ParkInfo
	},
	data() {
		return {
			loading: true,
			parkData: {}
		}
	},
	head () {
		return {
			title: this.parkData ? this.parkData.fullName : "Park not found."
		}
	}, 
	created() {
		if (this.$route.query.parkCode.match('^[a-z]{4}')) {
			parkAPI.getPark(this.$route.query.parkCode).then(data => {
				this.parkData = data.data.data[0]
				this.loading = false
			})
		} else {
			this.loading = false
			this.parkData = undefined
		}
	}
}
</script>
