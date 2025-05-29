import { API_URL } from "@/constants";
import { Movie, Showtime } from "@/entities";
import TabsComponent from "./_components/TabsComponent";
import SeatsTable from "./_components/SeatsTable";

export default async function MoviePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const responseMovie = await fetch(`${API_URL}/movies/${id}`, {
        next: {
            tags: [`dashboard:movies:${id}`]
        }
    })
    const movie: Movie = await responseMovie.json();
    const responseShowtime = await fetch(`${API_URL}/showtimes?movieId=${id}`)
    const showtime: Showtime[] = await responseShowtime.json();
    return (
        <div className="flex flex-col gap-10 justify-center px-64">
            <h1 className="text-zinc-500 text-md">Cartelera / <span className="text-white font-bold">{movie.movieTitle}</span></h1>
            <h1 className="text-white font-bold text-4xl">{movie.movieTitle}</h1>
            <TabsComponent movie={movie} showtime={showtime}/>
            <h1 className="font-bold text-white text-xl">Elije tu asiento</h1>
            <SeatsTable/>
        </div>
    )
}