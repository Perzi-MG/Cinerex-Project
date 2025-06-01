import { API_URL } from "@/constants";
import { User } from "@/entities";
import { authHeathers } from "@/helpers/authHeaders";

export default async function getCurrentUser() {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
            ... (await authHeathers()),
        }
    });

    if (!response.ok) return null;
    
    const user: User = await response.json()
    console.log(user.userName);
    return user;
}