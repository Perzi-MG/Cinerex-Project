'use client'

import { usePathname } from "next/navigation";
import NavBar from "./_components/_navbar/NavBar";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    const path = usePathname()
    return (
        <div className="">
            <NavBar key="navbar"/>
            <main key="main-content">
                {children}
            </main>
        </div>
    );
}