function startSpin() {
    const spinner = document.getElementById("spinner");
    const overlay = document.getElementById("overlay");
    const particlesContainer = document.getElementById("particles");

    // Reset overlay
    overlay.style.display = "none";
    particlesContainer.innerHTML = "";

    // Start spin animation
    spinner.style.animation = "spin 3s ease-out";

    setTimeout(() => {
        // Show overlay
        overlay.style.display = "flex";

        // Create particles
        createParticles();

        // Hide overlay after 3 seconds
        setTimeout(() => {
            overlay.style.display = "none";
            spinner.style.animation = "none";
        }, 3000);

    }, 3000);
}

function createParticles() {
    const particlesContainer = document.getElementById("particles");

    const symbols = ["🎈", "🎉", "🌸", "💐", "✨"]; // balloons, flowers, confetti

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // random symbols
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        // random position
        particle.style.left = Math.random() * 100 + "%";

        // random animation delay
        particle.style.animationDelay = Math.random() * 0.5 + "s";

        particlesContainer.appendChild(particle);
    }
}