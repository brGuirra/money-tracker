import type { CreateUser } from '@modules/auth/domain/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupInputDto implements CreateUser {
  @ApiProperty({
    description: "The user's name",
    type: 'string',
    minLength: 2,
    example: 'John Doe',
  })
  @Length(2)
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({
    description: "The user's email",
    type: 'string',
    format: 'email',
    example: 'johndoe@email.com',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: "The user's password",
    type: 'string',
    format: 'password',
    minLength: 8,
    pattern:
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
    example: 'StrongPassword@123',
  })
  public readonly password: string;
}
