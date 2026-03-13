// Initialize Lucide Icons
lucide.createIcons();

const mediaInput = document.getElementById('mediaInput');
const actionBtn = document.getElementById('actionBtn');
const loadBar = document.getElementById('loadBar');
const loadVal = document.getElementById('loadVal');
const bgBlob = document.getElementById('bgBlob');

// Primary Interaction Logic
actionBtn.addEventListener('click', () => {
    startExtraction();
});

mediaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startExtraction();
});

function startExtraction() {
    const url = mediaInput.value.trim();
    if (!url) {
        mediaInput.placeholder = "URL required for extraction";
        return;
    }

    // Toggle states for button
    actionBtn.innerText = 'Initializing...';
    actionBtn.style.opacity = '0.8';
    actionBtn.style.pointerEvents = 'none';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            finishExtraction();
        }
        // Update stats as a mock indicator
        loadBar.style.width = progress + '%';
        loadVal.innerText = Math.floor(progress * 15) + ' Nodes';
    }, 120);
}

function finishExtraction() {
    actionBtn.innerText = 'Ready to Download';
    actionBtn.style.background = '#7c4dff';
    actionBtn.style.color = 'white';
    actionBtn.style.opacity = '1';
    actionBtn.style.pointerEvents = 'auto';

    setTimeout(() => {
        // Reset state
        actionBtn.innerText = 'Extract Media';
        actionBtn.style.background = 'white';
        actionBtn.style.color = 'black';
        mediaInput.value = '';
        loadBar.style.width = '85%';
        loadVal.innerText = '1,280';
    }, 4000);
}

// Parallax effect for "Liquid" feel
document.addEventListener('mousemove', (e) => {
    const moveX = (window.innerWidth / 2 - e.pageX) / 50;
    const moveY = (window.innerHeight / 2 - e.pageY) / 50;
    
    // Smooth background blob movement
    if (bgBlob) {
        bgBlob.style.transform = `translate(calc(-50% + ${moveX}px), calc(-20% + ${moveY}px)) scale(1.05)`;
    }
    
    // Floating stats parallax
    document.querySelectorAll('.floating-stat').forEach((stat, index) => {
        const factor = (index + 1) * 1.5;
        stat.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
});

// Auto-trigger on valid paste
mediaInput.addEventListener('paste', () => {
    setTimeout(startExtraction, 250);
});
