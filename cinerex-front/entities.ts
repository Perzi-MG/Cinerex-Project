export interface User {
    userId: string;
    userEmail: string;
    userPassword: string;
    userRoles: string[];
    tickets?: Ticket[];
}

export interface Client {
    clientId: string;
    clientName: string;
    clientLastName: string;
    clientEmail: string
    user: User;
}

export interface Movie{
    movieId: string;
    movieTitle: string;
    movieDescription: string;
    movieDuration: number;
    movieRating: string;
    moviePhoto: string;
    isActive: boolean;
    showtimes: Showtime[];
}

export interface Room{
    roomId: string;
    roomName: string;
    roomCapacity: number;
    roomType: string;
    seats: Seat[];
    showtimes: Showtime[];
}

export interface Seat{
    seatId: string;
    seatRow: string;
    seatNumber: number;
    room: Room;
    tickets: Ticket[];
}

export interface Showtime{
    showtimeId: string;
    showtimeDate: string;
    price: number;
    ocupiedSeats: Array<string>
    movie: Movie;
    room?: Room;
    tickets?: Ticket[];
}

export interface Ticket{
    ticketId: string;
    showtime: Showtime;
    seat: Seat;
    user: User;
}