import '../style/style.css'
import '../style/showcase.css'
import '../style/hero.css'

interface IMovie {
    description: string,
    director: Array<string>,
    genre: Array<string>,
    id: string,
    image: string,
    imdbid: string,
    rank: number,
    rating: number,
    thumbnail: string,
    title: string,
    trailer: string,
    writers: Array<string>,
    year: number
}

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application.json',
        'X-RapidAPI-Key': '7b1dc438damsh4b7942ffbd9b89ap1a8c0ajsn3730c02dab28',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
    }
};


// Fetching movies from API
const fetchMovies = async () => {
    const res = await fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)

    if (!res.ok) {
        throw new Error(`Could not get movies, reason: ${res.status} ${res.statusText}`)
    }
    return await res.json()
}


// returned values are store in variable
const movies: IMovie[] = await fetchMovies()

const topTen: IMovie[] = movies.slice(0, 10)

const restOfMovies: IMovie[] = movies.slice(10)

console.log("rest of movies:", restOfMovies)





// iterate over all items in movies and print to DOM
const renderMovies = () => {

    // prints top 10 movies of all time
    topTen.map(movie => {
        document.querySelector('.top-10')!.innerHTML += `
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


    restOfMovies.map(movie => {
        document.querySelector('.movies')!.innerHTML += `
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
                <button class="card-button card-button-info" data-value="${movie.imdbid}">Info</button>
            </div>
        </div>
    </div>
    `
    })
}

renderMovies()


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
        document.querySelector('.content-wrapper')!.innerHTML = ''
    }
})

// lets user go back to previous page
document.querySelector('.showcase')!.addEventListener('click', e => {
    const target = e.target as HTMLElement
    if (target.className === "back-button") {
        window.location.reload()
    }
})


// function that presents more details about movie
// const renderDetails = () => {
//     // document.querySelector('.cards-container')!.innerHTML = ''
//     document.querySelector('.showcase')!.innerHTML = `
//     <section class="showcase">
//         <h2 class="showcase-heading">Life of Pi</h2>
//         <div class="movie-stats">
//             <p>2012 - 2h 7m</p>
//             <div class="movie-ratings">
//                 <p>Rating: 7.9/10</p>
//                 <p>Rank: 1</p>
//             </div>
//         </div>
//         <div class="showcase-images">
//             <img src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
//                 alt="image">
//             <iframe src="https://www.youtube.com/embed/EXeTwQWrcwY" frameborder="0"></iframe>
//         </div>
//         <div class="movie-sub-stats">
//             <p class="movie-genre">Adventure, Drama, Fantasy</p>
//             <p class="movie-description">A young man who survives a disaster at sea is hurtled into an epic journey of
//                 adventure and discovery. While
//                 cast away, he forms an unexpected connection with another survivor: a fearsome Bengal tiger.</p>

//             <ul class="movie-crew">
//                 <li class="movie-crew-item">Director: Ang Lee</li>
//                 <li class="movie-crew-item"> Writers: Yann Martel, David Magee</li>
//                 <li class="movie-crew-item">Stars: Suraj Sharma, Irrfan Khan, Adil Hussain</li>
//             </ul>
//         </div>

//     </section>
//     `
// }













