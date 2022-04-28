import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number,
  title: string,
  value: number,
  type: 'income' | 'expense',
  category: string,
  createdAt: string
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[],
  createTransaction: (_: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date(),
    });

    const savedTransaction = response.data;
    setTransactions([
      ...transactions,
      savedTransaction,
    ]);
  }

  const value = useMemo(
    () => ({ transactions, createTransaction }),
    [transactions],
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
