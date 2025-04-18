// Efeito Matrix Digital Rain otimizado para Hub Nexus AI
document.addEventListener('DOMContentLoaded', function() {
  // Verificação de suporte a canvas para dispositivos mais antigos
  if (!window.HTMLCanvasElement) {
    console.log('Canvas não suportado, efeito Matrix desativado');
    return;
  }
  
  // Criar o canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;opacity:0.15;';
  
  // Inserir no DOM
  document.body.insertBefore(canvas, document.getElementById('root'));
  
  // Configuração do canvas
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Configurações do efeito Matrix
  const columns = Math.floor(canvas.width / 20); // Menor número de colunas para melhor performance
  const drops = [];
  
  // Inicializa posições das gotas
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -canvas.height;
  }
  
  // Caracteres do efeito Matrix (simplificado para melhor performance)
  const chars = ['0', '1', 'A', 'I'];
  
  // Função de desenho
  function draw() {
    // Fundo semi-transparente para criar rastro
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cor dos caracteres
    ctx.fillStyle = '#00CCFF';
    ctx.font = '16px monospace';
    
    // Desenha os caracteres
    for (let i = 0; i < columns; i++) {
      if (Math.random() > 0.985) { // Menor probabilidade de atualização para melhor performance
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i];
        
        ctx.fillText(char, x, y);
        
        // Se a gota chegar ao fim da tela, resetar para o topo
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move a gota para baixo
        drops[i] += 10;
      }
    }
  }
  
  // Configurar intervalo mais lento para melhor performance (menos FPS)
  setInterval(draw, 100);
  
  // Redimensionar canvas quando a janela mudar de tamanho
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalcular colunas
    const newColumns = Math.floor(canvas.width / 20);
    // Ajustar o array de gotas se necessário
    if (newColumns > columns) {
      for (let i = columns; i < newColumns; i++) {
        drops[i] = Math.random() * -canvas.height;
      }
    }
  }, { passive: true });
  
  console.log('Efeito Matrix Digital Rain inicializado');
});
