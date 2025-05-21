import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { Client } from 'src/clientes/entities/client.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Manager, Client]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: {
        expiresIn: EXPIRES_IN
      }, global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
