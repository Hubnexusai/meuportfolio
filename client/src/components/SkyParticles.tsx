import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from '@tsparticles/engine';
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
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesContainer>
      <Particles
        id="sky-particles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ['#6b46c1', '#2563eb', '#3b82f6', '#8b5cf6'],
            },
            links: {
              color: '#8b5cf6',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </ParticlesContainer>
  );
};

export default SkyParticles;