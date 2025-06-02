import { Select, SelectItem } from "@heroui/react"

export default function SelectRoom({defaultRating}: {defaultRating?: string}){
    const rooms = ["1", "2", "3", "4", "5"]

    return (
        <Select label="Room" name="roomNumber" defaultSelectedKeys={defaultRating}>
            {
                rooms.map((room) => (
                    <SelectItem key={room}>
                        {room}
                    </SelectItem>
                ))
            }
        </Select>
    )
}