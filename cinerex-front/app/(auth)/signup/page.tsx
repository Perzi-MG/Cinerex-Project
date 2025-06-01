'use client'

import { API_URL } from "@/constants";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormRegisterUser() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const authData = {
            userEmail: formData.get("userEmail"),
            userPassword: formData.get("userPassword"),
            userName: formData.get("userName"),
            userLastName: formData.get("userLastName")
        };

        try {
            const responseRegister = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authData),
                credentials: 'include',
            });
            if (responseRegister.status === 201) {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userEmail: authData.userEmail,
                        userPassword: authData.userPassword
                    }),
                    credentials: 'include',
                });
                if (response.status === 201) {
                    router.push('/dashboard');
                } else {
                    setError("Ocurrió un error. Intenta de nuevo.");
                }
            }

        } catch (e) {
            setError("Ocurrió un error. Intenta de nuevo.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-800 to-blue-900 py-10 px-20 rounded-md flex flex-col items-center gap-4">
                <p className="text-3xl my-4 text-white font-bold" key="title">
                    Crear <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Cuenta</span>
                </p>
                <Input
                    key="email"
                    isRequired
                    label="Email"
                    name="userEmail"
                    type="email"
                    disabled={submitting}
                />
                <Input
                    key="password"
                    isRequired
                    label="Password"
                    name="userPassword"
                    type="password"
                    disabled={submitting}
                />
                <Input
                    key="name"
                    isRequired
                    label="Name"
                    name="userName"
                    disabled={submitting}
                />
                <Input
                    key="lastName"
                    isRequired
                    label="Last Name"
                    name="userLastName"
                    disabled={submitting}
                />
                <Button
                    key="submit"
                    type="submit"
                    className="text-lg bg-gradient-to-r from-purple-500 to-blue-700"
                    size="md"
                    isLoading={submitting}
                >
                    Crear Cuenta
                </Button>
                {error && (
                    <p key="error" className="text-red-500 text-sm">{error}</p>
                )}
                <p key="login-link" className="text-white">
                    Ya tienes cuenta? <Link href="/login" className="font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Iniciar Sesión</Link>
                </p>
            </form>
        </div>
    );
}