import React from 'react';
import styled from 'styled-components';

const ParticlesContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
`;

const SkyParticles: React.FC = () => {
  // Usamos a implementação do particles.js diretamente via HTML/JS
  // Os arquivos particles.min.js e particles.js foram adicionados ao index.html
  
  return (
    <ParticlesContainer>
      {/* O elemento div#particles-js foi adicionado no index.html */}
    </ParticlesContainer>
  );
};

export default SkyParticles;