import {
  Controller,
  Body,
  Post,
  ConflictException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateTransctionDto } from '../Application/createTransaction/CreateTransaction.dto';
import { CreateTransactionUseCase } from '../Application/createTransaction/CreateTransaction.useCase';

@Controller('transacao')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post('')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async createTransaction(@Body() data: CreateTransctionDto) {
    try {
      await this.createTransactionUseCase.execute(data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new ConflictException({
        statusCode: 422,
        message: errorMessage,
      });
    }
    return;
  }
}
