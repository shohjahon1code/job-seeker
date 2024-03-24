import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/register')
  async register(@Body() body: AuthDto): Promise<AuthResponseDto> {
    const { user, token } = await this.authService.register(body);

    return plainToInstance(AuthResponseDto, {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      token: token,
    });
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: LoginDTO): Promise<LoginResponseDto> {
    const { existingUser, token } = await this.authService.login(body);

    const responseDto = plainToInstance(LoginResponseDto, {
      id: existingUser._id,
      full_name: existingUser.full_name,
      email: existingUser.email,
      token: token,
    });

    return responseDto;
  }
}
