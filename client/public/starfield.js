document.addEventListener('DOMContentLoaded', () => {
  const starfield = document.getElementById('starfield');
  if (!starfield) {
    console.error('Starfield não encontrado');
    return;
  }
  
  // Sem efeitos ativos no momento
  console.log('Fundo sem efeitos ativos');
});