'use client'

import { Tabs, Tab } from "@heroui/react"
import ShowtimeForm from "./showtimeForm"
import { Movie, Showtime } from "@/entities"
import React from "react";
import SeatsTable from "./SeatsTable";

export default function TabsComponent({ movie, showtime = [] }: { movie: Movie, showtime: Showtime[] }) {
    const showtimeArray = Array.isArray(showtime) ? showtime : [];
    const [selected, setSelected] = React.useState("horarios");
    const [selectedShowtimeId, setSelectedShowtimeId] = React.useState<string | undefined>(showtimeArray[0]?.showtimeId);

    // Encuentra el showtime seleccionado
    const selectedShowtime = showtimeArray.find(s => s.showtimeId === selectedShowtimeId);

    return (
        <Tabs
            variant="underlined"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(String(key))}
        >
            <Tab key={'sinopsis'} title="Sinopsis">
                Parte de Sinopsis
            </Tab>
            <Tab key={'horarios'} title="Horarios">
                <ShowtimeForm
                    showtimes={showtime}
                    selectedShowtimeId={selectedShowtimeId}
                    onSelectShowtime={setSelectedShowtimeId}
                />
                {selectedShowtime && (
                    <SeatsTable movie = {movie} showtime={selectedShowtime} />
                )}
            </Tab>
        </Tabs>
    )
}