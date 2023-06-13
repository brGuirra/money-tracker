import { SignupUseCase } from '@modules/auth/domain/usecases';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { SignupOutputDto, SignupInputDto } from '../dtos';

@Controller('/v1/auth')
export class SignupController {
  constructor(
    @Inject(SignupUseCase)
    private readonly signupService: SignupUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @ApiOperation({
    summary: 'Register an user',
    description: 'Register an user',
    operationId: 'SignupUser',
  })
  @ApiCreatedResponse({
    description: 'Successfully registered user',
    type: SignupOutputDto,
  })
  public async create(@Body() data: SignupInputDto): Promise<SignupOutputDto> {
    const user = await this.signupService.execute(data);

    return plainToInstance(SignupOutputDto, user);
  }
}
