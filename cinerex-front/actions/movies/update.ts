'use server';

import { API_URL } from "@/constants";
import { authHeathers } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function updateMovie(movieId: string, formData: FormData) {
    const cleanData = new FormData()
    Array.from(formData.entries()).forEach(([key, value]) => {
        if (!key.startsWith("$")) {
            if (key === "file" || key === "moviePhoto") {
                cleanData.append("moviePhoto", value); // o "moviePhoto" según tu backend
            } else {
                cleanData.append(key, value);
            }
        }
    });
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: "PATCH",
        headers: {
            ...(await authHeathers())
        },
        body: cleanData
    })
    console.log(response)
    if (response.status === 200) {
        revalidateTag("dashboard:movies");
        revalidateTag(`dashboard:movies:${movieId}`);
        redirect(`/dashboard/billboard/${movieId}`);
    }
    return;
}