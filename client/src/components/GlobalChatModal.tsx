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

// Componentes UI para o modal
const zoomInBounce = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
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
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 204, 255, 0.3);
  
  &.zoom-in-bounce {
    animation: ${zoomInBounce} 0.4s ease-out;
  }
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
  font-size: 1.125rem;
`;

const AgentStatus = styled.p`
  margin: 0;
  color: #a5b4fc;
  font-size: 0.875rem;
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
  
  &.zoom-in-bounce {
    animation: ${zoomInBounce} 0.4s ease-out;
  }
`;

const BubbleContainer = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: ${props => props.$isUser 
    ? 'linear-gradient(to right, #000935, #00CCFF)' 
    : 'rgba(45, 55, 72, 0.7)'};
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 0.5rem solid transparent;
    ${props => props.$isUser 
      ? 'border-left-color: #00CCFF; right: -0.75rem; top: 50%; transform: translateY(-50%);'
      : 'border-right-color: rgba(45, 55, 72, 0.7); left: -0.75rem; top: 50%; transform: translateY(-50%);'
    }
  }
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 0.5rem;
  align-self: flex-end;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.7);
  gap: 0.75rem;
  border-top: 1px solid rgba(0, 204, 255, 0.2);
`;

const ChatInput = styled.input`
  flex: 1;
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

const SendButton = styled.button<{ disabled?: boolean }>`
  background: linear-gradient(to right, #000935, #00CCFF);
  border: none;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(30, 41, 59, 0.7);
  }
