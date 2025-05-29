import { Movie } from "@/entities";
import { API_URL } from "@/constants";
import BillboardGrid from "../_components/movies/FilterMovies";

export default async function BillboardPage() {
    const responseMovies = await fetch(`${API_URL}/movies`)
    const movies: Movie[] = await responseMovies.json()
    return (
        <div className="flex flex-col gap-6 justify-center px-64">
            <h1 className="font-bold text-3xl text-white">Cartelera</h1>
            <BillboardGrid movies={movies}/>
        </div>
    )
}