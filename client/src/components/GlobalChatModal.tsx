import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import lamejs from 'lamejs';
import TypingIndicatorComponent from './TypingIndicator';
import AudioPlayer from './AudioPlayer';
import { useWebhookUrl } from '../hooks/use-env-config';

// Singleton para gerenciar o estado global do modal
export class ChatModalManager {
  private static instance: ChatModalManager;
  private isOpen: boolean = false;
  private agentName: string = '';
  private agentIcon: string = '';
  private listeners: Function[] = [];

  private constructor() {}

  static getInstance(): ChatModalManager {
    if (!ChatModalManager.instance) {
      ChatModalManager.instance = new ChatModalManager();
    }
    return ChatModalManager.instance;
  }

  openModal(agentName: string, agentIcon: string): void {
    this.isOpen = true;
    this.agentName = agentName;
    this.agentIcon = agentIcon;
    this.notifyListeners();
  }

  closeModal(): void {
    this.isOpen = false;
    this.notifyListeners();
  }

  getState(): { isOpen: boolean; agentName: string; agentIcon: string } {
    return {
      isOpen: this.isOpen,
      agentName: this.agentName,
      agentIcon: this.agentIcon
    };
  }

  subscribe(listener: Function): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }
}

// Hook para usar o gerenciador de modal
export function useChatModal() {
  const [state, setState] = useState<{
    isOpen: boolean;
    agentName: string;
    agentIcon: string;
  }>({
    isOpen: false,
    agentName: '',
    agentIcon: ''
  });

  useEffect(() => {
    const modalManager = ChatModalManager.getInstance();
    setState(modalManager.getState());
    
    const unsubscribe = modalManager.subscribe((newState: any) => {
      setState(newState);
    });
    
    return unsubscribe;
  }, []);

  const openModal = (agentName: string, agentIcon: string) => {
    ChatModalManager.getInstance().openModal(agentName, agentIcon);
  };

  const closeModal = () => {
    ChatModalManager.getInstance().closeModal();
  };

  return {
    ...state,
    openModal,
    closeModal
  };
}

// Animações simplificadas para melhorar performance
const zoomInBounce = keyframes`
  0%, 100% {
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0%, 100% {
    opacity: 1;
  }
`;

