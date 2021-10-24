const axios = require('axios')

function request(path, params={}) {
	params['api_key'] = 'kxBESfnCgDMrhW0nCqwrx4dLJyNE5cBVRewJCGj2' 
	return axios({
		method: 'get',
		url: 'https://developer.nps.gov/api/v1' + path,
		params: params
	})
}

export default {
	allParks() {
		return request('/parks', {limit: 500})
	},
	getPark(parkCode) {
		return request('/parks', {parkCode: parkCode})
	},
	getWebcams(parkCode) {
		return request('/webcams', {parkCode: parkCode, limit: 500})
	}
}