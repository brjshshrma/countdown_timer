document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const minutesInput = document.getElementById('minutes');
    
    let countdown;
    let timeLeft = 0;
    let isRunning = false;
    
    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
        timerDisplay.textContent = display;
        document.title = `${display} - Countdown Timer`;
    }
    
    function startTimer() {
        if (isRunning) return;
        
        const minutes = parseInt(minutesInput.value, 10);
        if (isNaN(minutes) || minutes <= 0) {
            alert('Please enter a valid number of minutes');
            return;
        }
        
        clearInterval(countdown);
        isRunning = true;
        startButton.textContent = 'Pause';
        
        const now = Date.now();
        const then = now + minutes * 60 * 1000;
        timeLeft = minutes * 60;
        
        displayTimeLeft(timeLeft);
        
        countdown = setInterval(() => {
            timeLeft = Math.round((then - Date.now()) / 1000);
            
            if (timeLeft < 0) {
                clearInterval(countdown);
                isRunning = false;
                startButton.textContent = 'Start';
                timeLeft = 0;
                displayTimeLeft(timeLeft);
                alert('Countdown finished!');
                return;
            }
            
            displayTimeLeft(timeLeft);
        }, 1000);
    }
    
    function pauseTimer() {
        clearInterval(countdown);
        isRunning = false;
        startButton.textContent = 'Resume';
    }
    
    function resetTimer() {
        clearInterval(countdown);
        timeLeft = 0;
        isRunning = false;
        startButton.textContent = 'Start';
        displayTimeLeft(timeLeft);
        minutesInput.value = '';
        document.title = 'Countdown Timer';
    }
    
    startButton.addEventListener('click', () => {
        if (!isRunning) {
            startTimer();
        } else {
            pauseTimer();
        }
    });
    
    resetButton.addEventListener('click', resetTimer);
}); 