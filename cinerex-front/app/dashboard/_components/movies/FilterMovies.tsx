'use client'
import { useState } from "react";
import ListMovieGrid from "./ListMoviesGrid";

export default function BillboardGrid() {
    const [rating, setRating] = useState<string | undefined>(undefined);

    const ratings = ["G", "GP", "R", "X"];

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-2 mb-4">
                <button
                    className={`font-thin px-3 py-1 rounded ${rating === undefined ? "bg-[#00CFC1] text-[#02111B]" : "bg-[#02111B] text-[#00CFC1]"}`}
                    onClick={() => setRating(undefined)}
                >
                    Todos
                </button>
                {ratings.map((r) => (
                    <button
                        key={r}
                        className={`font-thin px-3 py-1 rounded ${rating === r ? "bg-[#00CFC1] text-[#02111B]" : "bg-[#02111B] text-[#00CFC1]"}`}
                        onClick={() => setRating(r)}
                    >
                        {r}
                    </button>
                ))}
            </div>
            <ListMovieGrid rating={rating} />
        </div>
    );
}