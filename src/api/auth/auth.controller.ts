import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDTO } from './dto/auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/register')
  async register(@Body() body: AuthDto) {
    return await this.authService.register(body);
  }

  @HttpCode(200)
  @ApiBody({ type: LoginDTO })
  @Post('/login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }
}
