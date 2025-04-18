import React from 'react';
import styled from 'styled-components';

// Versão simplificada sem animações para melhor performance
const TypingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(45, 55, 72, 0.7);
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-body);
`;

// Ícone simples sem animação
const TypingText = styled.span`
  font-size: 0.75rem;
  color: #ffffff;
  opacity: 0.8;
  
  &:before {
    content: "•••";
    margin-right: 5px;
    color: #00ccff;
  }
`;

const TypingIndicator: React.FC = () => {
  return (
    <TypingContainer>
      <TypingText>digitando...</TypingText>
    </TypingContainer>
  );
};

export default TypingIndicator;