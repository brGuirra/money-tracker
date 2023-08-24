import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

// Models
import type { UserModel } from '@modules/auth/domain/models';

export class SignupOutputDto implements UserModel {
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

  @Exclude()
  public readonly password: string;

  @Exclude()
  public readonly updatedAt: Date;

  @Exclude()
  public readonly createdAt: Date;
}
