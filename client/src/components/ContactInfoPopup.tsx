import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  animation: ${fadeIn} 0.3s ease-out;
`;

const PopupContainer = styled.div`
  width: 90%;
  max-width: 450px;
  background: rgba(22, 27, 58, 0.95);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 204, 255, 0.3);
  padding: 1.5rem;
`;

const PopupTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #00CCFF;
  font-size: 1.5rem;
  font-family: var(--font-heading);
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  background: rgba(45, 55, 72, 0.7);
  border: 1px solid ${props => props.$hasError ? '#ef4444' : 'rgba(0, 204, 255, 0.3)'};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: ${props => props.$hasError ? '#ef4444' : 'rgba(0, 204, 255, 0.6)'};
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  background: #00CCFF;
  border: none;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background: #00a6cc;
  }
  
  &:disabled {
    background: #4a5568;
    cursor: not-allowed;
  }
`;

const Description = styled.p`
  color: #a0aec0;
  margin: 0 0 1.5rem 0;
  font-size: 0.875rem;
  text-align: center;
`;

interface ContactInfoPopupProps {
  agentName: string;
  onSubmit: (data: { name: string, whatsapp: string, email: string }) => void;
}

const ContactInfoPopup: React.FC<ContactInfoPopupProps> = ({ agentName, onSubmit }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  
  const [nameError, setNameError] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validação do nome
    if (!name.trim()) {
      setNameError('Por favor, informe seu nome.');
      isValid = false;
    } else {
      setNameError('');
    }
    
    // Validação do WhatsApp (mínimo 10 dígitos)
    const whatsappDigits = whatsapp.replace(/\D/g, '');
    if (!whatsapp.trim()) {
      setWhatsappError('Por favor, informe seu WhatsApp.');
      isValid = false;
    } else if (whatsappDigits.length < 10) {
      setWhatsappError('WhatsApp inválido. Informe pelo menos 10 dígitos.');
      isValid = false;
    } else {
      setWhatsappError('');
    }
    
    // Validação do email (deve conter @)
    if (!email.trim()) {
      setEmailError('Por favor, informe seu email.');
      isValid = false;
    } else if (!email.includes('@')) {
      setEmailError('Email inválido. Deve conter @.');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ name, whatsapp, email });
    }
  };
  
  // Prevenir rolagem da página enquanto o popup estiver aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupTitle>Quase lá!</PopupTitle>
        <Description>
          Para continuar sua interação com o {agentName}, precisamos de algumas informações para contato.
        </Description>
        
        <InputGroup>
          <Label htmlFor="name">Nome</Label>
          <Input 
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            $hasError={!!nameError}
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input 
            id="whatsapp"
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="(00) 00000-0000"
            $hasError={!!whatsappError}
          />
          {whatsappError && <ErrorMessage>{whatsappError}</ErrorMessage>}
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            $hasError={!!emailError}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </InputGroup>
        
        <SubmitButton onClick={handleSubmit}>
          Continuar
        </SubmitButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default ContactInfoPopup;