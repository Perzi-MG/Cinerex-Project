'use server'

import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";

export default async function GetToken() {
    const cookieStore = cookies()
    const token = (await cookieStore).get(TOKEN_NAME)?.value;
    return token;
}