'use server'

import { API_URL } from "@/constants"
import { revalidateTag } from "next/cache";

export default async function CreateTicket(data: any) {
    const response = await fetch(`${API_URL}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (response.status === 201) revalidateTag("dashboard:tickets");
}