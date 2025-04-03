import { Injectable } from '@nestjs/common';

import { TransactionService } from '../../Services/transactions.service';
import { AnalisysTransctionDto } from './AnalisysTransactions.dto';

@Injectable()
export class AnalisysTransactiosUseCase {
  constructor(private readonly transactionService: TransactionService) {}

  async execute(): Promise<AnalisysTransctionDto> {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

      const recentTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dataHora);
        return transactionDate > oneMinuteAgo;
      });

      const count = recentTransactions.length;
      const sum = recentTransactions.reduce((total, transaction) => {
        return total + transaction.valor;
      }, 0);
      const avg = sum / count;
      const min = recentTransactions.reduce((minValue, transaction) => {
        return transaction.valor < minValue ? transaction.valor : minValue;
      }, recentTransactions[0]?.valor || 0);
      const max = recentTransactions.reduce((minValue, transaction) => {
        return transaction.valor > minValue ? transaction.valor : minValue;
      }, recentTransactions[0]?.valor || 0);

      if (recentTransactions.length <= 0) {
        return { count: 0, sum: 0, avg: 0, min: 0, max: 0 };
      }
      return { count, sum, avg, min, max };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
