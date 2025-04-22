import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

// Número do WhatsApp (mesmo usado no CTA)
const WHATSAPP_NUMBER = "+5581989224862";

// Animação de tremor suave
const shake = keyframes`
  0% { transform: translateX(0) rotate(0); }
  25% { transform: translateX(-2px) rotate(-2deg); }
  50% { transform: translateX(0) rotate(0); }
  75% { transform: translateX(2px) rotate(2deg); }
  100% { transform: translateX(0) rotate(0); }
`;

// Animação de pulso
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

// Container do ícone flutuante
const FloatingContainer = styled.a`
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 100;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25D366; /* Cor oficial do WhatsApp */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
  animation: ${shake} 3s infinite ease-in-out, ${pulse} 2s infinite;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
    animation-play-state: paused;
  }
  
  /* Estilo para dispositivos móveis */
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    left: 20px;
  }
  
  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #25D366;
    animation: ${pulse} 2s 1s infinite;
  }
`;

// Tooltip que aparece ao passar o mouse
const Tooltip = styled.span`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000935;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #000935 transparent transparent transparent;
  }
`;

// Wrapper para o tooltip
const TooltipWrapper = styled.div`
  position: relative;
  
  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

// Estilo do ícone
const IconStyle = {
  color: 'white',
  fontSize: '30px'
};

const FloatingWhatsApp: React.FC = () => {
  return (
    <TooltipWrapper>
      <Tooltip>Fale conosco pelo WhatsApp</Tooltip>
      <FloatingContainer 
        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato pelo WhatsApp"
      >
        <FaWhatsapp style={IconStyle} />
      </FloatingContainer>
    </TooltipWrapper>
  );
};

export default FloatingWhatsApp;