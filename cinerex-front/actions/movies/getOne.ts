'use server'

import { API_URL } from "@/constants"
import { Movie } from "@/entities"
import { authHeathers } from "@/helpers/authHeaders"

export default async function GetOneMovie(id: string) {
    const responseMovies = await fetch(`${API_URL}/movies/${id}`, {
        headers: {
            ... (await authHeathers())
        }
    })
    const movie: Movie = await responseMovies.json()
    return movie;
}