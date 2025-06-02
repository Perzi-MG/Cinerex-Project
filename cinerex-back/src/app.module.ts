import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { TicketsModule } from './tickets/tickets.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EXPIRES_IN, JWT_KEY } from './auth/constants/jwt.constants';
import { AwsModule } from './aws/aws.module';

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
    MoviesModule, ShowtimesModule, TicketsModule, AuthModule, AwsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
