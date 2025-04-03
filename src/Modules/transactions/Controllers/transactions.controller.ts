import {
  Controller,
  Body,
  Post,
  ConflictException,
  UsePipes,
  ValidationPipe,
  Delete,
  Get,
} from '@nestjs/common';

import { CreateTransctionDto } from '../Application/createTransaction/CreateTransaction.dto';
import { CreateTransactionUseCase } from '../Application/createTransaction/CreateTransaction.useCase';
import { DeleteTransactionUseCase } from '../Application/deleteTransaction/DeleteTransaction.useCase';
import { AnalisysTransactiosUseCase } from '../Application/analisysTransactions/AnalisysTransactions.useCase';

@Controller('')
export class TransactionController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly analisysTransactionUseCase: AnalisysTransactiosUseCase,
  ) {}

  @Post('transacao')
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

  @Delete('transacao')
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
  }

  @Get('estatistica')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async getAnalisysTransactions() {
    try {
      const returnedTransaction =
        await this.analisysTransactionUseCase.execute();
      return returnedTransaction;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      throw new ConflictException(errorMessage);
    }
    return;
  }
}
