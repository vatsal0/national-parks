<template>
	<b-card  
	:title="park.fullName" 
	:img-src="park.images[0].url"
	img-alt="Image"
	img-left
	img-width="25%"
	bg-variant="dark" 
	text-variant="white"
	class="my-2">
		<b-card-text>
			{{park.description}}
		</b-card-text>
		<b-card-text>
			<b-badge pill variant="warning" v-for="activity in park.activities" :key="activity.id" class="mr-1">{{activity.name}}</b-badge>
		</b-card-text>
		<b-button :href="'/park/' + park.parkCode" variant="primary">Learn more</b-button>
	</b-card>
</template>

<script>
export default {
	props: {
		park: Object
	}
}
</script>