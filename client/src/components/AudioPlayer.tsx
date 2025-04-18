import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Componentes estilizados otimizados - removendo efeitos visuais pesados
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  max-width: 100%;
  width: 100%;
  font-family: var(--font-body);
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const PlayButton = styled.button`
  background: #00CCFF;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0;
  /* Removido efeito de transição e sombra para otimização */
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
`;

const Progress = styled.div<{ $width: string }>`
  height: 100%;
  background: #00CCFF;
  border-radius: 2px;
  width: ${props => props.$width};
  /* Removido efeito de transição para otimização */
`;

const DurationLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  padding: 0 4px;
  margin-bottom: 2px;
  
  &:before {
    content: '\\f017'; /* Ícone de relógio */
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    margin-right: 4px;
  }
`;

interface AudioPlayerProps {
  src: string;
  duration?: string;
}

// Função de formatação de tempo com segundos zerados à esquerda
const formatTime = (timeInSeconds: number): string => {
  // Garantir que o valor seja um número não-negativo
  const validTime = isNaN(timeInSeconds) || timeInSeconds < 0 ? 0 : timeInSeconds;
  
  const minutes = Math.floor(validTime / 60);
  const seconds = Math.floor(validTime % 60);
  
  // Garantir formato correto com zeros à esquerda
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Parse a duração no formato "mm:ss" para segundos
const parseDuration = (duration: string): number => {
  // Verificar se a duração é válida
  if (!duration || 
      duration === 'undefined:undefined' || 
      duration === 'NaN:NaN' || 
      duration === 'Infinity:NaN' || 
      !duration.includes(':')) {
    console.log('Duração inválida detectada:', duration);
    return 0;
  }
  
  try {
    // Certifique-se de que estamos trabalhando com o formato correto
    let cleanDuration = duration.trim();
    
    // Remover qualquer prefixo "duration:" se estiver presente
    if (cleanDuration.startsWith('duration:')) {
      cleanDuration = cleanDuration.substring(9).trim();
    }
    
    const parts = cleanDuration.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      
      // Verificar se os valores são números válidos
      if (isNaN(minutes) || isNaN(seconds)) {
        console.log('Valores inválidos na duração:', minutes, seconds);
        return 0;
      }
      
      const totalSeconds = minutes * 60 + seconds;
      console.log('Duração parseada com sucesso:', cleanDuration, '→', totalSeconds, 'segundos');
      return totalSeconds;
    }
  } catch (error) {
    console.error('Erro ao analisar duração:', duration, error);
  }
  
  return 0;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, duration = '0:00' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  // Forçar duração para um valor padrão se for inválido
  const fixedDuration = duration === 'Infinity:NaN' || 
                         duration === 'undefined:undefined' || 
                         duration === 'NaN:NaN' ? 
                         '0:00' : duration;
  
  const [durationInSeconds, setDurationInSeconds] = useState(parseDuration(fixedDuration));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  // useEffect otimizado
  useEffect(() => {
    // Usar elemento de áudio apenas uma vez
    if (!audioRef.current) {
      const audio = new Audio();
      audioRef.current = audio;
      
      // Event listeners
      audio.addEventListener('loadedmetadata', () => {
        setDurationInSeconds(audio.duration || parseDuration(duration));
      });
      
      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime);
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
    
    // Atualizar apenas a source
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.load();
    }
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [src, duration]);
  
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
      });
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    
    const percentage = offsetX / width;
    const newTime = percentage * durationInSeconds;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Calcula a porcentagem de progresso
  const progressPercentage = durationInSeconds > 0 
    ? `${(currentTime / durationInSeconds) * 100}%` 
    : '0%';
  
  // Garantir que não exibimos "Infinity:NaN" ou valores inválidos
  const displayDuration = !isNaN(durationInSeconds) && isFinite(durationInSeconds) 
    ? formatTime(durationInSeconds) 
    : "0:00";
    
  return (
    <PlayerContainer>
      {/* Removida a exibição da duração para evitar problemas visuais */}
      
      <ControlsContainer>
        <PlayButton onClick={togglePlayPause}>
          <i className={isPlaying ? 'fas fa-pause' : 'fas fa-play'}></i>
        </PlayButton>
        
        <ProgressBarContainer 
          ref={progressBarRef}
          onClick={handleProgressBarClick}
        >
          <Progress $width={progressPercentage} />
        </ProgressBarContainer>
      </ControlsContainer>
    </PlayerContainer>
  );
};

export default AudioPlayer;