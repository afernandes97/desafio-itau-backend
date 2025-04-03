import { ConflictException, Injectable } from '@nestjs/common';
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

  async DeleteTransaction(): Promise<void> {
    console.log(this.transactions);
    if (this.transactions.length <= 0) {
      throw new ConflictException(
        'Não existe transações a serem excluidas no momento',
      );
    }
    this.transactions = [];
    return Promise.resolve();
  }

  async getAllTransactions(): Promise<CreateTransctionDto[]> {
    return Promise.resolve(this.transactions);
  }
}
