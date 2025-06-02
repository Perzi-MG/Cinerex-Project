'use server';

import { API_URL } from "@/constants";
import { authHeathers } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteMovie(movieId: string, formData: FormData){
    formData.delete("$ACTION_REF_0")
    formData.delete("$ACTION_0:1")
    formData.delete("$ACTION_0:0")
    const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            ... (await authHeathers())
        },
        body: formData
    })
    if(response.status === 200) {
        revalidateTag("dashboard:movies")
        redirect("/dashboard/billboard")
    }
    return;
} 