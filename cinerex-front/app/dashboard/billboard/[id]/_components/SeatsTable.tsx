'use client'

import { Armchair } from "lucide-react";
import React, { useState } from "react";

export default function SeatsTable() {
    const rows = Array.from({ length: 14 }, (_, i) => String.fromCharCode(65 + i)); // ['A', ..., 'N']
    const cols = Array.from({ length: 15 }, (_, i) => i + 1);

    const [selectedSeat, setSelectedSeat] = useState<{ row: string; col: number } | null>(null);
    const seat = selectedSeat ? String(selectedSeat.row + selectedSeat.col) : ""

    return (
        <div className="overflow-x-auto flex items-center justify-center mb-20">
            <div className="grid grid-cols-[40px_repeat(15,2rem)] gap-1">
                <div></div>
                {cols.map((col) => (
                    <div key={col} className="text-center font-bold text-white">{col}</div>
                ))}
                {rows.map((row) => (
                    <React.Fragment key={row}>
                        <div className="text-right font-bold text-white flex items-center pr-2">{row}</div>
                        {cols.map((col) => (
                            <div
                                key={col}
                                className={`w-8 h-8 flex items-center justify-center border border-gray-500 rounded cursor-pointer
                                    ${selectedSeat?.row === row && selectedSeat?.col === col
                                        ? "bg-blue-600"
                                        : "bg-gray-700 hover:bg-blue-500"}
                                `}
                                title={`${row}${col}`}
                                onClick={() => setSelectedSeat({ row, col })}
                            >
                                <Armchair className="w-5 h-5 text-white" />
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
            {selectedSeat && (
                <div className="mt-4 text-white">
                    Asiento seleccionado: <span className="font-bold">{seat}</span>
                </div>
            )}
        </div>
    );
}