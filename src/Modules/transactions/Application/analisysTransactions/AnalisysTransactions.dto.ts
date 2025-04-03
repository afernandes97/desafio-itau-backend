import { IsNumber } from 'class-validator';

export class AnalisysTransctionDto {
  count: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  sum: number;
  avg: number;
  min: number;
  max: number;
}
