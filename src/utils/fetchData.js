import axios from 'axios'
import { md5 } from 'js-md5'

const fetchItems = async (hash, productIds) => {
	const response = await axios.post(
		`${process.env.REACT_APP_API_URL}`,
		{
			action: 'get_items',
			params: { ids: productIds },
		},
		{
			headers: {
				'X-Auth': hash,
			},
		}
	)

	return response
}

export const getProducts = async (offset = 0, limit = 50) => {
	const date = new Date()
	const hash = md5(
		`${process.env.REACT_APP_API_PASSWORD}_${date.getUTCFullYear()}${(
			'0' +
			(date.getUTCMonth() + 1)
		).slice(-2)}${date.getUTCDate()}`
	)

	let response = await axios.post(
		`${process.env.REACT_APP_API_URL}`,
		{
			action: 'get_ids',
			params: { offset: offset, limit: limit },
		},
		{
			headers: {
				'X-Auth': hash,
			},
		}
	)

	const productIds = response.data.result

	return await fetchItems(hash, productIds)
}

export const getFilteredProducts = async filter => {
	const date = new Date()
	const hash = md5(
		`${process.env.REACT_APP_API_PASSWORD}_${date.getUTCFullYear()}${(
			'0' +
			(date.getUTCMonth() + 1)
		).slice(-2)}${date.getUTCDate()}`
	)
	console.log(filter)
	let response = await axios.post(
		`${process.env.REACT_APP_API_URL}`,
		{
			action: 'filter',
			params: { ...filter },
		},
		{
			headers: {
				'X-Auth': hash,
			},
		}
	)

	const productIds = response.data.result

	return await fetchItems(hash, productIds)
}
