let timeRemaining = 1500 //25 minutes *60 seconds == seconds
let interval = null;

function updateDisplay() {
    const minutes = String(Math.floor(timeRemaining/60)).padStart(2, '0');
    const seconds = String(timeRemaining%60).padStart(2, '0');
    document.getElementById('timer').textContent = `${minutes}:${seconds}`;

}

function startTimer() {
    if (interval) return;
    interval = setInterval(() => {
        if (timeRemaining<=0) {
            clearInterval(interval);
            interval = null;
            alert("Time's up!");
            return;
        }
        timeRemaining--;
        updateDisplay();
        }, 1000)
}

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timeRemaining = 1500 //25*60
    updateDisplay();
}


updateDisplay()

window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
