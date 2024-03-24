import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  id: string;

  @Expose()
  full_name: string;

  @Expose()
  email: string;

  @Expose()
  token: string;
}
