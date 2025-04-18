// Efeito de partículas ultra-otimizado para Hub Nexus AI
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de suporte a canvas
  if (!window.HTMLCanvasElement) {
    console.log('Canvas não suportado, efeito desativado');
    return;
  }
  
  // Criar o canvas com opacidade muito reduzida
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0.25;';
  
  // Inserir no DOM
  document.body.insertBefore(canvas, document.getElementById('root'));
  
  // Configuração do canvas
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Configurações das partículas - apenas 8 partículas para máxima performance
  const particleCount = 8;
  const particles = [];
  
  // Criar as partículas com velocidade 4x
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 1,
      // Velocidade 4x mais rápida que a normal
      speedX: (Math.random() * 0.5 - 0.25) * 4,
      speedY: (Math.random() * 0.5 - 0.25) * 4
    });
  }
  
  // Função de desenho otimizada
  function draw() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar partículas - sem shadow para melhorar performance
    ctx.fillStyle = '#00CCFF';
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Desenhar partícula simples sem efeitos
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Mover partícula com velocidade 4x
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Verificar bordas com bounce
      if (p.x < 0 || p.x > canvas.width) {
        p.speedX *= -1;
        // Garantir que não fique preso na borda
        p.x = p.x < 0 ? 0 : canvas.width;
      }
      if (p.y < 0 || p.y > canvas.height) {
        p.speedY *= -1;
        // Garantir que não fique preso na borda
        p.y = p.y < 0 ? 0 : canvas.height;
      }
    }
    
    // Adicionar linhas entre partículas próximas (opcional, mas otimizado)
    ctx.strokeStyle = 'rgba(0, 204, 255, 0.15)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Conectar apenas partículas muito próximas
        if (distance < canvas.width / 10) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Opacidade baseada na distância para efeito de desvanecimento
          ctx.globalAlpha = 1 - (distance / (canvas.width / 10));
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }
  
  // Configurar intervalo para animação - 60 fps para movimento suave
  setInterval(draw, 16);
  
  // Redimensionar canvas quando a janela mudar de tamanho
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { passive: true });
  
  console.log('Efeito de partículas 4x velocidade inicializado');
});
