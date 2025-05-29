import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@heroui/react";

interface NavItemProps {
    text: string;
    path: string;
}

export const NavItem = ({ text, path }: NavItemProps) => {
    const pathName = usePathname();
    return (
        <NavbarItem>
            <Link href={path}>
                {text}
            </Link>
        </NavbarItem>
    )
}

export default NavItem;