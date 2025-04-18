// Partículas simples para Hub Nexus AI
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de suporte a canvas
  if (!window.HTMLCanvasElement) {
    console.log('Canvas não suportado, efeito desativado');
    return;
  }
  
  // Criar o canvas com opacidade reduzida
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0.2;';
  
  // Inserir no DOM
  document.body.insertBefore(canvas, document.getElementById('root'));
  
  // Configuração do canvas
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Configurações das partículas
  const particleCount = 20;
  const particles = [];
  
  // Criar as partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    });
  }
  
  // Função de desenho
  function draw() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar partículas
    ctx.fillStyle = '#00CCFF';
    ctx.shadowColor = '#00CCFF';
    ctx.shadowBlur = 5;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Desenhar partícula
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Mover partícula
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Verificar bordas
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    }
  }
  
  // Configurar intervalo para animação
  setInterval(draw, 50);
  
  // Redimensionar canvas quando a janela mudar de tamanho
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { passive: true });
  
  console.log('Efeito de partículas simples inicializado');
});
