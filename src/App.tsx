import React, { useCallback, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';

export function App() {
  const [isNewTransModalOpen, setIsNewTransModalOpen] = useState(false);

  const handleOpenNewTransModal = useCallback(() => {
    setIsNewTransModalOpen(true);
  }, []);

  const handleCloseNewTransModal = useCallback(() => {
    setIsNewTransModalOpen(false);
  }, []);

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransModal={handleOpenNewTransModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransModalOpen}
        onRequestClose={handleCloseNewTransModal}
      />
    </TransactionsProvider>
  );
}
