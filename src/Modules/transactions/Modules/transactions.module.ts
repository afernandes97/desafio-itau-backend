import { Module } from '@nestjs/common';
import { TransactionController } from '../Controllers/transactions.controller';
import { TransactionService } from '../Services/transactions.service';
import { CreateTransactionUseCase } from '../Application/createTransaction/CreateTransaction.useCase';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, CreateTransactionUseCase],
})
export class TransactionModule {}
