<template>
	<b-modal 
	id="webcam-modal" 
	title="Webcam Images"
	ok-only
	ok-title="Done">
		<p v-if="cams.length == 0">Oops! Looks like there's no webcam images for this attraction.</p>
		<div v-else class="text-center">
			<b-img fluid :src="cams[current].images[0].url" :alt="cams[current].images[0].altText" />
			<h3 class="my-2">{{cams[current].title}}</h3>
			<p>{{cams[current].description}}</p>
			<b-row class="d-flex justify-content-center">
				<b-button size="sm" variant="primary" :disabled="current <= 0" @click="current -= 1"><b-icon icon="arrow-left-short" /></b-button>
				<p class="mx-2">Image {{current + 1}} of {{cams.length}}</p>
				<b-button size="sm" variant="primary" :disabled="current + 1 >= cams.length" @click="current += 1"><b-icon icon="arrow-right-short" /></b-button>
			</b-row>
		</div>
	</b-modal>
</template>

<script>
export default {
	data() {
		return {
			cams: [],
			current: 0
		}
	},
	methods: {
		load(cams) {
			this.cams = cams
			this.current = 0
			this.$bvModal.show('webcam-modal')
		}
	}
}
</script>