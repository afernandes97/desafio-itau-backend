import { Test, TestingModule } from '@nestjs/testing';
import { AnalisysTransactiosUseCase } from './AnalisysTransactions.useCase';
import { TransactionService } from '../../Services/transactions.service';

describe('AnalisysTransactiosUseCase', () => {
  let analisysTransactiosUseCase: AnalisysTransactiosUseCase;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalisysTransactiosUseCase,
        {
          provide: TransactionService,
          useValue: {
            getAllTransactions: jest.fn(),
          },
        },
      ],
    }).compile();

    analisysTransactiosUseCase = module.get<AnalisysTransactiosUseCase>(
      AnalisysTransactiosUseCase,
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should return correct analysis for recent transactions', async () => {
    const mockTransactions = [
      { valor: 10, dataHora: new Date(Date.now() - 30 * 1000).toISOString() },
      { valor: 20, dataHora: new Date(Date.now() - 40 * 1000).toISOString() },
      { valor: 30, dataHora: new Date(Date.now() - 50 * 1000).toISOString() },
    ];

    jest
      .spyOn(transactionService, 'getAllTransactions')
      .mockResolvedValue(mockTransactions);

    const result = await analisysTransactiosUseCase.execute();

    expect(result).toEqual({
      count: 3,
      sum: 60,
      avg: 20,
      min: 10,
      max: 30,
    });
  });

  it('should return zeroed analysis if no recent transactions exist', async () => {
    const mockTransactions = [
      {
        valor: 10,
        dataHora: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
    ];

    jest
      .spyOn(transactionService, 'getAllTransactions')
      .mockResolvedValue(mockTransactions);

    const result = await analisysTransactiosUseCase.execute();

    expect(result).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });

  it('should handle errors thrown by TransactionService', async () => {
    jest
      .spyOn(transactionService, 'getAllTransactions')
      .mockRejectedValue(new Error('Service error'));

    await expect(analisysTransactiosUseCase.execute()).rejects.toThrow(
      'Service error',
    );
  });
});
