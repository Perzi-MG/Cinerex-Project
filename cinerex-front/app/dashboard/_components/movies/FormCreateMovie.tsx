import { Button, Input, Select, SelectItem } from "@heroui/react";
import SelectRating from "./SelectRating";
import createMovie from "@/actions/movies/create";

export default function FormCreateMovie() {
    return (
        <form action={createMovie} className="flex flex-col gap-5">
            <Input
                key="title"
                isRequired
                label="Movie Title"
                name="movieTitle"
            />
            <Input
                key="description"
                isRequired
                label="Description"
                name="movieDescription"
            />
            <Input
                key="duration"
                isRequired
                label="Movie Duration"
                name="movieDuration"
            />
            <SelectRating />
            <Input
                key="poster"
                isRequired
                label="Movie Poster"
                name="moviePhoto"
                type="file"
            />
            <Select name="isActive" label="Active">
                <SelectItem key="true">true</SelectItem>
                <SelectItem key="false">false</SelectItem>
            </Select>
            <Button type="submit">
                Crear Pelicula
            </Button>
        </form>
    )
}