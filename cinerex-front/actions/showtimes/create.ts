'use server'

import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";

export default async function createShowtime(formData: FormData) {
    let showtime: any = {};
    for (const key of Array.from(formData.keys())) {
        if(!key.includes("$ACTION_ID")) {
            showtime[key] = formData.get(key);
        }
    }
    const response = await fetch(`${API_URL}/showtimes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(showtime)
    })
    console.log(showtime)
    console.log(response)
    if(response.status === 201) revalidateTag("dashboard:showtimes")
}