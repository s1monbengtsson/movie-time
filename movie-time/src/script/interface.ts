/**
 * Interface
 */

export interface IMovie {
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