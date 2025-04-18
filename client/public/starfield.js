document.addEventListener('DOMContentLoaded', () => {
  const starfield = document.getElementById('starfield');
  if (!starfield) {
    console.error('Starfield não encontrado');
    return;
  }

  // Reduzido drasticamente o número de estrelas
  const STAR_COUNT = 40;
  const COLORS = ['star-1', 'star-2', 'star-3'];
  
  // Criar as estrelas - versão simplificada e otimizada
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    star.className = `star ${colorClass}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    // Animação mais lenta para melhor performance
    star.style.setProperty('--duration', `${Math.random() * 6 + 3}s`);
    
    starfield.appendChild(star);
  }
  
  // Removemos completamente as linhas de mouse para melhorar performance
  
  console.log('Starfield otimizado inicializado com sucesso');
});