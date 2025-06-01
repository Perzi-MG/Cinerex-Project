import { Movie } from "@/entities";
import { API_URL, TOKEN_NAME } from "@/constants";
import BillboardGrid from "../_components/movies/FilterMovies";
import { NextRequest } from "next/server";

export default async function BillboardPage() {
    const responseMovies = await fetch(`${API_URL}/movies`)
    const movies: Movie[] = await responseMovies.json()
    return (
        <div className="flex flex-col gap-6 items-center justify-center px-64">
            <h1 className="font-bold text-3xl text-white">Cartelera</h1>
            <BillboardGrid movies={movies}/>
        </div>
    )
}