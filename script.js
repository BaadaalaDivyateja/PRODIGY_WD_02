let startTime, elapsedTime = 0, timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function formatTime(ms) {
    const milliseconds = ms % 1000;
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${(hours < 10 ? '0' : '') + hours}:${
        (minutes < 10 ? '0' : '') + minutes}:${
        (seconds < 10 ? '0' : '') + seconds}.${
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds}`;
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
            updateClock(elapsedTime);
        }, 10);
        startStopButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.000';
    elapsedTime = 0;
    running = false;
    startStopButton.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
    updateClock(elapsedTime);
}

function recordLap() {
    if (running) {
        laps.push(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapsList.appendChild(lapElement);
    }
}

function updateClock(ms) {
    const seconds = ms / 1000;
    const hoursRotation = (seconds / (60 * 60)) * 360;
    const minutesRotation = (seconds / 60) * 360;
    const secondsRotation = (seconds % 60) * 360;

    hourHand.style.transform = `rotate(${hoursRotation}deg)`;
    minuteHand.style.transform = `rotate(${minutesRotation}deg)`;
    secondHand.style.transform = `rotate(${secondsRotation}deg)`;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

