'use client'

import { Tabs, Tab } from "@heroui/react"
import ShowtimeForm from "./showtimeForm"
import { Movie, Showtime } from "@/entities"
import React from "react";

export default function TabsComponent({ movie, showtime = [] }: { movie: Movie, showtime: Showtime[] }) {
    const [selected, setSelected] = React.useState("horarios");

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
                <ShowtimeForm showtimes={showtime}/>
            </Tab>
        </Tabs>
    )
}