import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animação para os pontinhos de digitação
const bounce = keyframes`
  0%, 80%, 100% { 
    transform: translateY(0);
  }
  40% { 
    transform: translateY(-5px);
  }
`;

const TypingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  background: rgba(45, 55, 72, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

const TypingDot = styled.div`
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #00ccff;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  
  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const TypingText = styled.span`
  font-size: 0.75rem;
  color: #ffffff;
  margin-left: 0.5rem;
  opacity: 0.8;
`;

const TypingIndicator: React.FC = () => {
  return (
    <TypingContainer>
      <TypingDot />
      <TypingDot />
      <TypingDot />
      <TypingText>digitando...</TypingText>
    </TypingContainer>
  );
};

export default TypingIndicator;