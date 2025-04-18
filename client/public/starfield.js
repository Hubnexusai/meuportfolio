document.addEventListener('DOMContentLoaded', () => {
  const starfield = document.getElementById('starfield');
  if (!starfield) {
    console.error('Starfield não encontrado');
    return;
  }

  // Reduzido ainda mais o número de estrelas para melhorar performance
  const STAR_COUNT = 25;
  const COLORS = ['star-1', 'star-2'];
  
  // Versão ultra simplificada para melhor performance
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    star.className = `star ${colorClass}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    // Aumentado tempo de animação para reduzir carga no CPU
    star.style.setProperty('--duration', `${Math.random() * 8 + 6}s`);
    
    starfield.appendChild(star);
  }
  
  // Removido completamente qualquer interação com o mouse
  
  console.log('Starfield ultra otimizado inicializado com sucesso');
});