import '../style/style.css'
import '../style/hero.css'
import '../style/showcase.css'
import '../style/searchbar.css'
import '../style/footer.css'
import '../style/menu.css'
import '../style/breakpoints.css'
import {fetchMovies} from '../script/api'
import {IMovie} from '../script/interface'

let movies: IMovie[] = []
let topTen: IMovie[] = []
let newMovies: IMovie[] = []


// returned values are store in variable
const getMovies = async () => {
    try {
        movies = await fetchMovies()
        topTen = movies.slice(0, 10)
        newMovies =  movies.filter(movie => movie.year > 2013)
        renderMovies(topTen, ".top-10")
        renderMovies(newMovies, ".new-movies")
        renderMovies(movies, ".all-movies")

    } catch (err){
        document.querySelector('.movie-container')!.innerHTML = `<h2>Could not get movies.. Please try again later</h2>`
    }
}

// goes back to home page when MovieLand logo is clicked
document.querySelector('.logo')!.addEventListener('click', () => {
    window.location.reload()
})

// iterate over all items in movies and print to DOM
const renderMovies = (moviesArray: IMovie[], source: string) => {

    // prints top 10 movies of all time
    moviesArray.map(movie => {
        document.querySelector(source)!.innerHTML += `
        <div class="card">
        <img src="${movie.image}"
            alt="" class="card-img"
            data-value="${movie.imdbid}">
        <div class="card-text-wrapper">
            <div class="rating">
                <p class="card-rating">${movie.rating}<img src="./src/assets/star.png" class="star"></p>
                <p class="card-rating">${movie.year}</p>
            </div>
            <div class="movie-main-info">
                <h3 class="card-heading">${movie.title}</h3>
                <p class="genre">${movie.genre}</p>
            </div>

            <div class="card-footer">
                <button class="card-button"><a href="${movie.trailer}" target="_blank" class="link">Trailer</a></button>
                <button class="card-button" data-value="${movie.imdbid}">Info</button>
            </div>
        </div>
    </div>
        `
    })
}

// find which movie click happend on
document.querySelector('.content-wrapper')!.addEventListener('click', e => {

    const target = e.target as HTMLElement
    const findClickedMovie = target.dataset.value
    const clickedMovie = movies.find(movie => movie.imdbid === findClickedMovie)
    console.log(clickedMovie)

    if (target.className === "card-img" || target.className === "card-button") {
        console.log("clicked on button:", findClickedMovie)

        document.querySelector('.showcase')!.innerHTML = `
        <button class="back-button">Back</button>
        <h2 class="showcase-heading">${clickedMovie?.title}</h2>
        <div class="movie-stats">
            <p>${clickedMovie?.year}</p>
            <div class="movie-ratings">
                <p>Rating: ${clickedMovie?.rating}/10</p>
                <p>Rank: ${clickedMovie?.rank}</p>
            </div>
        </div>
        <div class="showcase-images">
            <img src="${clickedMovie?.image}"
                alt="${clickedMovie?.title} image">
            <iframe src="${clickedMovie?.trailer}" frameborder="0"></iframe>
        </div>
        <div class="movie-sub-stats">
            <p class="movie-genre">${clickedMovie?.genre}</p>
            <p class="movie-description">${clickedMovie?.description}</p>

            <ul class="movie-crew">
                <li class="movie-crew-item">Director: ${clickedMovie?.director}</li>
                <li class="movie-crew-item"> Writers: ${clickedMovie?.writers}</li>
            </ul>
        </div>

        `
        // empty rest of HTML on site
        document.querySelector('.content-wrapper')!.innerHTML = ''
        window.scrollTo(1,1)
    }
})


// lets user go back to previous page
document.querySelector('.showcase')!.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (target.className === "back-button") {
        window.location.reload()
    }
})


