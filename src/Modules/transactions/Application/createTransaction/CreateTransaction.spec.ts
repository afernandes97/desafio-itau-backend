import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateTransactionUseCase } from './CreateTransaction.useCase';
import { TransactionService } from '../../Services/transactions.service';
import { CreateTransctionDto } from './CreateTransaction.dto';

describe('CreateTransactionUseCase', () => {
  let createTransactionUseCase: CreateTransactionUseCase;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        {
          provide: TransactionService,
          useValue: {
            CreateTransaction: jest.fn(function (this: void) {}),
          },
        },
      ],
    }).compile();

    createTransactionUseCase = module.get<CreateTransactionUseCase>(
      CreateTransactionUseCase,
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should throw ConflictException if dataHora is in the future', async () => {
    const input: CreateTransctionDto = {
      valor: 1,
      dataHora: new Date(Date.now() + 10000).toISOString(),
    };

    await expect(createTransactionUseCase.execute(input)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should rethrow any error from TransactionService.CreateTransaction', async () => {
    const input: CreateTransctionDto = {
      valor: 1,
      dataHora: new Date(Date.now() - 10000).toISOString(),
    };

    jest
      .spyOn(transactionService, 'CreateTransaction')
      .mockRejectedValue(new Error('Service error'));

    await expect(createTransactionUseCase.execute(input)).rejects.toThrow(
      'Service error',
    );
  });
});
