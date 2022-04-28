import React from 'react';
import { Container } from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
      acc.income += transaction.value;
      acc.total += transaction.value;
    } else {
      acc.expense += transaction.value;
      acc.total -= transaction.value;
    }

    return acc;
  }, {
    income: 0,
    expense: 0,
    total: 0,
  });

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="income" />
        </header>
        <strong>
          {new Intl.NumberFormat('en-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.income)}
        </strong>
      </div>
      <div>
        <header>
          <p>Outcome</p>
          <img src={outcomeImg} alt="outcome" />
        </header>
        <strong>
          {new Intl.NumberFormat('en-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.expense)}
        </strong>
      </div>
      <div className="total">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('en-NL', {
            style: 'currency',
            currency: 'EUR',
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
