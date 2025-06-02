'use server'

import { API_URL } from "@/constants"
import { Showtime } from "@/entities"
import { authHeathers } from "@/helpers/authHeaders"

export default async function GetOneShowtime(id: string) {
    const responseMovies = await fetch(`${API_URL}/showtimes?movieId=${id}`, {
        headers: {
            ... (await authHeathers())
        }
    })
    const showtime: Showtime[] = await responseMovies.json()
    return showtime;
}