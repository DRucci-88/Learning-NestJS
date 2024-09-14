import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  hobby: number;

  @Expose()
  email: string;
}
