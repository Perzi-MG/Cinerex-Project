import { Movie } from "@/entities";
import ListMovieScroll from "./_components/movies/ListMoviesScroll";
import { API_URL } from "@/constants";
import { Button, Card, CardFooter, Image } from "@heroui/react";
import HomeCard from "./_components/HomeCard";

export default async function DashboardPage() {
    const responseMovies = await fetch(`${API_URL}/movies`)
    const movies: Movie[] = await responseMovies.json()
    return (
        <div className="flex flex-col gap-6 justify-center px-44">
            <HomeCard/>
            <h1 className="font-bold text-white text-2xl">Películas en Cartelera</h1>
            <ListMovieScroll movies={movies} />
        </div>
    )
}