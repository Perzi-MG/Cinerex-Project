'use client'

import { useEffect, useState } from "react";
import GetMovies from "@/actions/movies/get";
import MovieItem from "./movieItem";
import { API_URL } from "@/constants";
import { Movie } from "@/entities";

export default function ListMovieGrid({ rating }: { rating?: string }) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchMovies() {
            const response = await fetch(`${API_URL}/movies`)
            const movies: Movie[] = await response.json();
            setMovies(movies);
        }
        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-8">
                {movies
                    .filter((movie) => movie.isActive === "true")
                    .filter((movie) => (rating !== undefined ? movie.movieRating === rating : true))
                    .map((movie) => (
                        <MovieItem
                            key={movie.movieId}
                            title={movie.movieTitle}
                            poster={movie.moviePhoto}
                            description={movie.movieDescription}
                            id={movie.movieId}
                        />
                    ))
                }
            </div>
        </div>
    );
}