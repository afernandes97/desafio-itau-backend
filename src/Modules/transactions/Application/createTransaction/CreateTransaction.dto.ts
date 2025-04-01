import { IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class CreateTransctionDto {
  /**
   * Validando numero inteiro usando IsPositive
   * Tratando o isNumber para garantir consistencia no dado
   */
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  valor: number;

  /**
   * Utilizando IsISO8601 para validar o padrão de data e hora
   */
  @IsISO8601()
  dataHora: string;
}
