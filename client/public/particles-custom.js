// Custom Particles effect for Hub Nexus AI
document.addEventListener('DOMContentLoaded', function() {
  // Create a canvas element for particles
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1'; // Higher than starfield but below content
  canvas.style.pointerEvents = 'none'; // Allow click-through
  
  // Insert before the root div
  const rootDiv = document.getElementById('root');
  document.body.insertBefore(canvas, rootDiv);
  
  // Initialize the particles
  initParticles();
});

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const primaryColor = '#00CCFF';
  
  // Make canvas full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particles properties
  const particles = [];
  const particleCount = 40; // Número muito reduzido de partículas
  const maxDistance = 180; // Max distance to draw connections
  
  // Mouse position
  let mouse = {
    x: null,
    y: null,
    radius: 200 // Radius of influence
  };
  
  // Handle window resize
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  // Track mouse position
  window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  // Mouse leaves the window
  window.addEventListener('mouseout', function() {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Particle class
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }
    
    // Draw the particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    // Update particle position and handle connections
    update() {
      // Bounce on edges
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      
      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;
      
      // Draw particle
      this.draw();
    }
  }
  
  // Connect particles if they are close enough
  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Set opacity based on distance
          const opacity = 1 - (distance / maxDistance);
          ctx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
      
      // Connect with mouse if close enough
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particles[a].x - mouse.x;
        const dy = particles[a].y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Set opacity based on distance from mouse
          const opacity = 1 - (distance / mouse.radius);
          ctx.strokeStyle = `rgba(0, 204, 255, ${opacity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Initialize particles
  function init() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2 + 1;
      const x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
      const y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
      const directionX = (Math.random() * 2.0) - 1.0; // Velocidade muito aumentada
      const directionY = (Math.random() * 2.0) - 1.0; // Velocidade muito aumentada
      const color = primaryColor;
      
      particles.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    
    connect();
  }
  
  // Start particle system
  init();
  animate();
  console.log('Custom particles system initialized');
}
