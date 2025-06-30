const ding = new Audio('assets/bell.mp3');
const click = new Audio('assets/button.mp3');

function showScreen(screenId) {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('focus-screen').style.display = 'none';
    document.getElementById('break-screen').style.display = 'none';
    document.getElementById(screenId).style.display = 'flex';
}
function goToFocus() {
    showScreen('focus-screen');
    resetTimer();
}

function goToBreak() {
    showScreen('break-screen');
    resetBreak();
}

function goHome() {
    showScreen('home-screen');
    pauseTimer();
    pauseBreakTimer();
}


let focusTime = 1500 //25*60 minutes in secs
let timeRemaining = focusTime;
let interval = null;

function updateDisplay() {
    const minutes = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
    const seconds = String(timeRemaining % 60).padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (interval) return;
    interval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(interval);
            interval = null;
            ding.play();
            goToBreak(); 
            return;
        }
    timeRemaining--;
    updateDisplay();
}, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timeRemaining = focusTime;
    updateDisplay();
}


let breakTime = 300 //5*60 5 minutes in seconds
let breakRemaining = breakTime;
let breakInterval = null;

function updateBreakDisplay() {
    const minutes = String(Math.floor(breakRemaining / 60)).padStart(2, '0');
    const seconds = String(breakRemaining % 60).padStart(2, '0');
    document.getElementById('break-timer').textContent = `${minutes}:${seconds}`;
}

function startBreakTimer() {
    if (breakInterval) return;
    breakInterval = setInterval(() => {
        if (breakRemaining <= 0) {
            clearInterval(breakInterval);
            breakInterval = null;
            ding.play();
            alert("Time's up!");
            return;
        }
    breakRemaining--;
    updateBreakDisplay();
}, 1000);
}

function pauseBreakTimer() {
    clearInterval(breakInterval);
    breakInterval = null;
}

function resetBreak() {
    clearInterval(breakInterval);
    breakInterval = null;
    breakRemaining = breakTime;
    updateBreakDisplay();
}

window.onload = () => {
    updateDisplay();       // init focus
    updateBreakDisplay();  //init break

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            click.currentTime = 0;
            click.play();
        })
    })
};
