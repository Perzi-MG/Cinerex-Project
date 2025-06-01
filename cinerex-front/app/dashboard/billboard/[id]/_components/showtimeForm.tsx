import { Showtime } from "@/entities";
import { Select, SelectItem } from "@heroui/react";

export default function ShowtimeForm({
    showtimes = [],
    selectedShowtimeId,
    onSelectShowtime,
}: {
    showtimes?: Showtime[] | undefined;
    selectedShowtimeId?: string;
    onSelectShowtime: (id: string) => void;
}) {
    const showtimeArray = Array.isArray(showtimes) ? showtimes : [];

    return (
        <div className="flex flex-col gap-5 w-[25rem]">
            <h1 className="font-bold text-white text-xl">Horarios</h1>
            <Select
                variant="bordered"
                radius="sm"
                name="showtime"
                selectedKeys={selectedShowtimeId ? [selectedShowtimeId] : []}
                onSelectionChange={(keys) => {
                    const id = Array.from(keys)[0] as string;
                    onSelectShowtime(id);
                }}
            >
                {showtimeArray.map((showtime: Showtime) => (
                    <SelectItem key={String(showtime.showtimeId)}>
                        {showtime.showtimeDate}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}