// Estilos CSS
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  &.fade-in {
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  background: rgba(22, 27, 58, 0.95);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* Removido box-shadow para melhorar performance */
  border: 1px solid rgba(0, 204, 255, 0.3);
  
  /* Animação removida para melhorar performance */
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(to right, #000935, #0f172a);
  border-bottom: 1px solid rgba(0, 204, 255, 0.3);
`;

const AgentAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #000935, #00CCFF);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 1rem;
  font-size: 1.25rem;
`;

const AgentInfo = styled.div`
  flex: 1;
`;

const AgentName = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.25rem;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
`;

const AgentStatus = styled.p`
  margin: 0;
  color: #a5b4fc;
  font-size: 0.875rem;
  font-family: var(--font-body);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  padding: 8px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 10;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 300px;
  max-height: 50vh;
  background-image: 
    linear-gradient(rgba(22, 27, 58, 0.95), rgba(22, 27, 58, 0.95)),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L70 30 L50 10 L30 30 Z' fill='%2300CCFF' fill-opacity='0.05'/%3E%3C/svg%3E");
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  width: 85%;
  max-width: 85%;
  margin-bottom: 1.5rem;
  position: relative;
  font-family: var(--font-body);
  
  &.zoom-in-bounce {
    animation: ${zoomInBounce} 0.4s ease-out;
  }
`;

const BubbleContainer = styled.div<{ $isUser: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: ${props => props.$isUser 
    ? '#00CCFF' 
    : 'rgba(45, 55, 72, 0.7)'};
  color: white;
  /* Removido o box-shadow para melhorar performance */
  position: relative;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.5;
  
  /* Removido pseudo-elemento de seta para melhorar performance */
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  right: 0;
  bottom: -1.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.1rem 0.4rem;
  border-radius: 0.3rem;
  font-family: var(--font-body);
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.7);
  gap: 0.75rem;
  border-top: 1px solid rgba(0, 204, 255, 0.2);
`;

const ChatInput = styled.input`
  width: 100%;
  background: rgba(45, 55, 72, 0.7);
  border: 1px solid rgba(0, 204, 255, 0.3);
  border-radius: 1.5rem;
  padding: 0.75rem 1.25rem;
  color: white;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-color: rgba(0, 204, 255, 0.6);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:disabled {
    background: rgba(30, 41, 59, 0.5);
    cursor: not-allowed;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const SendButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled 
    ? 'rgba(30, 41, 59, 0.7)' 
    : 'linear-gradient(to right, #000935, #00CCFF)'};
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-family: var(--font-body);
  width: 48%;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RecordButton = styled.button<{ $isRecording: boolean; disabled?: boolean }>`
  background: ${props => {
    if (props.disabled) return 'rgba(30, 41, 59, 0.7)';
    return props.$isRecording 
      ? 'linear-gradient(to right, #ef4444, #f87171)' 
      : 'linear-gradient(to right, #000935, #00CCFF)';
  }};
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-family: var(--font-body);
  width: 48%;
  opacity: ${props => props.disabled ? 0.5 : 1};
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
`;

const RecordingTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.75rem;
  background: rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  color: #ef4444;
  position: absolute;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.875rem;
  font-weight: bold;
  
  &:before {
    content: '●';
    margin-right: 0.25rem;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;

// Interface para as mensagens
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
  createdAt: number;
  type?: 'audio' | 'image' | 'document' | 'video' | 'text';
}

// Função auxiliar para processar respostas do webhook em vários formatos
function processWebhookResponse(data: any, messageIdCounter: React.MutableRefObject<number>): Message[] {
  const messages: Message[] = [];
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  console.log("Processando resposta webhook:", JSON.stringify(data));
  
  // Resposta vazia ou sem conteúdo (ignorar)
  if (!data || data.code === 0 || (data.message === "No item to return got found")) {
    console.log("Resposta webhook vazia ou sem conteúdo, ignorando");
    return messages;
  }
  
  // Padrão 1: Resposta simples sem mensagem (ignorar)
  if (data && typeof data === 'object' && Object.keys(data).length === 0) {
    return messages;
  }
  
  try {
    // Caso 1: Resposta tem um campo 'output' (formato novo)
    if (data && data.output && Array.isArray(data.output)) {
      // Processa apenas o primeiro item relevante do output
      for (const item of data.output) {
        if (item.message && item.message !== "Workflow was started") {
          const messageType = item.typeMessage?.toLowerCase() || 'text';
          messages.push({
            id: messageIdCounter.current++,
            text: item.message,
            isUser: false,
            time: currentTime,
            createdAt: Date.now(),
            type: messageType as 'text' | 'audio' | 'image' | 'document' | 'video' | undefined
          });
          break; // Só processa o primeiro item válido
        }
      }
    }
    // Caso 2: Resposta é um array 
    else if (Array.isArray(data)) {
      // Processa apenas o primeiro item relevante do array
      for (const outerItem of data) {
        let messageAdded = false;
        
        // Verifica o formato com output aninhado
        if (outerItem.output && Array.isArray(outerItem.output)) {
          for (const item of outerItem.output) {
            if (item.message && item.message !== "Workflow was started") {
              const messageType = item.typeMessage?.toLowerCase() || 'text';
              messages.push({
                id: messageIdCounter.current++,
                text: item.message,
                isUser: false,
                time: currentTime,
                createdAt: Date.now(),
                type: messageType as 'text' | 'audio' | 'image' | 'document' | 'video' | undefined
              });
              messageAdded = true;
              break; // Só processa o primeiro item válido
            }
          }
        } 
        // Formato alternativo: array de mensagens diretas [{ message, typeMessage }]
        else if (outerItem.message && outerItem.message !== "Workflow was started") {
          const messageType = outerItem.typeMessage?.toLowerCase() || 'text';
          messages.push({
            id: messageIdCounter.current++,
            text: outerItem.message,
            isUser: false,
            time: currentTime,
            createdAt: Date.now(),
            type: messageType as 'text' | 'audio' | 'image' | 'document' | 'video' | undefined
          });
          messageAdded = true;
        }
        
        if (messageAdded) break; // Se alguma mensagem foi adicionada, não processa mais itens
      }
    } 
    // Caso 3: Resposta é um objeto com message ou messages
    else if (data) {
      const responseText = data.messages || data.message;
      if (responseText && responseText !== "Workflow was started") {
        messages.push({
          id: messageIdCounter.current++,
          text: responseText,
          isUser: false,
          time: currentTime,
          createdAt: Date.now(),
          type: 'text'
        });
      }
    }
  } catch (error) {
    console.error("Erro ao processar resposta do webhook:", error);
  }
  
  return messages;
}

// Componente para renderizar o conteúdo da mensagem com base no tipo
interface MessageContentProps {
  message: Message;
}

const AudioContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-top: 0.3rem;
`;

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  // Para áudio, extrai a URL base64 e a duração
  if (message.type === 'audio' && message.text.includes('data:audio')) {
    const parts = message.text.split('|');
    const audioUrl = parts[0];
    const duration = parts[1]?.split(':')[1] || '00:00';
    
    return (
      <AudioContainer>
        <AudioPlayer src={audioUrl} duration={duration} />
      </AudioContainer>
    );
  }

  // Para imagens
  if (message.type === 'image' && message.text.startsWith('data:image')) {
    return <img src={message.text} alt="Imagem compartilhada" style={{ maxWidth: '100%', borderRadius: '0.5rem' }} />;
  }
  
  // Texto simples (padrão)
  return <>{message.text}</>;
};

// Hook para gerenciar a gravação de áudio
function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isDiscarded, setIsDiscarded] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Formata o tempo para exibição
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [recordingTime]);
  
  // Função para iniciar a gravação
  const startRecording = async () => {
    try {
      // Reseta o estado
      audioChunksRef.current = [];
      setIsDiscarded(false);
      setRecordingTime(0);
      setAudioBase64(null);
      
      // Solicita permissão de áudio
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Cria o recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Configura handler para eventos de dados
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Configura handler para quando a gravação finalizar
      mediaRecorder.onstop = () => {
        if (!isDiscarded) {
          // Se não foi descartado, processa o áudio gravado
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Converter o blob para base64 para enviar via webhook
          convertBlobToBase64(audioBlob)
            .then(base64 => {
              setAudioBase64(base64);
            })
            .catch(error => {
              console.error('Erro ao converter áudio para base64:', error);
            });
        }
        
        // Desliga os tracks do stream
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Inicia a gravação
      mediaRecorder.start();
      setIsRecording(true);
      
      // Configura o timer para atualizar o tempo de gravação
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Erro ao iniciar a gravação:', error);
      alert('Não foi possível acessar o microfone. Verifique as permissões do navegador.');
    }
  };
  
  // Função para interromper a gravação
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Limpa o timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  // Função simplificada para converter áudio para base64 diretamente, sem processamento
  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Usando FileReader diretamente no blob original
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64String = reader.result as string;
          // Remove o prefixo 'data:audio/webm;base64,' para obter apenas o base64
          const base64 = base64String.split(',')[1];
          console.log('Áudio convertido para base64 com sucesso');
          resolve(base64);
        } catch (error) {
          console.error('Erro ao processar resultado do FileReader:', error);
          reject(error);
        }
      };
      reader.onerror = (error) => {
        console.error('Erro no FileReader:', error);
        reject(error);
      };
      
      // Lê o blob diretamente como URL de dados
      try {
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Erro ao ler blob como DataURL:', error);
        reject(error);
      }
    });
  };
  
  // Função para descartar a gravação
  const discardRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      setIsDiscarded(true);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Limpa o timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  return {
    isRecording,
    recordingTime,
    formattedTime,
    audioBase64,
    isDiscarded,
    setIsDiscarded,
    startRecording,
    stopRecording,
    discardRecording
  };
}

