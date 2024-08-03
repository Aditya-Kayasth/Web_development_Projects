document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const cardsContainer = document.getElementById('cards-container');
    const guessContainer = document.getElementById('guess-container');
    const result = document.getElementById('result');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const clickSound = document.getElementById('clickSound');
    const errorSound = document.getElementById('errorSound');

    // Function to convert a number to binary digits
    function getBinaryDigits(dividend) {
        const binaryDigits = [];
        while (dividend !== 0) {
            const quot = Math.floor(dividend / 2);
            const remainder = dividend % 2;
            binaryDigits.push(remainder);
            dividend = quot;
        }
        binaryDigits.reverse();
        return binaryDigits;
    }

    // Prepare the cards for the game
    const cards = Array.from({ length: 6 }, () => []);
    const firstSixPowerOfTwo = [1, 2, 4, 8, 16, 32];

    for (let num = 1; num < 64; num++) {
        const binDig = getBinaryDigits(num);
        for (let i = 0; i < binDig.length; i++) {
            const powerOfTwo = 2 ** ((binDig.length - 1) - i);
            if (binDig[i] * powerOfTwo && firstSixPowerOfTwo.includes(powerOfTwo)) {
                cards[(binDig.length - 1) - i].push(num);
            }
        }
    }

    let currentCardIndex = 0;
    let guessedNumber = 0;

    // Function to display the current card
    function displayCurrentCard() {
        cardsContainer.innerHTML = '';
        if (currentCardIndex < cards.length) {
            const card = cards[currentCardIndex];
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = card.map(num => `<span>${num}</span>`).join(' ');
            cardsContainer.appendChild(cardDiv);
        } else {
            result.textContent = `The number in your mind is ${guessedNumber}`;
            result.classList.remove('hidden');
            guessContainer.classList.add('hidden');
            startBtn.classList.remove('hidden');
        }
    }

    // Function to start the game
    function startGame() {
        startBtn.classList.add('hidden');
        cardsContainer.classList.remove('hidden');
        guessContainer.classList.remove('hidden');
        currentCardIndex = 0;
        guessedNumber = 0;
        displayCurrentCard();
        clickSound.play();
    }

    // Function to handle the user's guesses
    function handleGuess(isYes) {
        clickSound.play();
        if (isYes) {
            guessedNumber += cards[currentCardIndex][0];
        }
        currentCardIndex++;
        displayCurrentCard();
    }

    startBtn.addEventListener('click', startGame);
    yesBtn.addEventListener('click', () => handleGuess(true));
    noBtn.addEventListener('click', () => handleGuess(false));
});
