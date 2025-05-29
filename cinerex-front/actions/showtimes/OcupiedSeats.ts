import { API_URL } from "@/constants";
import { Showtime } from "@/entities";

export default async function OcupiedSeats(showtimeId: string){
    const response = await fetch(`${API_URL}/showtimes/${showtimeId}`);
    const data: Showtime = await response.json();
    const ocupiedSeats = data.ocupiedSeats;
    return ocupiedSeats
}