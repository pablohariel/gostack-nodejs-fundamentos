import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    if (
      type === 'outcome' &&
      this.transactionsRepository.getBalance().total < value
    ) {
      throw new Error('Account do not have enough money');
    }

    return transaction;
  }
}

export default CreateTransactionService;
