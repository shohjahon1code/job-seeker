import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/user.schema';
import { AuthDto, LoginDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: AuthDto) {
    const existingUser = await this.isExistingUser(body.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const salt = await genSalt(10);
    const passwordHash = await hash(body.password, salt);
    const newUser = new this.userModel({
      ...body,
      password: body.password.length ? passwordHash : '',
    });
    await newUser.save();
    const token = await this.issueTokenPair(String(newUser._id));
    return { user: newUser, ...token };
  }

  async login(body: LoginDTO) {
    const existingUser = await this.isExistingUser(body.email);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (body.password.length > 0) {
      const current_password = await compare(
        body.password,
        existingUser.password,
      );

      if (!current_password) throw new BadRequestException('Invalid password');

      const token = await this.issueTokenPair(String(existingUser._id));

      return { user: existingUser, ...token };
    }
  }

  async isExistingUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });
    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }
}
