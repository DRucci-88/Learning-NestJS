import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class GetEstimateReport {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsLongitude()
  longitude: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsLatitude()
  latitude: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
