import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeliculasModule } from './peliculas/peliculas.module';
import { SalasModule } from './salas/salas.module';
import { AsientosModule } from './asientos/asientos.module';
import { FuncionesModule } from './funciones/funciones.module';
import { BoletosModule } from './boletos/boletos.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeatsModule } from './seats/seats.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [PeliculasModule, SalasModule, AsientosModule, FuncionesModule, BoletosModule, AuthModule, MoviesModule, RoomsModule, SeatsModule, ShowtimesModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
