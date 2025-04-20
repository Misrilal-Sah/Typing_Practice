document.addEventListener('DOMContentLoaded', function() {
    const textDisplay = document.getElementById('textDisplay');
    const textInput = document.getElementById('textInput');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const errorsDisplay = document.getElementById('errors');
    const timeDisplay = document.getElementById('time');
    const progressBar = document.getElementById('progressBar');
    const quoteElement = document.getElementById('quote');
    const difficultyBtns = document.querySelectorAll('[data-difficulty]');
    const themeSwitch = document.getElementById('themeSwitch');
    const soundToggle = document.getElementById('soundToggle');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const historyTableBody = document.getElementById('historyTableBody');
    
    const resultWpm = document.getElementById('resultWpm');
    const resultAccuracy = document.getElementById('resultAccuracy');
    const resultErrors = document.getElementById('resultErrors');
    const resultTime = document.getElementById('resultTime');
    const resultMessage = document.getElementById('resultMessage');
    
    const keySound = new Audio('audio/key.mp3');
    const errorSound = new Audio('audio/error.mp3');
    const successSound = new Audio('audio/success.mp3');
    const backspaceSound = new Audio('audio/backspace.mp3');
    
    let timer;
    let timeElapsed = 0;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;
    let currentDifficulty = 'easy';
    let originalText = '';
    let wpm = 0;
    let accuracy = 100;
    let typingHistory = [];
    let typedChars = [];
    let showingCurrentCharacter = false;
    
    init();
    
    function init() {
        loadThemePreference();
        loadTypingHistory();
        displayHistory();
        updateQuote();
        setDifficulty('easy');
        
        startBtn.addEventListener('click', startTyping);
        restartBtn.addEventListener('click', resetTest);
        textInput.addEventListener('input', handleInput);
        themeSwitch.addEventListener('change', toggleTheme);
        soundToggle.addEventListener('change', toggleSound);
        tryAgainBtn.addEventListener('click', handleTryAgain);
        clearHistoryBtn.addEventListener('click', clearHistory);
        
        difficultyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                setDifficulty(this.dataset.difficulty);
                
                difficultyBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        addCelestialBackground();
    }
    
    function addCelestialBackground() {
        const mainContainer = document.querySelector('.main-container');
        
        const existingElements = document.querySelectorAll('.celestial-element');
        existingElements.forEach(el => el.remove());
        
        const celestialContainer = document.createElement('div');
        celestialContainer.classList.add('celestial-container');
        
        const isDarkMode = document.documentElement.hasAttribute('data-theme');
        
        const celestialElement = document.createElement('img');
        celestialElement.classList.add('celestial-element');
        
        if (isDarkMode) {
            celestialElement.src = 'images/moon.gif';
            celestialElement.alt = 'Moon';
        } else {
            celestialElement.src = 'images/sun.gif';
            celestialElement.alt = 'Sun';
        }
        
        celestialContainer.appendChild(celestialElement);
        
        mainContainer.appendChild(celestialContainer);
        
        if (isDarkMode) {
            addStars(mainContainer);
        }
    }
    
    function addStars(container) {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.classList.add('star', 'celestial-element');
            
            const size = Math.random() * 2 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            star.style.animationDelay = `${Math.random() * 4}s`;
            
            container.appendChild(star);
        }
    }
    
    function setDifficulty(difficulty) {
        currentDifficulty = difficulty;
        resetTest();
    }
    
    function updateQuote() {
        quoteElement.textContent = getRandomQuote();
    }
    
    function startTyping() {
        resetTest();
        
        originalText = getRandomText(currentDifficulty);
        
        displayTextWithSpans(originalText);
        
        textInput.disabled = false;
        textInput.focus();
        
        restartBtn.disabled = false;
        
        timer = setInterval(updateTimer, 1000);
        
        isTyping = true;
        
        playSound(successSound);
        
        startBtn.disabled = true;
        
        charIndex = 0;
        typedChars = [];
        
        updateDisplayFromTyped();
    }
    
    function displayTextWithSpans(text) {
        textDisplay.innerHTML = '';
        
        text.split('').forEach(char => {
            const span = document.createElement('span');
            span.textContent = char;
            textDisplay.appendChild(span);
        });
        
        textDisplay.children[0].classList.add('upcoming');
    }
    
    function handleInput(e) {
        if (!isTyping) return;
        
        const currentValue = e.target.value;
        
        charIndex = currentValue.length;
        
        const maxLength = Math.min(currentValue.length, originalText.length);
        typedChars = [];
        
        for (let i = 0; i < maxLength; i++) {
            if (currentValue[i] === originalText[i]) {
                typedChars[i] = 'correct';
            } else {
                typedChars[i] = 'incorrect';
            }
        }
        
        updateDisplayFromTyped();
        
        mistakes = typedChars.filter(char => char === 'incorrect').length;
        errorsDisplay.textContent = mistakes;
        
        if (charIndex > 0) {
            const correctChars = charIndex - mistakes;
            accuracy = Math.max(0, Math.floor((correctChars / charIndex) * 100));
            accuracyDisplay.textContent = accuracy + '%';
        }
        
        updateWPM();
        
        updateProgressBar();
        
        if (charIndex >= originalText.length && charIndex > 0) {
            const allCorrect = typedChars.every(state => state === 'correct');
            if (allCorrect) {
                endTest();
            }
        }
        
        if (e.inputType === 'deleteContentBackward') {
            playSound(backspaceSound);
        } else {
            if (currentValue.length > 0 && typedChars[currentValue.length - 1] === 'correct') {
                playSound(successSound);
            } else if (currentValue.length > 0) {
                playSound(errorSound);
            }
        }
    }
    
    function updateDisplayFromTyped() {
        for (let i = 0; i < textDisplay.children.length; i++) {
            textDisplay.children[i].classList.remove('correct', 'incorrect', 'current', 'upcoming', 'future');
        }
        
        for (let i = 0; i < typedChars.length; i++) {
            if (typedChars[i]) {
                textDisplay.children[i].classList.add(typedChars[i]);
            }
        }
        
        if (charIndex < originalText.length) {
            textDisplay.children[charIndex].classList.add('upcoming');
            
            for (let i = 1; i <= 3; i++) {
                if (charIndex + i < originalText.length) {
                    textDisplay.children[charIndex + i].classList.add('future');
                }
            }
        }
    }
    
    function updateTimer() {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed + 's';
        
        updateWPM();
    }
    
    function updateWPM() {
        const words = Math.max(0, charIndex / 5);
        
        const minutes = timeElapsed / 60;
        
        wpm = minutes > 0 ? Math.round(words / minutes) : 0;
        
        wpmDisplay.textContent = wpm;
    }
    
    function updateProgressBar() {
        const progress = (charIndex / originalText.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function endTest() {
        clearInterval(timer);
        isTyping = false;
        textInput.disabled = true;
        saveResult();
        showResultsModal();
        startBtn.disabled = false;
        updateQuote();
        playSound(successSound);
    }
    
    function resetTest() {
        clearInterval(timer);
        timeElapsed = 0;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;
        typedChars = [];
        
        wpmDisplay.textContent = '0';
        accuracyDisplay.textContent = '100%';
        errorsDisplay.textContent = '0';
        timeDisplay.textContent = '0s';
        
        textInput.value = '';
        textInput.disabled = true;
        
        textDisplay.innerHTML = '<div class="text-muted">Click "Start" to begin the typing test...</div>';
        
        progressBar.style.width = '0%';
        
        startBtn.disabled = false;
        restartBtn.disabled = true;
    }
    
    function handleTryAgain() {
        const resultsModal = bootstrap.Modal.getInstance(document.getElementById('resultsModal'));
        resultsModal.hide();
        startTyping();
    }
    
    function showResultsModal() {
        resultWpm.textContent = wpm;
        resultAccuracy.textContent = accuracy + '%';
        resultErrors.textContent = mistakes;
        resultTime.textContent = timeElapsed + 's';
        
        setResultMessage();
        
        const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));
        resultsModal.show();
    }
    
    function setResultMessage() {
        let message = '';
        
        if (wpm < 30) {
            message = "Keep practicing! Your speed will improve with time.";
        } else if (wpm < 50) {
            message = "Good job! You're making progress.";
        } else if (wpm < 70) {
            message = "Great typing speed! You're above average.";
        } else if (wpm < 90) {
            message = "Excellent! You're becoming a typing master.";
        } else {
            message = "Outstanding! Your typing skills are top-notch!";
        }
        
        resultMessage.textContent = message;
    }
    
    function saveResult() {
        const result = {
            date: new Date().toLocaleString(),
            wpm: wpm,
            accuracy: accuracy,
            errors: mistakes,
            time: timeElapsed,
            difficulty: currentDifficulty
        };
        
        typingHistory.unshift(result);
        
        if (typingHistory.length > 20) {
            typingHistory.pop();
        }
        
        localStorage.setItem('typingHistory', JSON.stringify(typingHistory));
        
        displayHistory();
    }
    
    function loadTypingHistory() {
        const history = localStorage.getItem('typingHistory');
        
        if (history) {
            typingHistory = JSON.parse(history);
        }
    }
    
    function displayHistory() {
        historyTableBody.innerHTML = '';
        
        if (typingHistory.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="6" class="text-center">No history available</td>';
            historyTableBody.appendChild(row);
            return;
        }
        
        typingHistory.forEach(result => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${result.date}</td>
                <td>${result.wpm}</td>
                <td>${result.accuracy}%</td>
                <td>${result.errors}</td>
                <td>${result.time}s</td>
                <td>${capitalizeFirstLetter(result.difficulty)}</td>
            `;
            
            historyTableBody.appendChild(row);
        });
    }
    
    function clearHistory() {
        typingHistory = [];
        localStorage.removeItem('typingHistory');
        displayHistory();
    }
    
    function toggleTheme() {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
        
        addCelestialBackground();
    }
    
    function loadThemePreference() {
        const theme = localStorage.getItem('theme');
        
        if (theme === 'dark') {
            themeSwitch.checked = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    function toggleSound() {
        localStorage.setItem('sound', soundToggle.checked ? 'on' : 'off');
    }
    
    function playSound(sound) {
        if (soundToggle.checked) {
            const soundClone = sound.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play();
        }
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 600);
}); 