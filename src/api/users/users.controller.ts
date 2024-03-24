import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User, UserDocument } from 'src/models/user.schema';
import { UserD } from 'src/common/decorators/user.decorator';

@ApiTags('Profile')
@Controller('api/profile')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getProfile(@UserD() user: UserDocument): Promise<User> {
    const users = await this.userService.getProfile(user);

    return users;
  }
}
