import React, { useEffect } from 'react';
import styled from 'styled-components';

// Cores da marca
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
`;

// Configuração das partículas inspirada no site SkyTrader
const PARTICLES_CONFIG = {
  particles: {
    number: {
      value: 80,  // Quantidade moderada de partículas
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: BRAND_COLORS.primary  // Cor principal das partículas
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: BRAND_COLORS.dark
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
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
      distance: 160,  // Maior distância para conexões mais longas
      color: BRAND_COLORS.primary,
      opacity: 0.35,  // Linhas mais sutis
      width: 1
    },
    move: {
      enable: true,
      speed: 2,  // Movimento mais lento (como SkyTrader)
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
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"  // Modo conectar ao passar o mouse
      },
      onclick: {
        enable: true,
        mode: "push"  // Adiciona partículas ao clicar
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,  // Distância de interação maior
        line_linked: {
          opacity: 0.8,  // Linhas mais visíveis na interação
          color: BRAND_COLORS.primary
        }
      },
      bubble: {
        distance: 400,
        size: 4,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

// Configuração alternativa para tornar mais similar ao SkyTrader
const SKYTRADER_STYLE_CONFIG = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: BRAND_COLORS.primary
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.2,
        sync: false
      }
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: true,
        speed: 5,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: BRAND_COLORS.primary,
      opacity: 0.4,
      width: 1.2
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
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
        distance: 180,
        line_linked: {
          opacity: 0.6,
          color: BRAND_COLORS.primary
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
};

// Injetar CSS necessário para o efeito SkyTrader
const injectParticlesCSS = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    #particles-js {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 0;
      background-color: transparent;
      pointer-events: initial;
    }
    
    canvas.particles-js-canvas-el {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      z-index: 0;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
};

const SkyParticles: React.FC = () => {
  useEffect(() => {
    // Injetar CSS para o particles-js
    injectParticlesCSS();
    
    // Carrega a biblioteca particles.js do CDN
    const loadParticlesScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      script.onload = () => {
        // Inicializa particles.js com nossa configuração personalizada
        if ((window as any).particlesJS) {
          // Usando a configuração mais similar ao SkyTrader
          (window as any).particlesJS('particles-js', SKYTRADER_STYLE_CONFIG);
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
      
      // Remove o CSS injetado
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.innerHTML.includes('#particles-js')) {
          style.remove();
        }
      });
    };
  }, []);

  return <ParticlesContainer id="particles-js" />;
};

export default SkyParticles;