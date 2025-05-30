'use client'

import React, { useState, useEffect } from "react";
import { Movie, Showtime } from "@/entities";
import OcupiedSeats from "@/actions/showtimes/OcupiedSeats";
import updateShowtime from "@/actions/showtimes/update";
import SeatsGrid from "./SeatsGrid";
import ConfirmModal from "./ConfirmModal";
import CreateTicket from "@/actions/tickets/create";

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
        await CreateTicket({
            seat: seatId,
            showtimeId: showtime.showtimeId
        });
        setLoading(false);
        setSuccess(true);
        setSelectedSeat(null);
        setShowModal(false);
    };

    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center mb-20">
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
                <div className="mt-2 text-green-400">¡Asiento reservado correctamente!</div>
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