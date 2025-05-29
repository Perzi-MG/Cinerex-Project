"use client";
import { API_URL } from "@/constants";
import { Input, Button, Form } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        setSubmitting(true);
        setError(null);
        e.preventDefault();
        const formData = new FormData(e.target);
        let authData: any = {};
        authData.userEmail = formData.get("userEmail");
        authData.userPassword = formData.get("userPassword");
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authData),
                credentials: 'include',
            });
            if (response.status === 201) {
                router.push('/dashboard');
            } else if (response.status === 401) {
                setError("Usuario o contraseña incorrectos.");
            } else {
                setError("Ocurrió un error. Intenta de nuevo.");
            }
        } catch (e) {
            setError("Ocurrió un error. Intenta de nuevo.");
        }
        setSubmitting(false);
        return;
    };

    return (
        <Form className="bg-gradient-to-r from-purple-800 to-blue-900 py-10 px-20 rounded-md flex flex-col items-center" onSubmit={handleSubmit}>
            <p className="text-3xl my-4 text-white font-bold ">
                Iniciar <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Sesión</span>
            </p>
            {error && (
                <div className="mb-4 text-red-400 font-semibold">{error}</div>
            )}
            <div className="flex flex-col gap-4 my-10 items-center">
                <Input className="mx-10" variant="underlined" label="Email" name="userEmail" type="email" isRequired={true} size="lg" />
                <Input className="mx-10" variant="underlined" label="Contraseña" name="userPassword" type="password" isRequired={true} size="lg" />
            </div>
            <div className="flex flex-col items-center gap-4">
                <Button className="text-lg bg-gradient-to-r from-purple-500 to-blue-700" size="md" type="submit" disabled={submitting}>
                    {submitting ? "Enviando..." : "Iniciar Sesión"}
                </Button>
                <p className="text-white">
                    No tienes cuenta? <Link href="/signup" className="font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Registrate</Link>
                </p>
            </div>
        </Form>
    );
}