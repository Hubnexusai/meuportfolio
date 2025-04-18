import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Componentes estilizados
const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  max-width: 100%;
  width: 100%;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const PlayButton = styled.button`
  background: linear-gradient(to right, #000935, #00CCFF);
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 0;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
`;

const Progress = styled.div<{ $width: string }>`
  height: 100%;
  background: linear-gradient(to right, #000935, #00CCFF);
  border-radius: 3px;
  width: ${props => props.$width};
  transition: width 0.1s linear;
`;

const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  width: 100%;
`;

const DurationLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:before {
    content: '\\f2f9';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }
`;

interface AudioPlayerProps {
  src: string;
  duration?: string;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Parse a duração no formato "mm:ss" para segundos
const parseDuration = (duration: string): number => {
  const parts = duration.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    return minutes * 60 + seconds;
  }
  return 0;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, duration = '0:00' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [durationInSeconds, setDurationInSeconds] = useState(parseDuration(duration));
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Criar elemento de áudio
    const audio = new Audio(src);
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
    
    // Cleanup na desmontagem do componente
    return () => {
      audio.pause();
      audio.src = '';
      
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
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
  
  return (
    <PlayerContainer>
      <DurationLabel>Áudio: {formatTime(durationInSeconds)}</DurationLabel>
      
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
      
      <TimeDisplay>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(durationInSeconds)}</span>
      </TimeDisplay>
    </PlayerContainer>
  );
};

export default AudioPlayer;