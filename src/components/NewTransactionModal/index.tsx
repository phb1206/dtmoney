import React, {
  FormEvent, useCallback, useState,
} from 'react';
import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import expenseImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, TypeButton } from './style';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void
}

Modal.setAppElement('#root');

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');

  const handleSubmitNewTransaction = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    await createTransaction({
      title,
      value,
      category,
      type: transactionType,
    });

    setTitle('');
    setValue(0);
    setCategory('');
    setTransactionType('income');
    onRequestClose();
  }, [category, title, transactionType, value]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Close Modal" />
      </button>
      <Container onSubmit={handleSubmitNewTransaction}>
        <h2>Register transaction</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          placeholder="Value"
        />

        <TransactionTypeContainer>
          <TypeButton
            type="button"
            onClick={() => { setTransactionType('income'); }}
            isActive={transactionType === 'income'}
            activeColor="#33cc95"
          >
            <img src={incomeImg} alt="Income" />
            <span>Income</span>
          </TypeButton>
          <TypeButton
            type="button"
            onClick={() => { setTransactionType('expense'); }}
            isActive={transactionType === 'expense'}
            activeColor="#e52e4d"
          >
            <img src={expenseImg} alt="expense" />
            <span>Expense</span>
          </TypeButton>
        </TransactionTypeContainer>

        <input
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">
          Register
        </button>
      </Container>
    </Modal>
  );
}
