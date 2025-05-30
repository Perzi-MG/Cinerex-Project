import React from "react";
import { Movie, Showtime } from "@/entities";

export default function ConfirmModal({
    show,
    seat,
    movie,
    showtime,
    loading,
    onConfirm,
    onCancel
}: {
    show: boolean;
    seat: string;
    movie: Movie;
    showtime: Showtime;
    loading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg min-w-[300px] flex flex-col items-center">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Confirmar Reserva</h2>
                <div className="mb-2 text-gray-700">
                    <strong>Película:</strong> {movie.movieTitle}
                </div>
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
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        Confirmar
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}