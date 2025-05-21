import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';
import { SeatsModule } from './seats/seats.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';
import { ClientesService } from './clientes/clientes.service';
import { ClientesController } from './clientes/clientes.controller';
import { ClientesModule } from './clientes/clientes.module';
import { ManagersService } from './managers/managers.service';
import { ManagersController } from './managers/managers.controller';
import { ManagersModule } from './managers/managers.module';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './auth/constants/jwt.constants';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: 5432,
      username: 'postgres',
      password: 'TheBestPassword',
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
  }),
    AuthModule, MoviesModule, RoomsModule, SeatsModule, ShowtimesModule, TicketsModule, ClientesModule, ManagersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
