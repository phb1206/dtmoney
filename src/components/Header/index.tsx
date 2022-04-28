import React from 'react';
import { Container, Content } from './styles';

import logoImg from '../../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransModal: () => void
}

export function Header({ onOpenNewTransModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransModal}>
          New transaction
        </button>
      </Content>
    </Container>
  );
}
