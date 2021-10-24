<template>
	<div>
		<Navbar />
		<b-container>
		</b-container>
	</div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
	components: {
		Navbar
	},
	head() {
		return {
			title: "National Park Service Info"
		}
	}
}
</script>