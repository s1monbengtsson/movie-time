/**
 * Fetching movies from api
 */

export const fetchMovies = async () => {
	const res = await fetch(
		'VITE_RAPIDAPI_KEY',
		options
	)

	if (!res.ok) {
		throw new Error(
			`Could not get movies, reason: ${res.status} ${res.statusText}`
		)
	}
	return await res.json()
}

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY

const options = {
	method: 'GET',
	headers: {
		'Content-Type': 'application.json',
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
		'X-Content-Type': 'Options: nosniff'
	}
}