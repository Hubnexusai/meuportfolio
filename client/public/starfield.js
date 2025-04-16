document.addEventListener('DOMContentLoaded', () => {
  const starfield = document.getElementById('starfield');
  if (!starfield) {
    console.error('Starfield não encontrado');
    return;
  }

  const STAR_COUNT = 150;
  const COLORS = ['star-1', 'star-2', 'star-3'];
  
  // Criar as estrelas
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2 + 1;
    const colorClass = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    star.className = `star ${colorClass}`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty('--duration', `${Math.random() * 4 + 1}s`);
    
    starfield.appendChild(star);
  }
  
  // Criar linhas que conectam o mouse com as estrelas próximas
  let mouseX = 0;
  let mouseY = 0;
  const mouseLines = [];
  
  // Criar 20 linhas para uso posterior
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'mouse-line';
    line.style.position = 'absolute';
    line.style.backgroundColor = '#00CCFF';
    line.style.height = '1px';
    line.style.transformOrigin = '0 0';
    line.style.opacity = '0';
    line.style.zIndex = '1';
    line.style.pointerEvents = 'none';
    starfield.appendChild(line);
    mouseLines.push(line);
  }
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateMouseLines();
  });
  
  function updateMouseLines() {
    // Obter todas as estrelas
    const stars = document.querySelectorAll('.star');
    const maxDistance = 200; // Distância máxima para conectar a uma estrela
    
    // Esconder todas as linhas primeiro
    mouseLines.forEach(line => {
      line.style.opacity = '0';
    });
    
    // Encontrar as estrelas mais próximas do mouse
    const starsWithDistance = Array.from(stars).map(star => {
      const rect = star.getBoundingClientRect();
      const starX = rect.left + rect.width / 2;
      const starY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2)
      );
      
      return { star, distance, x: starX, y: starY };
    });
    
    // Ordenar por distância e pegar as 20 mais próximas
    const closestStars = starsWithDistance
      .filter(item => item.distance < maxDistance)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, mouseLines.length);
    
    // Atualizar as linhas para conectar o mouse às estrelas mais próximas
    closestStars.forEach((starData, index) => {
      const line = mouseLines[index];
      
      // Calcular o ângulo
      const angle = Math.atan2(starData.y - mouseY, starData.x - mouseX);
      
      // Posicionar e rotacionar a linha
      line.style.left = `${mouseX}px`;
      line.style.top = `${mouseY}px`;
      line.style.width = `${starData.distance}px`;
      line.style.transform = `rotate(${angle}rad)`;
      
      // Tornar a opacidade baseada na distância (mais perto = mais visível)
      const opacity = 1 - (starData.distance / maxDistance);
      line.style.opacity = `${opacity * 0.5}`;
    });
  }
  
  // Atualizar as linhas periodicamente
  setInterval(updateMouseLines, 50);
  
  console.log('Starfield inicializado com sucesso');
});