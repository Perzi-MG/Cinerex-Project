'use client'
import { ThemeProvider as NextThemeProvider } from "next-themes"

import { HeroUIProvider } from "@heroui/react"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}