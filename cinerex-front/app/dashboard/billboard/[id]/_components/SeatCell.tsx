import { Armchair } from "lucide-react";

export default function SeatCell({ ocupado, isSelected, onClick, seatId }: {
    ocupado: boolean;
    isSelected: boolean;
    onClick: () => void;
    seatId: string;
}) {
    return (
        <div
            className={`w-8 h-8 flex items-center justify-center border border-gray-500 rounded
                ${ocupado
                    ? "bg-red-700 opacity-60 cursor-not-allowed"
                    : isSelected
                        ? "bg-blue-600"
                        : "bg-gray-700 hover:bg-blue-500 cursor-pointer"
                }
            `}
            title={seatId}
            onClick={ocupado ? undefined : onClick}
        >
            <Armchair className="w-5 h-5 text-white" />
        </div>
    );
}