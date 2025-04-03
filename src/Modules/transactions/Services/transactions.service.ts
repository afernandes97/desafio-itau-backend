import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateTransctionDto } from '../Application/createTransaction/CreateTransaction.dto';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  private transactions: CreateTransctionDto[] = [];

  async CreateTransaction(
    transaction: CreateTransctionDto,
  ): Promise<CreateTransctionDto> {
    this.transactions.push(transaction);
    this.logger.log(`Nova transação criada: ${JSON.stringify(transaction)}`);
    return Promise.resolve(transaction);
  }

  async DeleteTransaction(): Promise<void> {
    this.logger.debug(`Excluir transações. Total: ${this.transactions.length}`);

    if (this.transactions.length <= 0) {
      this.logger.warn(
        'Tentativa de deletar transações, mas não há nenhuma disponível.',
      );
      throw new ConflictException(
        'Não existe transações a serem excluídas no momento',
      );
    }

    this.transactions = [];
    this.logger.log('Todas as transações foram excluídas.');
    return Promise.resolve();
  }

  async getAllTransactions(): Promise<CreateTransctionDto[]> {
    this.logger.verbose(
      `Buscando todas as transações. Total: ${this.transactions.length}`,
    );
    return Promise.resolve(this.transactions);
  }
}
