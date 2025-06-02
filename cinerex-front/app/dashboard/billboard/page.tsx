'use client'

import BillboardGrid from "../_components/movies/FilterMovies";
import { useEffect, useState } from "react";
import ModalGeneric from "../_components/ModalGeneric";
import FormCreateMovie from "../_components/movies/FormCreateMovie";
import { API_URL } from "@/constants";
import { authHeathers } from "@/helpers/authHeaders";
import { User } from "@/entities";

export default function BillboardPage() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        async function loadUser() {
            const response = await fetch(`${API_URL}/auth/profile`, {
                headers: {
                    ... (await authHeathers()),
                }
            });

            if (!response.ok) return null;

            const userData: User = await response.json()
            if (userData?.userRoles && userData.userRoles.includes('Admin')) {
                setIsAdmin(true);
            }
        }
        loadUser();
    }, []);
    return (
        <div className="flex flex-col gap-6 items-center justify-center px-64">
            <div className="">
                {
                    isAdmin ? (
                        <ModalGeneric header="Crear Película">
                            <FormCreateMovie />
                        </ModalGeneric>
                    ) : (
                        <p></p>
                    )
                }
                <h1 className="font-bold text-3xl text-white">Cartelera</h1>
            </div>
            <BillboardGrid />
        </div>
    )
}