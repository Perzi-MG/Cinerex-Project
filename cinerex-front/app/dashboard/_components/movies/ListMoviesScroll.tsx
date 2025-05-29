import { Movie } from "@/entities";
import MovieItem from "./movieItem";

export default function ListMovieScroll({ movies = [] }: { movies?: Movie[] }) {
    return (
        <div className="flex flex-row gap-3 overflow-x-auto scrollbar-thin py-2">
            {movies
                .filter((movie) => movie.isActive === true)
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
    );
}