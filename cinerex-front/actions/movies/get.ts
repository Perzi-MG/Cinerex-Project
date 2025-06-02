'use server'

import { API_URL } from "@/constants"
import { Movie } from "@/entities"
import { authHeathers } from "@/helpers/authHeaders"

export default async function GetMovies() {
    const responseMovies = await fetch(`${API_URL}/movies`, {
        headers: {
            ... (await authHeathers())
        }
    })
    const movies: Movie[] = await responseMovies.json()
    return movies;
}