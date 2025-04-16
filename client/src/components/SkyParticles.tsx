import React, { useEffect } from 'react';
import styled from 'styled-components';

// Defina cores da empresa
const BRAND_COLORS = {
  primary: '#00CCFF',
  secondary: '#FFFFFF',
  dark: '#000935'
};

const ParticlesContainer = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 0 !important;
  background-color: transparent !important;
  overflow: hidden !important;
  pointer-events: none !important;
`;

// Configuração para o particles.js
const PARTICLES_CONFIG = {
  particles: {
    number: {
      value: 140,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: [BRAND_COLORS.primary, BRAND_COLORS.secondary, BRAND_COLORS.dark]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.6,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: BRAND_COLORS.primary,
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 250,
        line_linked: {
          opacity: 1,
          color: BRAND_COLORS.primary
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
};

const SkyParticles: React.FC = () => {
  useEffect(() => {
    // Carrega a biblioteca particles.js do CDN
    const loadParticlesScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = () => {
        // Inicializa particles.js com nossa configuração personalizada
        if ((window as any).particlesJS) {
          (window as any).particlesJS('particles-js', PARTICLES_CONFIG);
          console.log('Particles.js carregado e inicializado');
        } else {
          console.error('Particles.js não carregado corretamente');
        }
      };
      script.onerror = () => {
        console.error('Falha ao carregar particles.js do CDN');
      };
      document.body.appendChild(script);
    };

    loadParticlesScript();

    // Limpeza
    return () => {
      const scripts = document.querySelectorAll('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return <ParticlesContainer id="particles-js" />;
};

export default SkyParticles;