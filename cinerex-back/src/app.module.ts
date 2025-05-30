import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    MoviesModule, ShowtimesModule, TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
