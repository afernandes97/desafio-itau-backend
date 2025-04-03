import { Injectable } from '@nestjs/common';
import { CreateTransctionDto } from '../Application/createTransaction/CreateTransaction.dto';

@Injectable()
export class TransactionService {
  private transactions: CreateTransctionDto[] = [];

  async CreateTransaction(
    transaction: CreateTransctionDto,
  ): Promise<CreateTransctionDto> {
    this.transactions.push(transaction);
    return Promise.resolve(transaction);
  }

  async getAllTransactions(): Promise<CreateTransctionDto[]> {
    return Promise.resolve(this.transactions);
  }
}