// functionality for search bar
document.querySelector('.search-wrapper')!.addEventListener('input', e => {

    const dropdown = document.querySelector('.search-bar-dropdown')!

    // empties dropdown to avoid duplicates
    dropdown!.innerHTML = ''


    const target = e.target as HTMLInputElement
    const value = target.value.toLowerCase()

    // returns movies that matches input
    const searchedMovie: IMovie[] = movies.filter(movie => movie.title.toLowerCase().includes(value))


    if (value.length >= 2) {
        // opens dropdown and displays movies that matches search value
        dropdown.classList.remove("hidden")
        window.scrollTo(1,1)

        // iterates over and prints every matching movie to DOM
        searchedMovie.map(movie => {

            dropdown!.innerHTML += `
                            <div class="dropdown-row" data-value="${movie.imdbid}">
                        <div class="dropdown-img" data-value="${movie.imdbid}">
                            <img src="${movie.thumbnail}"
                                alt="" class="thumbnail"
                                data-value="${movie.imdbid}">
                        </div>
                        <div class="dropdown-text" data-value="${movie.imdbid}">
                            <h3 data-value="${movie.imdbid}">${movie.title}</h3>
                            <p data-value="${movie.imdbid}">${movie.year}</p>
                            <p data-value="${movie.imdbid}">${movie.director}</p>
                        </div>
                    </div>
                    `
        })
    } else {
        dropdown.classList.add('hidden')
    }
})

document.querySelector('.search-bar-dropdown')!.addEventListener('click', e => {

    const dropdownImg = document.querySelector('.dropdown-img')!
    const dropdownText = document.querySelector('.dropdown-text')!
    const dropdownRow = document.querySelector('.dropdown-row')!


    // find which movie click happend on

    const target = e.target as HTMLElement
    const findClickedMovie = target.dataset.value
    const clickedMovie = movies.find(movie => movie.imdbid === findClickedMovie)
    console.log(clickedMovie)

    if (target === dropdownImg || target === dropdownText || dropdownRow) {
        console.log("clicked on button:", findClickedMovie)

        document.querySelector('.showcase')!.innerHTML = `
        <button class="back-button">Back</button>
        <h2 class="showcase-heading">${clickedMovie?.title}</h2>
        <div class="movie-stats">
            <p>${clickedMovie?.year}</p>
            <div class="movie-ratings">
                <p>Rating: ${clickedMovie?.rating}/10</p>
                <p>Rank: ${clickedMovie?.rank}</p>
            </div>
        </div>
        <div class="showcase-images">
            <img src="${clickedMovie?.image}"
                alt="${clickedMovie?.title} image">
            <iframe src="${clickedMovie?.trailer}" frameborder="0"></iframe>
        </div>
        <div class="movie-sub-stats">
            <p class="movie-genre">${clickedMovie?.genre}</p>
            <p class="movie-description">${clickedMovie?.description}</p>

            <ul class="movie-crew">
                <li class="movie-crew-item">Director: ${clickedMovie?.director}</li>
                <li class="movie-crew-item"> Writers: ${clickedMovie?.writers}</li>
            </ul>
        </div>

        `
        // empty rest of HTML on site
        document.querySelector('.content-wrapper')!.innerHTML = ''
        document.querySelector('.search-bar-dropdown')!.classList.add('hidden')
        window.scrollTo(1,1)
    } else if (target !== dropdownImg || dropdownText || dropdownText) {
        document.querySelector('.search-bar-dropdown')!.classList.add('hidden')
    }
})

document.querySelector('.content-wrapper')!.addEventListener('click', e => {

    const dropdown = document.querySelector('.search-bar-dropdown')!

    if(e.target !== dropdown) {
        dropdown.classList.add('hidden')
    } 
})

document.querySelector('.showcase')!.addEventListener('click', e => {

    const dropdown = document.querySelector('.search-bar-dropdown')!

    if(e.target !== dropdown) {
        dropdown.classList.add('hidden')
    } 
})

const menuBtn = document.querySelector('#menu-btn')!
const menu = document.querySelector('.menu')!

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu-display')
})

// Invoke getMovies
getMovies()














