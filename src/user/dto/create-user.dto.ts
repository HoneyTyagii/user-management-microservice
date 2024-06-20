import { IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  username: string;

  @IsDateString()
  birthdate: string;
}
