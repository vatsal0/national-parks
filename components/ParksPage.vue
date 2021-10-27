<template>
	<div>
		<b-pagination
		v-model="page"
		:total-rows="parks.length"
		:per-page="pageSize"
		align="center"
		first-number
		last-number 
		pills/>
		<b-list-group>
				<ParkCard v-for="park in parkPage" :key="park.parkCode" :park="park" />
		</b-list-group>
		<b-pagination
		v-model="page"
		:total-rows="parks.length"
		:per-page="pageSize"
		align="center"
		first-number
		last-number 
		pills/>
	</div>
</template>

<script>
import ParkCard from './ParkCard.vue'

export default {
	components: {
		ParkCard
	},
	props: {
		parks: Array
	},
	data() {
		return {
			page: 1,
			pageSize: 5,
			parkPage: []
		}
	},
	methods: {
		loadPage(page) {
			this.page = page
			this.parkPage = this.parks.slice((page - 1) * this.pageSize, page * this.pageSize)
		}
	},
	created() {
		this.loadPage(1)
	},
	watch: {
		page(newPage, oldPage) {
			if (newPage != oldPage) this.loadPage(newPage)
		},
		parks() {
			this.loadPage(this.page)
		}
	}

}
</script>