'use client'

import { useEffect, useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { API_URL } from "@/constants";
import { Movie } from "@/entities";

export default function SelectMovie({ defaultRating }: { defaultRating?: string }) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/movies`)
            .then(res => res.json())
            .then(setMovies);
    }, []);

    return (
        <Select label="Movie" name="movieId" defaultSelectedKeys={defaultRating}>
            {movies.map((movie) => (
                <SelectItem key={movie.movieId}>
                    {movie.movieTitle}
                </SelectItem>
            ))}
        </Select>
    );
}