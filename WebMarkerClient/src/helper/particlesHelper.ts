export function startParticlesAnimation() {
  const particlesMin = require('./particles.min.js');
  const particles = document.createElement('div');
  particles.id = 'particles-js';
  document.body.appendChild(particles);
  const startParticles = require('./particles.js');
}