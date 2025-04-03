import { Test, TestingModule } from '@nestjs/testing';
import { DeleteTransactionUseCase } from './DeleteTransaction.useCase';
import { TransactionService } from '../../Services/transactions.service';

describe('DeleteTransactionUseCase', () => {
  let deleteTransactionUseCase: DeleteTransactionUseCase;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteTransactionUseCase,
        {
          provide: TransactionService,
          useValue: {
            DeleteTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteTransactionUseCase = module.get<DeleteTransactionUseCase>(
      DeleteTransactionUseCase,
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should call TransactionService.DeleteTransaction and return successfully', async () => {
    jest
      .spyOn(transactionService, 'DeleteTransaction')
      .mockResolvedValueOnce(undefined);

    await expect(deleteTransactionUseCase.execute()).resolves.toBeUndefined();
  });

  it('should throw an error if TransactionService.DeleteTransaction fails', async () => {
    const error = new Error('Delete failed');
    jest
      .spyOn(transactionService, 'DeleteTransaction')
      .mockRejectedValueOnce(error);

    await expect(deleteTransactionUseCase.execute()).rejects.toThrow(error);
  });
});
