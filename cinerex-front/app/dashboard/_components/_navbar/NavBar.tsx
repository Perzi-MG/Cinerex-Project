'use client'

import { Avatar, Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import NavItem from "./NavItem";
import Link from "next/link";
import { useState, useEffect } from "react";
import getCurrentUser from "@/actions/users/getCurrentUser";
import { User } from "@/entities";

export default function NavBar() {
    const [user, setUser] = useState<User | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        async function loadUser() {
            const userData = await getCurrentUser();
            if (userData) {
                setUser(userData);
                setIsLogged(true);
            }

        }
        loadUser();
    }, []);

    return (
        <Navbar isBordered shouldHideOnScroll maxWidth="full" className="py-3 mb-5">
            <NavbarBrand>
                <Image alt="Cine image" src="Cine_Logo.svg" width={50} />
                <p className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent text-xl font-bold">Cinerex</p>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavItem text="Inicio" path="/dashboard" />
                <NavItem text="Cartelera" path="/dashboard/billboard" />
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {
                        isLogged ? (
                            <Link href="/dashboard/settings">
                                <Avatar name={user?.userName} />
                            </Link>
                        ) : (
                            <Link href="/login">
                                <Button>Iniciar Sesión</Button>
                            </Link>
                        )
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}