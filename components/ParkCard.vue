<template>
	<b-card 
		no-body 
		bg-variant="dark" 
		text-variant="white"
		class="my-2 overflow-hidden">
		<b-row no-gutters>
			<b-col lg="5" class="d-flex">
				<b-card-img-lazy :src="park.images[0].url" :alt="park.images[0].altText" class="rounded-0"></b-card-img-lazy>
			</b-col>
			<b-col lg="7">
				<b-card-body :title="park.fullName">
					<b-card-text>
						{{park.description}}
					</b-card-text>
					<b-card-text>
						<b-badge pill variant="warning" v-for="activity in park.activities" :key="activity.id" class="mr-1">{{activity.name}}</b-badge>
					</b-card-text>
					<b-button :href="'/park?parkCode=' + park.parkCode" variant="primary">Learn more</b-button>
				</b-card-body>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
export default {
	props: {
		park: Object
	}
}
</script>