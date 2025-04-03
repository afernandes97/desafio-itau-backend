import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../Services/transactions.service';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private readonly transactionService: TransactionService) {}
  async execute() {
    try {
      await this.transactionService.DeleteTransaction();
      return;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
