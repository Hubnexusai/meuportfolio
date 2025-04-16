import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Cores da marca
const COLORS = {
  primary: '#00CCFF',
  secondary: '#FFFFFF',
  dark: '#000935',
  background: '#0f172a'
};

// Container para o background
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: ${COLORS.background};
  overflow: hidden;
`;

// Estrela
const Star = styled.div<{ size: number; x: number; y: number; color: string; animationDuration: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  opacity: 0.7;
  box-shadow: 0 0 ${props => props.size * 2}px ${props => props.size}px ${props => props.color};
  animation: twinkle ${props => props.animationDuration}s infinite alternate;

  @keyframes twinkle {
    0% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

// Linha conectora
const Line = styled.div<{ x1: number; y1: number; x2: number; y2: number; thickness: number }>`
  position: absolute;
  left: ${props => props.x1}%;
  top: ${props => props.y1}%;
  width: ${props => Math.sqrt(Math.pow((props.x2 - props.x1), 2) + Math.pow((props.y2 - props.y1), 2))}%;
  height: ${props => props.thickness}px;
  background-color: ${COLORS.primary};
  opacity: 0.3;
  transform-origin: 0 0;
  transform: rotate(${props => 
    Math.atan2(props.y2 - props.y1, props.x2 - props.x1) * (180 / Math.PI)}deg);
`;

// Interface para as estrelas
interface StarProps {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: number;
}

const StarryBackground: React.FC = () => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Gerar estrelas
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      const resizeHandler = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      
      window.addEventListener('resize', resizeHandler);
      
      // Gerar 80 estrelas aleatórias
      const newStars: StarProps[] = [];
      const colors = [COLORS.primary, COLORS.secondary, COLORS.dark];
      
      for (let i = 0; i < 80; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: Math.random() * 5 + 1
        });
      }
      
      setStars(newStars);
      
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, []);
  
  // Acompanhar a posição do mouse
  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / windowSize.width) * 100,
        y: (e.clientY / windowSize.height) * 100
      });
    };
    
    window.addEventListener('mousemove', mouseMoveHandler);
    
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [windowSize]);
  
  // Determinar quais estrelas estão próximas o suficiente do mouse para conectar
  const getConnectingLines = () => {
    const lines = [];
    const mouseConnectionDistance = 20; // Porcentagem da tela
    
    for (const star of stars) {
      const distance = Math.sqrt(
        Math.pow(mousePos.x - star.x, 2) + Math.pow(mousePos.y - star.y, 2)
      );
      
      if (distance < mouseConnectionDistance) {
        lines.push(
          <Line
            key={`mouse-${star.id}`}
            x1={star.x}
            y1={star.y}
            x2={mousePos.x}
            y2={mousePos.y}
            thickness={0.5}
          />
        );
      }
    }
    
    return lines;
  };
  
  // Determinar quais estrelas estão próximas o suficiente para conectar
  const getStarLines = () => {
    const lines = [];
    const starConnectionDistance = 15; // Porcentagem da tela
    
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const distance = Math.sqrt(
          Math.pow(stars[i].x - stars[j].x, 2) + Math.pow(stars[i].y - stars[j].y, 2)
        );
        
        if (distance < starConnectionDistance) {
          lines.push(
            <Line
              key={`${stars[i].id}-${stars[j].id}`}
              x1={stars[i].x}
              y1={stars[i].y}
              x2={stars[j].x}
              y2={stars[j].y}
              thickness={0.5}
            />
          );
        }
      }
    }
    
    return lines;
  };
  
  return (
    <Background>
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          x={star.x}
          y={star.y}
          color={star.color}
          animationDuration={star.animationDuration}
        />
      ))}
      {getStarLines()}
      {getConnectingLines()}
    </Background>
  );
};

export default StarryBackground;