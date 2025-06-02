import { Button, Input, Select, SelectItem } from "@heroui/react";
import SelectRating from "@/app/dashboard/_components/movies/SelectRating";
import { Movie } from "@/entities";
import updateMovie from "@/actions/movies/update";

export default function FormUpdateMovie({ movie }: { movie: Movie }) {
    const { movieId } = movie;
    const updateMovieById = updateMovie.bind(null, movieId)
    return (
        <form action={updateMovieById} className="flex flex-col gap-5">
            <Input
                key="title"
                isRequired
                label="Movie Title"
                name="movieTitle"
                defaultValue={movie.movieTitle}
            />
            <Input
                key="description"
                isRequired
                label="Description"
                name="movieDescription"
                defaultValue={movie.movieDescription}

            />
            <Input
                key="duration"
                isRequired
                label="Movie Duration"
                name="movieDuration"
                defaultValue={movie.movieDuration}
            />
            <SelectRating defaultRating={movie.movieRating}/>
            <Input
                key="poster"
                isRequired
                label="Movie Poster"
                name="moviePhoto"
                type="file"
                defaultValue={movie.moviePhoto}
            />
            <Select name="isActive" label="Active" defaultSelectedKeys={movie.isActive}>
                <SelectItem key="true">true</SelectItem>
                <SelectItem key="false">false</SelectItem>
            </Select>
            <Button type="submit">
                Crear Pelicula
            </Button>
        </form>
    )
}