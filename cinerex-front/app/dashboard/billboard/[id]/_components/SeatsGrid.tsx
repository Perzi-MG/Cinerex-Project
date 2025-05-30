import React from "react";
import SeatCell from "./SeatCell";

export default function SeatsGrid({
    rows,
    cols,
    ocupiedSeats,
    selectedSeat,
    setSelectedSeat,
    loading
}: {
    rows: string[];
    cols: number[];
    ocupiedSeats: string[];
    selectedSeat: { row: string; col: number } | null;
    setSelectedSeat: (seat: { row: string; col: number }) => void;
    loading: boolean;
}) {
    const isSeatOcupied = (row: string, col: number) => ocupiedSeats.includes(`${row}${col}`);

    return (
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
                            <SeatCell
                                key={col}
                                ocupado={ocupado}
                                isSelected={isSelected}
                                seatId={`${row}${col}`}
                                onClick={() => {
                                    if (!ocupado && !loading) setSelectedSeat({ row, col });
                                }}
                            />
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}