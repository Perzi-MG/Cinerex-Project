import { Button, Input } from "@heroui/react";
import createShowtime from "@/actions/showtimes/create";
import SelectRoom from "./SelectRoom";

export default function FormCreateShowtime({ movieId }: { movieId: string }) {
    return (
        <form action={createShowtime} className="flex flex-col gap-5">
            <Input
                key="date"
                isRequired
                label="Date"
                type="date"
                name="showtimeDate"
            />
            <Input
                key="price"
                isRequired
                label="Price"
                name="price"
            />
            <input type="hidden" name="movieId" value={movieId} />
            <SelectRoom />
            <Button type="submit">
                Crear Horario
            </Button>
        </form>
    );
}