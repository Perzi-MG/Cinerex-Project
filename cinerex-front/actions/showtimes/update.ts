'use server'

import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export default async function updateShowtime(showtimeId: string, ocupiedSeats: string[]) {
    await fetch(`${API_URL}/showtimes/${showtimeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocupiedSeats }),
    });
}