import { Movie } from "@/entities";
import MovieItem from "./movieItem";

export default function ListMovieGrid({
    movies = [],
    rating,
}: {
    movies?: Movie[];
    rating?: string;
}) {
    return (
        <div className="grid grid-cols-5 gap-3 py-2">
            {movies
                .filter((movie) => movie.isActive === true)
                .filter((movie) => (rating !== undefined ? movie.movieRating === rating : 'A'))
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