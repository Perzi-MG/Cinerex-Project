import { Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import NavItem from "./NavItem";

export default function NavBar() {
    return (
        <Navbar isBordered shouldHideOnScroll maxWidth="full" className="py-3 mb-5">
            <NavbarBrand>
                <Image alt="Cine image" src="Cine_Logo.svg" width={50} />
                <p className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent text-xl font-bold">Cinerex</p>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavItem text="Inicio" path="/dashboard"/>
                <NavItem text="Cartelera" path="/dashboard/billboard"/>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button>
                        Iniciar Sesión
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}