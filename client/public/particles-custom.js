// Partículas minimalistas para Hub Nexus AI - Versão extremamente otimizada
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de suporte a canvas para dispositivos mais antigos
  if (!window.HTMLCanvasElement) {
    console.log('Canvas não suportado, partículas desativadas');
    return;
  }
  
  // Criar o canvas de forma otimizada
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0.5;';
  
  // Inserir no DOM
  document.body.insertBefore(canvas, document.getElementById('root'));
  
  // Contexto 2D
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Desenhar apenas alguns pontos fixos
  ctx.fillStyle = '#00CCFF';
  for (let i = 0; i < 10; i++) {
    // Partículas fixas sem animação (muito mais leve)
    const size = Math.random() * 1.5 + 0.5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  
  console.log('Sistema de partículas minimalista inicializado');
});
