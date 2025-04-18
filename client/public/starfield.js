document.addEventListener('DOMContentLoaded', () => {
  const starfield = document.getElementById('starfield');
  if (!starfield) {
    console.error('Starfield não encontrado');
    return;
  }

  // Efeito de conexões de rede neural - otimizado
  const POINT_COUNT = 15; // Reduzido para melhor performance
  const COLORS = ['#00CCFF', '#0096bf'];
  const points = [];
  
  // Criar pontos como nós de rede neural
  for (let i = 0; i < POINT_COUNT; i++) {
    const point = document.createElement('div');
    point.className = 'neural-point';
    
    // Estilo base
    point.style.position = 'absolute';
    point.style.borderRadius = '50%';
    point.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    // Tamanho variado
    const size = Math.random() * 3 + 2;
    point.style.width = `${size}px`;
    point.style.height = `${size}px`;
    
    // Posição
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    point.style.left = `${x}%`;
    point.style.top = `${y}%`;
    
    // Animação de pulsar simplificada
    point.style.animation = `pulse ${Math.random() * 4 + 3}s infinite alternate`;
    
    // Adicionar ao DOM
    starfield.appendChild(point);
    
    // Armazenar ponto e sua posição para referência
    points.push({ element: point, x, y });
  }
  
  // Adicionar linhas de conexão somente para pontos próximos (otimizado)
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      // Calcular distância entre pontos (aproximada)
      const dx = Math.abs(points[i].x - points[j].x);
      const dy = Math.abs(points[i].y - points[j].y);
      
      // Conectar apenas pontos próximos (economia de recursos)
      if (dx < 30 && dy < 30) {
        const line = document.createElement('div');
        line.className = 'neural-line';
        
        // Estilo da linha - aumentada opacidade
        line.style.position = 'absolute';
        line.style.height = '1px';
        line.style.backgroundColor = 'rgba(0, 204, 255, 0.5)';
        line.style.transformOrigin = 'left center';
        
        // Calcular a posição e tamanho da linha
        const angle = Math.atan2(points[j].y - points[i].y, points[j].x - points[i].x);
        const length = Math.sqrt(dx * dx + dy * dy);
        
        line.style.width = `${length}vw`;
        line.style.left = `${points[i].x}%`;
        line.style.top = `${points[i].y}%`;
        line.style.transform = `rotate(${angle}rad)`;
        
        // Adicionar ao DOM
        starfield.appendChild(line);
      }
    }
  }
  
  // Adicionar estilos para animação de pulsar - mais visível
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    
    .neural-point {
      box-shadow: 0 0 5px #00CCFF;
    }
  `;
  document.head.appendChild(style);
  
  console.log('Efeito de rede neural otimizado inicializado com sucesso');
});