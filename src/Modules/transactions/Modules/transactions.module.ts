import { Module } from '@nestjs/common';
import { TransactionController } from '../Controllers/transactions.controller';
import { TransactionService } from '../Services/transactions.service';
import { CreateTransactionUseCase } from '../Application/createTransaction/CreateTransaction.useCase';
import { DeleteTransactionUseCase } from '../Application/deleteTransaction/DeleteTransaction.useCase';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
  ],
})
export class TransactionModule {}
