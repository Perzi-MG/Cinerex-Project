'use client'
import { useState } from "react";
import { Movie } from "@/entities";
import ListMovieGrid from "./ListMoviesGrid";

export default function BillboardGrid({ movies }: { movies: Movie[] }) {
    const [rating, setRating] = useState<string | undefined>(undefined);

    const ratings = ["G", "GP", "R", "X"];

    return (
        <div>
            <div className="flex gap-2 mb-4">
                <button
                    className={`font-thin px-3 py-1 rounded ${rating === undefined ? "bg-blue-600 text-white" : "bg-zinc-700"}`}
                    onClick={() => setRating(undefined)}
                >
                    Todos
                </button>
                {ratings.map((r) => (
                    <button
                        key={r}
                        className={`font-thin px-3 py-1 rounded ${rating === r ? "bg-blue-600 text-white" : "bg-zinc-700"}`}
                        onClick={() => setRating(r)}
                    >
                        {r}
                    </button>
                ))}
            </div>
            <ListMovieGrid movies={movies} rating={rating} />
        </div>
    );
}