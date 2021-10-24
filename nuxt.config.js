module.exports = {
	modules: [
		'bootstrap-vue/nuxt'
	],
	bootstrapVue: {
    icons: true
  },
	target: 'static',
	env: {
		PARK_API_TOKEN: process.env.PARK_API_TOKEN,
		MAPBOX_TOKEN: process.env.MAPBOX_TOKEN
	}
}