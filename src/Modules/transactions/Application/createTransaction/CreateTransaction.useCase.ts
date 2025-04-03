import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTransctionDto } from './CreateTransaction.dto';
import { TransactionService } from '../../Services/transactions.service';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private readonly transactionService: TransactionService) {}
  async execute(input: CreateTransctionDto) {
    const { dataHora } = input;

    if (new Date(dataHora) > new Date()) {
      throw new ConflictException(
        'Data e hora não podem ser maiores que o dia atual',
      );
    }

    try {
      await this.transactionService.CreateTransaction(input);
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
