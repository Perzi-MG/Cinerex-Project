'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TabsComponent from "./_components/TabsComponent";
import { Movie, Showtime } from "@/entities";
import { API_URL } from "@/constants";
import GetToken from "../../_components/GetToken";
import FormUpdateMovie from "./_components/FormUpdateMovie";
import DeleteMovie from "./_components/DeleteMovie";
import { authHeathers } from "@/helpers/authHeaders";
import ModalGeneric from "../../_components/ModalGeneric";
import FormCreateShowtime from "./_components/FormCreateShowtime";

export default function MoviePage({ params }: { params: { id: string } }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showtime, setShowtime] = useState<Showtime[] | []>([]);
    const [movie, setMovie] = useState<Movie | undefined>();
    const router = useRouter();

    useEffect(() => {
        async function checkAuthAndLoad() {
            const { id } = await params;
            const token = GetToken()
            if (!token) {
                router.push('/login');
                return;
            }
            const userRes = await fetch(`${API_URL}/auth/profile`, { headers: {...(await authHeathers())}});
            const userData = await userRes.json();
            if (userData?.userRoles && userData.userRoles.includes('Admin')) {
                setIsAdmin(true);
            }
            const showtimeRes = await fetch(`${API_URL}/showtimes?movieId=${id}`);
            const showtime: Showtime[] = await showtimeRes.json()
            setShowtime(showtime);
            const movieRes = await fetch(`${API_URL}/movies/${id}`);
            const movie: Movie = await movieRes.json();
            setMovie(movie);
        }
        checkAuthAndLoad();
    }, [router]);

    return (
        <div className="flex flex-col gap-10 justify-center items-center">
            {
                isAdmin && movie ? (
                    <div className="flex flex-row gap-6">
                        <ModalGeneric header="Actualizar Película">
                            <FormUpdateMovie movie={movie}/>
                        </ModalGeneric>
                        <DeleteMovie movieId={movie.movieId}/>
                        <ModalGeneric header="Crear Horario">
                            <FormCreateShowtime movieId={movie.movieId}/>
                        </ModalGeneric>
                    </div>
                ) : (
                    <p></p>
                )
            }
            <h1 className="text-zinc-500 text-md">
                Cartelera / <span className="text-white font-bold">{movie?.movieTitle}</span>
            </h1>
            <h1 className="text-white font-bold text-4xl">{movie?.movieTitle}</h1>
            {movie && <TabsComponent movie={movie} showtime={showtime} />}
        </div>
    );
}