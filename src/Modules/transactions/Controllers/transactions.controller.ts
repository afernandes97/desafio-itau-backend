import {
  Controller,
  Body,
  Post,
  ConflictException,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';

import { CreateTransctionDto } from '../Application/createTransaction/CreateTransaction.dto';
import { CreateTransactionUseCase } from '../Application/createTransaction/CreateTransaction.useCase';
import { DeleteTransactionUseCase } from '../Application/deleteTransaction/DeleteTransaction.useCase';

@Controller('transacao')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
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

  @Delete('')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async deleteTransactions() {
    try {
      await this.deleteTransactionUseCase.execute();
      return { statusCode: 200, message: 'Transactions deleted successfully' };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new ConflictException(errorMessage);
    }
    return;
  }
}
