// Efeito de partículas triangulares com interação do mouse (velocidade 6x)
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de suporte a canvas
  if (!window.HTMLCanvasElement) {
    console.log('Canvas não suportado, efeito desativado');
    return;
  }
  
  // Criar o canvas com opacidade ajustada
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0.3;';
  
  // Inserir no DOM
  document.body.insertBefore(canvas, document.getElementById('root'));
  
  // Configuração do canvas
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Rastrear posição do mouse
  const mouse = {
    x: undefined,
    y: undefined,
    radius: 150
  };
  
  // Configurações das partículas
  const particleCount = 14; // Aumentado para 14 conforme solicitado
  const particles = [];
  
  // Criar as partículas com velocidade 6x e tamanho reduzido
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.8, // Tamanho reduzido (entre 0.8 e 2.0)
      // Velocidade 6x mais rápida
      speedX: (Math.random() * 0.5 - 0.25) * 6,
      speedY: (Math.random() * 0.5 - 0.25) * 6
    });
  }
  
  // Função para desenhar triângulos entre partículas
  function drawTriangles() {
    // Ordenar partículas por distância para formar triângulos com as mais próximas
    const triangles = [];
    
    // Para cada partícula, encontrar as duas partículas mais próximas para formar um triângulo
    for (let i = 0; i < particles.length; i++) {
      const distances = [];
      
      for (let j = 0; j < particles.length; j++) {
        if (i !== j) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          distances.push({ index: j, distance: distance });
        }
      }
      
      // Ordenar por distância (mais próximas primeiro)
      distances.sort((a, b) => a.distance - b.distance);
      
      // Pegar as duas partículas mais próximas para formar um triângulo
      if (distances.length >= 2) {
        const j = distances[0].index;
        const k = distances[1].index;
        
        // Criar um ID único para o triângulo (ordenando os índices)
        const triangleId = [i, j, k].sort().join('-');
        
        // Apenas adicionar se este triângulo ainda não foi adicionado
        if (!triangles.some(t => t.id === triangleId)) {
          triangles.push({
            id: triangleId,
            points: [
              { x: particles[i].x, y: particles[i].y },
              { x: particles[j].x, y: particles[j].y },
              { x: particles[k].x, y: particles[k].y }
            ]
          });
        }
      }
    }
    
    // Desenhar os triângulos
    for (let t of triangles) {
      ctx.beginPath();
      ctx.moveTo(t.points[0].x, t.points[0].y);
      ctx.lineTo(t.points[1].x, t.points[1].y);
      ctx.lineTo(t.points[2].x, t.points[2].y);
      ctx.closePath();
      
      // Desenhar apenas contorno do triângulo (para ser mais leve)
      ctx.strokeStyle = 'rgba(0, 204, 255, 0.15)';
      ctx.stroke();
    }
  }
  
  // Função de desenho otimizada
  function draw() {
    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Desenhar partículas
    ctx.fillStyle = '#00CCFF';
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Desenhar partícula
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Mover partícula com velocidade 6x
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Interação com o mouse - muda direção quando próximo ao mouse
      if (mouse.x !== undefined && mouse.y !== undefined) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Se a partícula estiver próxima ao mouse
        if (distance < mouse.radius) {
          // Cria uma força de atração leve em direção ao mouse
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          // Ajusta a velocidade com base na força
          p.speedX += forceDirectionX * force * 0.5;
          p.speedY += forceDirectionY * force * 0.5;
          
          // Limita a velocidade máxima para evitar comportamentos estranhos
          const maxSpeed = 4;
          const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY);
          if (currentSpeed > maxSpeed) {
            p.speedX = (p.speedX / currentSpeed) * maxSpeed;
            p.speedY = (p.speedY / currentSpeed) * maxSpeed;
          }
        }
      }
      
      // Verificar bordas com bounce
      if (p.x < 0 || p.x > canvas.width) {
        p.speedX *= -1;
        p.x = p.x < 0 ? 0 : canvas.width;
      }
      if (p.y < 0 || p.y > canvas.height) {
        p.speedY *= -1;
        p.y = p.y < 0 ? 0 : canvas.height;
      }
    }
    
    // Desenhar triângulos entre as partículas
    drawTriangles();
  }
  
  // Atualizar posição do mouse
  document.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  // Resetar posição do mouse quando sair da página
  document.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
  });
  
  // Configurar intervalo para animação (60 fps)
  setInterval(draw, 16);
  
  // Redimensionar canvas quando a janela mudar de tamanho
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { passive: true });
  
  console.log('Efeito de partículas triangulares 6x velocidade inicializado');
});
