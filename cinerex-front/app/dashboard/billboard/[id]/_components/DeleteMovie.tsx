import deleteMovie from "@/actions/movies/delete";
import { Button } from "@heroui/react";
import { LucideTrash } from "lucide-react";

export default function DeleteMovie({ movieId }: { movieId: string }) {
    const deleteMovieById = deleteMovie.bind(null, movieId)
    return (
        <form action={deleteMovieById}>
            <Button color="danger" type="submit">
                <LucideTrash size={20} />
            </Button>
        </form>
    )
}