import { Showtime } from "@/entities";
import { Select, SelectItem } from "@heroui/react";

export default function ShowtimeForm({ showtimes = [] }: { showtimes?: Showtime[] }) {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-white text-xl">Horarios</h1>
            <Select className = "max-w-md" variant = "bordered" radius="sm" name="showtime" defaultSelectedKeys={undefined}>
                {showtimes.map((showtime: Showtime) => (
                    <SelectItem key={String(showtime.showtimeId)}>
                        {showtime.showtimeDate}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}