`;

const RecordButton = styled.button<{ $isRecording: boolean }>`
  background: ${props => props.$isRecording 
    ? 'linear-gradient(to right, #ef4444, #f87171)' 
    : 'linear-gradient(to right, #000935, #00CCFF)'};
  border: none;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.$isRecording ? 'scale(1)' : 'scale(1.1)'};
  }
  
  & > i {
    transition: transform 0.2s ease;
  }
  
  &:hover > i {
    transform: ${props => props.$isRecording ? 'rotate(45deg)' : 'none'};
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

// Componente para renderizar o conteúdo da mensagem com base no tipo
interface MessageContentProps {
  message: Message;
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  // Para áudio, extrai a URL base64 e a duração
  if (message.type === 'audio' && message.text.includes('data:audio')) {
    const parts = message.text.split('|');
    const audioUrl = parts[0];
    const duration = parts[1]?.split(':')[1] || '00:00';
    
    return <AudioPlayer src={audioUrl} duration={duration} />;
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
  
  // Função para comprimir áudio para MP3 usando lamejs e convertê-lo para base64
  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Converte o blob para array buffer para processamento
      blob.arrayBuffer()
        .then(buffer => {
          // Converte o buffer para AudioContext para processamento
          const audioContext = new AudioContext();
          return audioContext.decodeAudioData(buffer);
        })
        .then(audioBuffer => {
          // Obtem os dados de áudio como Float32Array
          const samples = audioBuffer.getChannelData(0);
          
          // Parâmetros de compressão MP3
          const sampleRate = audioBuffer.sampleRate;
          const bitRate = 96; // Taxa de bits menor (kbps) para melhor compressão
          
          // Cria o encoder MP3
          const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, bitRate);
          
          // Processa o áudio em blocos para melhor memória
          const blockSize = 1152; // Tamanho recomendado para frames MP3
          const mp3Data = [];
          
          // Converte Float32Array para Int16Array que o lamejs pode processar
          const samples16 = new Int16Array(samples.length);
          for (let i = 0; i < samples.length; i++) {
            // Normaliza os valores de -1.0,1.0 para -32768,32767
            samples16[i] = samples[i] < 0 ? 
              Math.max(-1, samples[i]) * 0x8000 : 
              Math.min(1, samples[i]) * 0x7FFF;
          }
          
          // Processa o áudio em blocos
          for (let i = 0; i < samples16.length; i += blockSize) {
            const blockSamples = samples16.subarray(i, i + blockSize);
            const mp3Buffer = mp3Encoder.encodeBuffer(blockSamples);
            if (mp3Buffer.length > 0) {
              mp3Data.push(mp3Buffer);
            }
          }
          
          // Adiciona o frame de finalização
          const mp3Finish = mp3Encoder.flush();
          if (mp3Finish.length > 0) {
            mp3Data.push(mp3Finish);
          }
          
          // Combina todos os blocos MP3 em um único Uint8Array
          const mp3DataLength = mp3Data.reduce((total, buffer) => total + buffer.length, 0);
          const mp3Complete = new Uint8Array(mp3DataLength);
          let offset = 0;
          for (let buffer of mp3Data) {
            mp3Complete.set(buffer, offset);
            offset += buffer.length;
          }
          
          // Cria um novo Blob MP3
          const mp3Blob = new Blob([mp3Complete], { type: 'audio/mp3' });
          
          // Converte para base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            // Remove o prefixo 'data:audio/mp3;base64,' para obter apenas o base64
            const base64 = base64String.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(mp3Blob);
        })
        .catch(reject);
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
  
  // Reseta as mensagens quando o modal é aberto
  useEffect(() => {
    if (isOpen && agentName) {
      // Não adiciona mensagem inicial, apenas limpa as mensagens
      setMessages([]);
      messageIdCounter.current = 1;
      
      // Iniciar enviando uma mensagem automática para o webhook apenas para notificar abertura
      const webhookPayload = {
        agent: slugifyAgentName(agentName),
        message: "CHAT_OPENED",
        typeMessage: "system"
      };
      
      // Enviar requisição silenciosa para o webhook
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
        
        // Verifica se há uma mensagem inicial do webhook (nos formatos "messages" ou "message")
        const responseText = data && (data.messages || data.message);
        
        if (responseText) {
          const welcomeMessage: Message = {
            id: messageIdCounter.current++,
            text: responseText,
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            createdAt: Date.now(),
            type: 'text'
          };
          
          setMessages(prev => [...prev, welcomeMessage]);
        }
      })
      .catch(error => {
        console.error('Erro ao notificar abertura de chat:', error);
      });
    }
  }, [isOpen, agentName, webhookUrl]);
  
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
    
    // Adiciona mensagem do usuário (áudio) com a duração
    const newUserMessage: Message = {
      id: messageIdCounter.current++,
      text: `data:audio/mp3;base64,${audioBase64}|duration:${formattedTime}`,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now(),
      type: 'audio'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Ativa o indicador de digitação
    setIsTyping(true);
    
    // Prepara o payload para o webhook
    const webhookPayload = {
      agent: slugifyAgentName(agentName),
      message: audioBase64,
      typeMessage: "audio"
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
      
      // Processa a resposta nos formatos { "messages": "texto" } ou { "message": "texto" }
      const responseText = data && (data.messages || data.message);
      
      if (responseText) {
        // Adiciona a mensagem do agente vinda do webhook
        const newAgentMessage: Message = {
          id: messageIdCounter.current++,
          text: responseText,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, newAgentMessage]);
        setIsTyping(false);
      } else {
        // Se não houver mensagem ou formato não esperado
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
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
    
    // Ativa o indicador de digitação
    setIsTyping(true);
    
    // Prepara o formato do payload para o webhook
    const webhookPayload = {
      agent: slugifyAgentName(agentName),
      message: inputValue,
      typeMessage: "text"
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
      
      // Processa a resposta nos formatos { "messages": "texto" } ou { "message": "texto" }
      const responseText = data && (data.messages || data.message);
      
      if (responseText) {
        // Adiciona a mensagem do agente vinda do webhook
        const newAgentMessage: Message = {
          id: messageIdCounter.current++,
          text: responseText,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          createdAt: Date.now(),
          type: 'text'
        };
        
        setMessages(prev => [...prev, newAgentMessage]);
        setIsTyping(false);
      } else {
        // Se não houver mensagem ou formato não esperado
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
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
          
          {/* Botão de gravação/descarte */}
          <RecordButton 
            onClick={isRecording ? discardRecording : startRecording}
            $isRecording={isRecording}
            title={isRecording ? "Descartar gravação" : "Gravar áudio"}
          >
            <i className={isRecording ? "fas fa-trash" : "fas fa-microphone"}></i>
          </RecordButton>
          
          {/* Botão de envio - agora também interrompe e envia o áudio se estiver gravando */}
          <SendButton 
            onClick={isRecording ? stopRecording : handleSendMessage}
            disabled={!isRecording && inputValue.trim() === ''}
            title={isRecording ? "Enviar áudio" : "Enviar mensagem"}
          >
            <i className="fas fa-paper-plane"></i>
          </SendButton>
        </InputArea>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GlobalChatModal;