'use client'

import { Armchair } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Showtime } from "@/entities";
import OcupiedSeats from "@/actions/showtimes/OcupiedSeats";
import updateShowtime from "@/actions/showtimes/update";

export default function SeatsTable({ showtime }: { showtime: Showtime }) {
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

    const isSeatOcupied = (row: string, col: number) => {
        const seatId = `${row}${col}`;
        return ocupiedSeats.includes(seatId);
    };

    const seat = selectedSeat ? String(selectedSeat.row + selectedSeat.col) : "";

    // Confirmar selección y actualizar ocupiedSeats
    const handleFinalConfirm = async () => {
        if (!selectedSeat) return;
        setLoading(true);
        setSuccess(false);
        const seatId = `${selectedSeat.row}${selectedSeat.col}`;
        const newOcupiedSeats = [...ocupiedSeats, seatId];
        await updateShowtime(showtime.showtimeId, newOcupiedSeats);
        setOcupiedSeats(newOcupiedSeats);
        setLoading(false);
        setSuccess(true);
        setSelectedSeat(null);
        setShowModal(false);
    };

    return (
        <div className="overflow-x-auto flex flex-col items-center justify-center mb-20">
            <div className="grid grid-cols-[40px_repeat(15,2rem)] gap-1">
                <div></div>
                {cols.map((col) => (
                    <div key={col} className="text-center font-bold text-white">{col}</div>
                ))}
                {rows.map((row) => (
                    <React.Fragment key={row}>
                        <div className="text-right font-bold text-white flex items-center pr-2">{row}</div>
                        {cols.map((col) => {
                            const ocupado = isSeatOcupied(row, col);
                            const isSelected = selectedSeat?.row === row && selectedSeat?.col === col;
                            return (
                                <div
                                    key={col}
                                    className={`w-8 h-8 flex items-center justify-center border border-gray-500 rounded
                                        ${ocupado
                                            ? "bg-red-700 opacity-60 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-blue-600"
                                                : "bg-gray-700 hover:bg-blue-500 cursor-pointer"
                                        }
                                    `}
                                    title={`${row}${col}`}
                                    onClick={() => {
                                        if (!ocupado && !loading) setSelectedSeat({ row, col });
                                    }}
                                >
                                    <Armchair className="w-5 h-5 text-white" />
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
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

            {/* Modal */}
            {showModal && selectedSeat && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg min-w-[300px] flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Confirmar Reserva</h2>
                        <div className="mb-2 text-gray-700">
                            <strong>Asiento:</strong> {seat}
                        </div>
                        <div className="mb-2 text-gray-700">
                            <strong>Horario:</strong> {showtime.showtimeDate}
                        </div>
                        <div className="mb-4 text-gray-700">
                            <strong>Precio:</strong> ${showtime.price}
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={handleFinalConfirm}
                                disabled={loading}
                            >
                                Confirmar
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}