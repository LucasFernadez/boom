document.addEventListener("DOMContentLoaded", () => {
    const inputNumber = document.getElementById("userInput");
    const restartButton = document.getElementById("restart");
    const countdownDisplay = document.getElementById("countdown");
    const resultDisplay = document.getElementById("result");
    
    let countdown;
    
    function startGame() {
        const userChoice = parseInt(inputNumber.value);
        if (isNaN(userChoice) || userChoice < 1 || userChoice > 3) {
            alert("Por favor, introduce un número válido entre 1 y 3.");
            return;
        }
        
        resultDisplay.textContent = "";
        inputNumber.disabled = true;
        
        let timeLeft = 5;
        countdownDisplay.textContent = timeLeft;
        
        countdown = setInterval(() => {
            timeLeft--;
            countdownDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                checkResult(userChoice);
            }
        }, 1000);
    }
    
    function checkResult(userChoice) {
        const randomChoice = Math.floor(Math.random() * 3) + 1;
        
        new Promise((resolve) => {
            setTimeout(() => resolve(randomChoice), 1000);
        }).then((randomChoice) => {
            if (userChoice === randomChoice) {
                resultDisplay.textContent = `¡Has salvado el mundo! Elegiste ${userChoice} y el número era ${randomChoice}.`;
            } else {
                resultDisplay.textContent = `La bomba ha estallado. Elegiste ${userChoice} pero el número era ${randomChoice}.`;
            }
            inputNumber.disabled = false;
        });
    }
    
    function resetGame() {
        clearInterval(countdown);
        countdownDisplay.textContent = "";	
        inputNumber.value = "";
        inputNumber.disabled = false;
    }
    
    inputNumber.addEventListener("blur", startGame);
    restartButton.addEventListener("click", resetGame);
});
