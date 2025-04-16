/* -----------------------------------------------
 * Particles.js - Configuration file
 * Cores da empresa: #00CCFF #FFFFFF #000935
 * ----------------------------------------------- */

particlesJS('particles-js', {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": ["#00CCFF", "#FFFFFF", "#000935"]
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      }
    },
    "opacity": {
      "value": 0.6,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 2,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#00CCFF",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 10,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": true,
      "attract": {
        "enable": true,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": ["grab", "bubble"]
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "connect": {
        "distance": 300,
        "radius": 180,
        "line_linked": {
          "opacity": 0.6
        }
      },
      "grab": {
        "distance": 250,
        "line_linked": {
          "opacity": 0.8,
          "color": "#00CCFF"
        }
      },
      "bubble": {
        "distance": 200,
        "size": 6,
        "duration": 0.8,
        "opacity": 1,
        "speed": 3
      },
      "repulse": {
        "distance": 300,
        "duration": 0.8
      },
      "push": {
        "particles_nb": 6
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});