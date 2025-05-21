import { BadRequestException, Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Client } from 'src/clientes/entities/client.entity';
import { Manager } from 'src/managers/entities/manager.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    private jwtservice: JwtService) { }


  async registerClient(id: string, createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto)
    const client = await this.clientRepository.preload({
      clientId: id,
    })
    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }
    client.user = user;
    return this.clientRepository.save(client)
  }


  async register(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto)
    return this.userRepository.save(user)
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    const roles = createUserDto.userRoles
    if (roles.includes("Client")) {
      throw new BadRequestException("Invalid")
    }
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto)
    const manager = await this.managerRepository.preload({
      managerId: id,
    })
    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }
    manager.user = user;
    return this.managerRepository.save(manager)
  }


  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      }
    });
    if (!user) throw new UnauthorizedException("No estás autorizado");
    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword
    );
    if (!match) throw new UnauthorizedException("No está autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    }
    const token = this.jwtservice.sign(payload)
    return token
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.userPassword) {
      updateUserDto.userPassword = bcrypt.hashSync(updateUserDto.userPassword, 5);
    }
    const newUserData = await this.userRepository.preload({
      userId: id,
      ...updateUserDto
    })
    if (!newUserData) throw new NotFoundException()
    this.userRepository.save(newUserData)
    return newUserData
  }

}
