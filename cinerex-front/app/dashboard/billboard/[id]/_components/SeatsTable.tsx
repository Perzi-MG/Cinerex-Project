'use client'

import React, { useState, useEffect } from "react";
import { Movie, Showtime, User } from "@/entities";
import OcupiedSeats from "@/actions/showtimes/OcupiedSeats";
import updateShowtime from "@/actions/showtimes/update";
import SeatsGrid from "./SeatsGrid";
import ConfirmModal from "./ConfirmModal";
import CreateTicket from "@/actions/tickets/create";
import getCurrentUser from "@/actions/users/getCurrentUser";
import TicketModal from "./TicketModal";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function SeatsTable({ movie, showtime }: { movie: Movie, showtime: Showtime }) {
    const rows = Array.from({ length: 14 }, (_, i) => String.fromCharCode(65 + i));
    const cols = Array.from({ length: 15 }, (_, i) => i + 1);

    const [selectedSeat, setSelectedSeat] = useState<{ row: string; col: number } | null>(null);
    const [ocupiedSeats, setOcupiedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchOcupiedSeats() {
            const seats = await OcupiedSeats(showtime.showtimeId);
            setOcupiedSeats(seats ?? []);
        }
        fetchOcupiedSeats();
    }, [showtime.showtimeId]);

    const seat = selectedSeat ? String(selectedSeat.row + selectedSeat.col) : "";


    const handleFinalConfirm = async () => {
        if (!selectedSeat) return;
        setLoading(true);
        setSuccess(false);
        const seatId = `${selectedSeat.row}${selectedSeat.col}`;
        const newOcupiedSeats = [...ocupiedSeats, seatId];
        await updateShowtime(showtime.showtimeId, newOcupiedSeats);
        setOcupiedSeats(newOcupiedSeats);
        const user = await getCurrentUser();
        if (!user) {
            setLoading(false);
            alert("No se pudo obtener el usuario actual.");
            return;
        }
        const ticket = await CreateTicket({
            seat: seatId,
            showtimeId: showtime.showtimeId,
            userId: user.userId,
            movieTittle: movie.movieTitle,
            showtimeDate: showtime.showtimeDate,
            room: Number(showtime.roomNumber)
        });
        setLoading(false);
        setSuccess(true);
        setSelectedSeat(null);
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center mb-20">
            <SeatsGrid
                rows={rows}
                cols={cols}
                ocupiedSeats={ocupiedSeats}
                selectedSeat={selectedSeat}
                setSelectedSeat={setSelectedSeat}
                loading={loading}
            />
            {selectedSeat && (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <span className="text-white">
                        Asiento seleccionado: <span className="font-bold">{seat}</span>
                    </span>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        onClick={() => setShowModal(true)}
                        disabled={loading}
                    >
                        Confirmar
                    </button>
                </div>
            )}
            {loading && (
                <div className="mt-2 text-blue-400">Actualizando asientos...</div>
            )}
            {success && (
                <div className="flex flex-col gap-5 mt-2 text-green-400">
                    ¡Asiento reservado correctamente!
                    <Link href="/dashboard/settings">
                        <Button>Ver tus tickets</Button>
                    </Link>
                </div>
            )}
            <ConfirmModal
                show={showModal && !!selectedSeat}
                seat={seat}
                movie={movie}
                showtime={showtime}
                loading={loading}
                onConfirm={handleFinalConfirm}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
}