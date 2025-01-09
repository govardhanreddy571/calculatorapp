// Listen for clicks on the body
document.body.addEventListener('click', function (event) {
    createBlast(event.clientX, event.clientY);
});

// Function to create a blast effect
function createBlast(x, y) {
    const numParticles = 20;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Randomize the direction and distance of the blast
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 200;

        particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);

        // Set the position of the particle
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        document.body.appendChild(particle);

        // Remove the particle after animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}
