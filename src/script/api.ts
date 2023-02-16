// Fetching movies from API
export const fetchMovies = async () => {
	const res = await fetch(
		'https://imdb-top-100-movies.p.rapidapi.com/',
		options
	)

	if (!res.ok) {
		throw new Error(
			`Could not get movies, reason: ${res.status} ${res.statusText}`
		)
	}
	return await res.json()
}

const API_KEY = import.meta.env.API_KEY

const options = {
	method: 'GET',
	headers: {
		'Content-Type': 'application.json',
		'X-RapidAPI-Key': '7b1dc438damsh4b7942ffbd9b89ap1a8c0ajsn3730c02dab28',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
		'X-Content-Type': 'Options: nosniff'
	}
}