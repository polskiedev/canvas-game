/** @type {HTMLCanvasElement} */
// Coding Train / Daniel Shiffman


document.addEventListener('DOMContentLoaded', function() {  

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  const CANVAS_WIDTH = canvas.width = 600;
  const CANVAS_HEIGHT = canvas.height = 600;
  
  const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
  const { GravityBehavior } = toxi.physics2d.behaviors;
  const { Vec2D, Rect } = toxi.geom;
  
  // Create a toxiclibs.js VerletPhysics2D object
  const physics = new toxi.physics2d.VerletPhysics2D();

  let bounds = new Rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  physics.setWorldBounds(bounds);

  // physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Create an array to store the particles
  const particles = [];

  // Set the center position of the circle
  const center = new toxi.geom.Vec2D(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  // Set the radius of the circle
  const radius = 100;

  // Set the number of particles to form the circle
  const numParticles = 50;

  // Calculate the angle between each particle
  const angleIncrement = (2 * Math.PI) / numParticles;

  // Create the particles and add them to the physics simulation
  for (let i = 0; i < numParticles; i++) {
    const angle = i * angleIncrement;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    const particle = new toxi.physics2d.VerletParticle2D(new toxi.geom.Vec2D(x, y));
    particles.push(particle);
    physics.addParticle(particle);
  }

  // Create the springs between the particles
  for (let i = 0; i < numParticles; i++) {
    const particleA = particles[i];
    const particleB = particles[(i + 1) % numParticles]; // Connect the last particle with the first one
    const spring = new toxi.physics2d.VerletSpring2D(particleA, particleB, radius, 0.1);
    physics.addSpring(spring);
  }

  // Update and draw the particles in each frame
  drawFrame = function() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Update the physics simulation
    physics.update();

    // Draw the particles
    // ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.strokeStyle = "#00ff00";

    particles.forEach((particle, index) => {
      const position = particle.x;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    });

    requestAnimationFrame(drawFrame);
  }

  // Start the animation
  drawFrame();
});