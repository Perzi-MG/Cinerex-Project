import { API_URL } from "@/constants";
import { Image } from "@heroui/react";
import Link from "next/link";

interface MovieItemProps {
    title: string;
    poster: string;
    description: string;
    id: string;
}

export default function MovieItem({ title, poster, description, id }: MovieItemProps) {
    return (
        <Link href={`/dashboard/billboard/${id}`} className="flex flex-col gap-3 w-51 flex-shrink-0">
            <Image alt="movie poster" radius="sm" src={poster} width={200} isZoomed />
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-white text-md">{title}</h1>
                <p className="flex-wrap text-sm text-zinc-400">{description}</p>
            </div>
        </Link>
    )
}