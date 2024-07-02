const slices = [
    "Prize 1",
    "Prize 2",
    "Prize 3",
    "Prize 4",
    "Prize 5",
    "Prize 6",
    "Prize 7"
];

const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spin-button');
const tickSound = document.getElementById('tick-sound');

document.addEventListener('DOMContentLoaded', () => {
    setupSlices();
});

spinButton.addEventListener('click', spinWheel);

function setupSlices() {
    const numSlices = slices.length;
    const sliceAngle = 360 / numSlices;

    slices.forEach((slice, index) => {
        const sliceElem = document.createElement('span');
        sliceElem.innerText = slice;
        sliceElem.style.transform = `rotate(${index * sliceAngle}deg) translateY(-150px)`;
        wheel.appendChild(sliceElem);
    });
}

function spinWheel() {
    const randomDegree = Math.floor(Math.random() * 3600) + 360; // Random degree between 360 and 3960
    const finalDegree = randomDegree % 360;
    const duration = 5000; // 5 seconds spin time
    const tickInterval = 360 / slices.length; // Slices
    let currentDegree = 0;
    let lastTick = 0;

    const interval = 10; // update interval in ms
    const step = randomDegree / (duration / interval); // degree step per interval

    wheel.style.transition = `transform ${duration / 1000}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    const spinAnimation = setInterval(() => {
        currentDegree += step;
        if (currentDegree - lastTick >= tickInterval) {
            tickSound.currentTime = 0;
            tickSound.play();
            lastTick = currentDegree;
        }
        if (currentDegree >= randomDegree) {
            clearInterval(spinAnimation);
            announceResult(finalDegree);
        }
    }, interval);
}

function announceResult(finalDegree) {
    const sliceAngle = 360 / slices.length;
    const index = Math.floor((360 - finalDegree + sliceAngle / 2) % 360 / sliceAngle);
    const result = slices[index];
    setTimeout(() => {
        alert(`Congratulations! You won ${result}!`);
    }, 500); // delay to ensure the wheel has fully stopped
}
