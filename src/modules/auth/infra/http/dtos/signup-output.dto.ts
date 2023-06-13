import type { UserModel } from '@modules/auth/domain/models';
import { ApiProperty } from '@nestjs/swagger';

export class SignupOutputDto
  implements Omit<UserModel, 'password' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: "User's ID",
    type: 'string',
    format: 'uuid',
    example: '5cd1031e-3906-403e-87e4-a201a7ba6f28',
  })
  public readonly id: string;

  @ApiProperty({
    description: "The user's name",
    type: 'string',
    minLength: 2,
    example: 'John Doe',
  })
  public readonly name: string;

  @ApiProperty({
    description: "The user's email",
    type: 'string',
    format: 'email',
    example: 'johndoe@email.com',
  })
  public readonly email: string;
}
