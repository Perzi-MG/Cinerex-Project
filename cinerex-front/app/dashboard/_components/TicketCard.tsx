import { API_URL } from "@/constants";
import { User } from "@/entities";
import { authHeathers } from "@/helpers/authHeaders";
import { Card, CardHeader, Divider, CardBody, CardFooter } from "@heroui/react";

export default async function TicketsCard() {
    const response = await fetch(`${API_URL}/auth/profile`, {
        headers: {
            ... (await authHeathers())
        }
    })



    const user: User = await response.json();
    return (
        <div className="flex flex-col px-10">
            <h1 className="font-bold text-white text-3xl">{user.userName} {user.userLastName}</h1>
            {
                user.tickets?.slice().reverse().map((ticket) => (
                    <div className="flex flex-col" key={ticket.ticketId}>
                        <Card className="max-w-[300px] my-5 bg-gradient-to-r from-[#02111B] to-[#00CFC1]">
                            <CardHeader>
                                <h1>{ticket.movieTittle}</h1>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <h1>Fecha: {ticket.showtimeDate}</h1>
                                <h1>Sala: {ticket.room}</h1>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <h1>Asiento: {ticket.seat}</h1>
                            </CardFooter>
                        </Card>
                        <Divider />
                    </div>
                ))
            }
        </div>
    )
}