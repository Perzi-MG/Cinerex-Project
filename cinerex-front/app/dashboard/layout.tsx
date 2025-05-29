'use client'

import { usePathname } from "next/navigation";
import NavBar from "./_components/_navbar/NavBar";

export default function DashboardLayout({children}: {children: React.ReactNode}){
    const path = usePathname()
    return <div className="">
        <NavBar/>
        {children}
    </div>
}