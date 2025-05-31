import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ClientsService } from './clients/clients.service';
import { ClientsController } from './clients/clients.controller';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
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
    MoviesModule, ShowtimesModule, TicketsModule, AuthModule, ClientsModule],
  controllers: [AuthController, ClientsController],
  providers: [AuthService, ClientsService],
})
export class AppModule {}
