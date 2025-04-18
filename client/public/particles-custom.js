// Custom Particles effect for Hub Nexus AI - Versão ultra otimizada
document.addEventListener('DOMContentLoaded', function() {
  // Create a canvas element for particles
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';
  
  // Insert before the root div
  const rootDiv = document.getElementById('root');
  document.body.insertBefore(canvas, rootDiv);
  
  // Versão estática simples apenas com pontos fixos - sem animação
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Desenhar pontos fixos de fundo - sem animação
  ctx.fillStyle = '#00CCFF';
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  console.log('Sistema de partículas otimizado inicializado');
});
