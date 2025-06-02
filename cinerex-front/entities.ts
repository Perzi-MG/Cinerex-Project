export interface User {
    userId: string;
    userEmail: string;
    userPassword: string;
    userRoles: string[];
    tickets?: Ticket[];
    userName: string;
    userLastName: string;
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
    movieDuration: string;
    movieRating: string;
    moviePhoto: string;
    isActive: string;
    showtimes: Showtime[];
}
export interface Showtime{
    showtimeId: string;
    showtimeDate: string;
    price: string;
    ocupiedSeats?: Array<string>
    roomNumber?: string;
    movieId: string;
    movies: Movie
}

export interface Ticket{
    ticketId: string;
    showtime: Showtime;
    seat: string;
    user: User;
    movieTittle: string;
    showtimeDate: string;
    room: number;
}