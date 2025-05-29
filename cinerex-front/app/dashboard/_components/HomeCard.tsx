import { Card, CardFooter, Button, Image } from "@heroui/react"
import Link from "next/link"

export default function HomeCard() {
    return (
        <Card isFooterBlurred className="w-full h-[30rem] relative overflow-hidden">
            <Image
                alt="Fondo de la card"
                src="FondoCard.jpg"
                className="w-full h-full object-cover z-0"
            />
            <CardFooter className="border-t-1 border-zinc-100/50 absolute bottom-0 gap-4 w-full flex flex-col justify-between items-start px-10 py-5">
                <h1 className="font-bold text-3xl text-white">Vive la magia del cine en Cinerex</h1>
                <p className="text-zinc-400">Disfruta de los últimos estrenos, promociones exclusivas y la mejor experciencia cinematográfica</p>
                <Button size="lg" className="text-lg bg-gradient-to-r from-purple-500 to-blue-700 rounded">
                    <Link href="/dashboard/billboard">
                        Cartelera
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}