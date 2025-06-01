import { API_URL } from "@/constants";

export default async function registerUser(formData: FormData){
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        body: formData
    })
    return;
}