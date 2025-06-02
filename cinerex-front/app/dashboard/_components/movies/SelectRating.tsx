import { Select, SelectItem } from "@heroui/react"

export default function SelectRating({defaultRating}: {defaultRating?: string}){
    const ratings = ["G", "GP", "R", "X"]

    return (
        <Select label="Rating" name="movieRating" defaultSelectedKeys={defaultRating}>
            {
                ratings.map((rating) => (
                    <SelectItem key={rating}>
                        {rating}
                    </SelectItem>
                ))
            }
        </Select>
    )
}