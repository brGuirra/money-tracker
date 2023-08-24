import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

// Models
import { Environments } from './environments';

export class EnvironmentVariables {
  // COMMON
  @IsEnum(Environments)
  public readonly NODE_ENV: Environments;

  @IsInt()
  @IsPositive()
  public readonly PORT: number;

  // DATABASE
  @IsString()
  @IsNotEmpty()
  public readonly DATABASE_URL: string;
}
