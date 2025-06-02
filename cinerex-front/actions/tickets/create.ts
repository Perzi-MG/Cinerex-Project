'use server'

import { API_URL } from "@/constants"
import { authHeathers } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function CreateTicket(data: any) {

    const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            ... (await authHeathers())
         },
        body: JSON.stringify(data)
    });
    console.log(data);
    console.log(response)
    if (response.status === 201) revalidateTag("dashboard:tickets");
}