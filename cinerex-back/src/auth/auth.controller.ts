import { Controller, Get, Post, Body, Patch, Param, Delete, Res, BadRequestException, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './Decorators/cookies.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  registerUser(@Body() createUser: CreateUserDto){
    return this.authService.registerUser(createUser)
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  findOne(@Request() req){
    const userId = req.user.userId;
    return this.authService.findOne(userId)
  }

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
    const token = await this.authService.loginUser(loginUserDto)
    let expireDate = new Date()
    expireDate.setDate(expireDate.getDay() + 7)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: expireDate,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    return;
  }
  @Patch("/:id")
  updateUser(@Param('id') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }
}