const GlobalChatModal: React.FC = () => {
  const webhookUrl = useWebhookUrl();
  const { isOpen, agentName, agentIcon, closeModal } = useChatModal();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Estados para informações do usuário
  const [userName, setUserName] = useState<string>('');
  const [userWhatsapp, setUserWhatsapp] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  
  // Estado para controlar o fluxo de coleta de informações
  const [infoCollectionStep, setInfoCollectionStep] = useState<'none' | 'name' | 'whatsapp' | 'email' | 'complete'>('none');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(2);
  
  // Hook customizado para gravação de áudio
  const {
    isRecording,
    formattedTime,
    audioBase64,
    setIsDiscarded,
    startRecording,
    stopRecording,
    discardRecording
  } = useAudioRecorder();
  
  // Estado para controlar se já exibimos mensagem inicial
  const [welcomeMessageShown, setWelcomeMessageShown] = useState(false);
  
  // Função para gerar um ID de sessão único
  const generateSessionId = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timestampPart = Date.now().toString(36);
    return `${randomPart}-${timestampPart}`;
  };
  
  // Armazena o ID de sessão para todas as requisições
  const [sessionId] = useState(() => generateSessionId());
  
  // Reseta as mensagens quando o modal é aberto
  useEffect(() => {
    if (isOpen && agentName) {
      // Limpa as mensagens anteriores
      setMessages([]);
      messageIdCounter.current = 1;
      setWelcomeMessageShown(false);
      
      // Reseta as informações do usuário e volta para o primeiro passo de coleta
      setUserName('');
      setUserWhatsapp('');
      setUserEmail('');
      setInfoCollectionStep('name');
      
      // Adiciona uma mensagem de boas-vindas e solicita o nome
      const welcomeMessage: Message = {
        id: messageIdCounter.current++,
        text: `Olá, você está no ${agentName}. Por favor, me informe seu nome:`,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      
      setMessages([welcomeMessage]);
      setWelcomeMessageShown(true);
      
      // Iniciar enviando uma mensagem automática para o webhook apenas para notificar abertura
      const webhookPayload = {
        agent: slugifyAgentName(agentName),
        message: "CHAT_OPENED",
        typeMessage: "system",
        sessionId: sessionId
      };
      
      // Enviar requisição silenciosa para o webhook (não exibimos a resposta na primeira abertura)
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Abertura de chat - resposta:', data);
        // Não fazemos nada com a resposta de abertura
      })
      .catch(error => {
        console.error('Erro ao notificar abertura de chat:', error);
      });
    }
  }, [isOpen, agentName, webhookUrl, sessionId]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Função para converter nomes para um formato URL amigável
  const slugifyAgentName = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove múltiplos hífens
      .replace(/^-+|-+$/g, ''); // Remove hífens no início e fim
  };
  
  // Função para enviar áudio
  const handleSendAudio = () => {
    if (!audioBase64) return;
    
    // Não permitir envio de áudio até que todas as informações sejam coletadas
    if (infoCollectionStep !== 'complete') {
      // Adicione uma mensagem informando que a coleta de dados precisa ser concluída
      const errorMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Por favor, primeiro forneça as informações solicitadas antes de enviar áudio.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }
    
    // Adiciona mensagem do usuário (áudio) com a duração
    const newUserMessage: Message = {
      id: messageIdCounter.current++,
      text: `data:audio/webm;base64,${audioBase64}|duration:${formattedTime}`,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
      type: 'audio'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Ativa o indicador de digitação
    setIsTyping(true);
    
    // Prepara o payload para o webhook com as informações do usuário
    const webhookPayload = {
      agent: slugifyAgentName(agentName),
      message: audioBase64,
      typeMessage: "audio",
      sessionId: sessionId,
      nome: userName,
      whatsapp: userWhatsapp,
      email: userEmail
    };
    
    // Envia requisição HTTP POST para o webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Webhook response data (áudio):', data);
      
      // Desativa o indicador de digitação
      setIsTyping(false);
      
      // Processa a resposta utilizando a função auxiliar
      const newMessages = processWebhookResponse(data, messageIdCounter);
      
      // Adiciona as novas mensagens ao estado
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
    })
    .catch(error => {
      console.error('Erro ao enviar áudio para o webhook:', error);
      // Mensagem de erro caso a requisição falhe
      const errorMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Desculpe, estamos com dificuldades técnicas. Por favor, tente novamente mais tarde.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
      // Desativa o indicador de digitação em caso de erro
      setIsTyping(false);
    });
  };
  
  // Efeito para processar o áudio após a gravação terminar
  useEffect(() => {
    // Se há um áudio base64 disponível, envia para o webhook
    if (audioBase64) {
      handleSendAudio();
    }
  }, [audioBase64]);
  
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Adiciona mensagem do usuário
    const newUserMessage: Message = {
      id: messageIdCounter.current++,
      text: inputValue,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Processa a coleta de informações do usuário
    if (infoCollectionStep === 'name') {
      // Armazena o nome
      setUserName(inputValue.trim());
      
      // Passa para o próximo passo (WhatsApp)
      setInfoCollectionStep('whatsapp');
      
      // Adiciona uma mensagem solicitando o WhatsApp
      const whatsappRequestMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Obrigado! Agora, por favor, me informe seu WhatsApp (com DDD):',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, whatsappRequestMessage]);
      }, 500);
      
      setInputValue('');
      return;
    }
    
    if (infoCollectionStep === 'whatsapp') {
      // Armazena o WhatsApp
      setUserWhatsapp(inputValue.trim());
      
      // Passa para o próximo passo (email)
      setInfoCollectionStep('email');
      
      // Adiciona uma mensagem solicitando o email
      const emailRequestMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Perfeito! Por último, me informe seu e-mail:',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, emailRequestMessage]);
      }, 500);
      
      setInputValue('');
      return;
    }
    
    if (infoCollectionStep === 'email') {
      // Armazena o email
      setUserEmail(inputValue.trim());
      
      // Marca a coleta de informações como concluída
      setInfoCollectionStep('complete');
      
      // Adiciona uma mensagem de informações coletadas
      const collectionCompleteMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Obrigado por fornecer suas informações! Agora podemos prosseguir com a conversa.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, collectionCompleteMessage]);
      }, 500);
      
      setInputValue('');
      return;
    }
    
    // A partir daqui, só executa se já tivermos coletado todas as informações
    if (infoCollectionStep !== 'complete') {
      setInputValue('');
      return;
    }
    
    // Ativa o indicador de digitação
    setIsTyping(true);
    
    // Prepara o formato do payload para o webhook com as informações do usuário
    const webhookPayload = {
      agent: slugifyAgentName(agentName),
      message: inputValue,
      typeMessage: "text",
      sessionId: sessionId,
      nome: userName,
      whatsapp: userWhatsapp,
      email: userEmail
    };
    
    // Envia requisição HTTP POST para o webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Webhook response data (texto):', data);
      
      // Desativa o indicador de digitação
      setIsTyping(false);
      
      // Processa a resposta utilizando a função auxiliar
      const newMessages = processWebhookResponse(data, messageIdCounter);
      
      // Adiciona as novas mensagens ao estado
      if (newMessages.length > 0) {
        setMessages(prev => [...prev, ...newMessages]);
      }
    })
    .catch(error => {
      console.error('Erro ao enviar para o webhook:', error);
      // Mensagem de erro caso a requisição falhe
      const errorMessage: Message = {
        id: messageIdCounter.current++,
        text: 'Desculpe, estamos com dificuldades técnicas. Por favor, tente novamente mais tarde.',
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdAt: Date.now(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
      // Desativa o indicador de digitação em caso de erro
      setIsTyping(false);
    });
    
    setInputValue('');
  };
  
  // Handlers para fechar o modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("Fechando modal via clique outside");
      closeModal();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      console.log("Fechando modal via ESC");
      closeModal();
    }
  };
  
  const handleCloseButtonClick = (e: React.MouseEvent) => {
    console.log("Fechando modal via botão X");
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  };
  
  return (
    <ModalOverlay 
      $isOpen={isOpen} 
      onClick={handleOverlayClick} 
      onKeyDown={handleKeyDown} 
      className="fade-in"
    >
      <ModalContainer className="zoom-in-bounce" onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <AgentAvatar>
            <i className={agentIcon}></i>
          </AgentAvatar>
          <AgentInfo>
            <AgentName>{agentName}</AgentName>
            <AgentStatus>Online agora</AgentStatus>
          </AgentInfo>
          <CloseButton onClick={handleCloseButtonClick}>×</CloseButton>
        </ModalHeader>
        
        <ChatArea>
          {messages.map(message => (
            <MessageWrapper 
              key={`${message.id}-${message.createdAt}`}
              $isUser={message.isUser}
              className="zoom-in-bounce"
            >
              <BubbleContainer $isUser={message.isUser}>
                <MessageContent message={message} />
                <MessageTime>{message.time}</MessageTime>
              </BubbleContainer>
            </MessageWrapper>
          ))}
          
          {/* Indicador de digitação */}
          {isTyping && <TypingIndicatorComponent />}
          
          <div ref={messagesEndRef} />
        </ChatArea>
        
        <InputArea>
          {isRecording && (
            <RecordingTime>
              {formattedTime}
            </RecordingTime>
          )}
          
          <ChatInput
            type="text"
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isRecording}
          />
          
          <ButtonsContainer>
            {/* Botão de gravação/descarte */}
            <RecordButton 
              onClick={isRecording ? discardRecording : startRecording}
              $isRecording={isRecording}
              disabled={!isRecording && infoCollectionStep !== 'complete'}
              title={isRecording 
                ? "Descartar gravação" 
                : infoCollectionStep !== 'complete' 
                  ? "Complete seus dados para gravar áudio" 
                  : "Gravar áudio"
              }
            >
              {isRecording ? "Cancelar" : "Gravar áudio"}
              {!isRecording && infoCollectionStep !== 'complete' && 
                <span style={{ fontSize: '0.65rem', display: 'block', marginTop: '0.2rem', opacity: 0.8 }}>
                  (Complete seus dados)
                </span>
              }
            </RecordButton>
            
            {/* Botão de envio - agora também interrompe e envia o áudio se estiver gravando */}
            <SendButton 
              onClick={isRecording ? stopRecording : handleSendMessage}
              disabled={!isRecording && inputValue.trim() === ''}
              title={isRecording ? "Enviar áudio" : "Enviar mensagem"}
            >
              {isRecording ? "Enviar áudio" : "Enviar mensagem"}
            </SendButton>
          </ButtonsContainer>
        </InputArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GlobalChatModal;
