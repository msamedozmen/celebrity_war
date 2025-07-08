const celebrities = [
    {
        name: "Elon Musk",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop1%29.jpg",
        profession: "Entrepreneur",
        netWorth: 200000000000 // 200 Billion
    },
    {
        name: "Jeff Bezos",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Jeff_Bezos_in_2016.jpg",
        profession: "Businessman",
        netWorth: 180000000000 // 180 Billion
    },
    {
        name: "Taylor Swift",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Taylor_Swift_The_Eras_Tour.jpg",
        profession: "Singer-songwriter",
        netWorth: 1100000000 // 1.1 Billion
    },
    {
        name: "Bill Gates",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
        profession: "Software Developer, Philanthropist",
        netWorth: 130000000000 // 130 Billion
    },
    {
        name: "Oprah Winfrey",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Oprah_Winfrey_2014.jpg",
        profession: "Talk Show Host, Media Executive",
        netWorth: 2800000000 // 2.8 Billion
    },
    {
        name: "LeBron James",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/LeBron_James_in_2023.jpg",
        profession: "Basketball Player",
        netWorth: 1000000000 // 1 Billion
    },
    {
        name: "Rihanna",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Rihanna_at_Fenty_Beauty_launch_in_Sydney_%282019%29_%28cropped%29.jpg",
        profession: "Singer, Entrepreneur",
        netWorth: 1400000000 // 1.4 Billion
    },
    {
        name: "Jay-Z",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Jay-Z_2022_pic_by_Tobin_Rubin.jpg/800px-Jay-Z_2022_pic_by_Tobin_Rubin.jpg",
        profession: "Rapper, Entrepreneur",
        netWorth: 2500000000 // 2.5 Billion
    },
    {
        name: "Kim Kardashian",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Kim_Kardashian_2011.jpg",
        profession: "Reality TV Star, Entrepreneur",
        netWorth: 1700000000 // 1.7 Billion
    },
        {
        name: "Kim Kardashian",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Kim_Kardashian_2011.jpg",
        profession: "Reality TV Star, Entrepreneur",
        netWorth: 1700000000 // 1.7 Billion
    },

    {
        name: "Tom Cruise",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Tom_Cruise_by_Gage_Skidmore.jpg",
        profession: "Actor",
        netWorth: 600000000 // 600 Million
    },
    {
        name: "Beyoncé",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Beyonce_at_The_Lion_King_premiere.png/800px-Beyonce_at_The_Lion_King_premiere.png",
        profession: "Singer-songwriter",
        netWorth: 540000000 // 540 Million
    },
    {
        name: "Dwayne 'The Rock' Johnson",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Dwayne_Johnson_2014.jpg",
        profession: "Actor, Wrestler",
        netWorth: 800000000 // 800 Million
    },
    {
        name: "George Lucas",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/George_Lucas_2011.jpg/800px-George_Lucas_2011.jpg",
        profession: "Filmmaker",
        netWorth: 5500000000 // 5.5 Billion
    },
    {
        name: "Michael Jordan",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Michael_Jordan_in_2014.jpg",
        profession: "Former Basketball Player, Businessman",
        netWorth: 3000000000 // 3 Billion
    },
    {
        name: "J.K. Rowling",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/J.K._Rowling_2010.jpg/800px-J.K._Rowling_2010.jpg",
        profession: "Author",
        netWorth: 1200000000 // 1.2 Billion
    }
];

let score = 0;
let lives = 3;
let currentCelebs = [];

const scoreDisplay = document.getElementById('score');
const livesDisplay = document.querySelector('.lives');
const cardLeft = document.getElementById('card-left');
const cardRight = document.getElementById('card-right');
const feedbackDisplay = document.getElementById('feedback');
// const guessLeftBtn = document.getElementById('guess-left'); // REMOVED
// const guessRightBtn = document.getElementById('guess-right'); // REMOVED
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreDisplay = document.getElementById('finalScore');
const restartGameBtn = document.getElementById('restartGame');

// Helper to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Update UI for score and lives
function updateUI() {
    scoreDisplay.textContent = score;
    const heartIcons = livesDisplay.querySelectorAll('.fas.fa-heart');
    heartIcons.forEach((heart, index) => {
        if (index < lives) {
            heart.classList.remove('lost');
        } else {
            heart.classList.add('lost');
        }
    });
}

// Get two random, distinct celebrities
function getRandomCelebs() {
    let index1 = Math.floor(Math.random() * celebrities.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * celebrities.length);
    } while (index1 === index2);

    return [celebrities[index1], celebrities[index2]];
}
function setEqualCardHeights() {
    const leftCard = document.getElementById('card-left');
    const rightCard = document.getElementById('card-right');

    leftCard.style.height = 'auto';
    rightCard.style.height = 'auto';

    const maxHeight = Math.max(leftCard.offsetHeight, rightCard.offsetHeight);

    leftCard.style.height = maxHeight + 'px';
    rightCard.style.height = maxHeight + 'px';
}


// Load celebrities into cards with transition
function loadCards() {
    currentCelebs = getRandomCelebs();

    // Add 'entering' class to start transition
    cardLeft.classList.add('entering');
    cardRight.classList.add('entering');
    feedbackDisplay.classList.remove('show', 'correct', 'incorrect');

    // Remove visible net worth classes from previous round
    cardLeft.querySelector('.net-worth').classList.remove('visible', 'correct', 'incorrect');
    cardRight.querySelector('.net-worth').classList.remove('visible', 'correct', 'incorrect');

    // Remove disabled class to enable clicking
    cardLeft.classList.remove('disabled');
    cardRight.classList.remove('disabled');

    setTimeout(() => {
        // Update card content
        updateCardContent(cardLeft, currentCelebs[0]);
        updateCardContent(cardRight, currentCelebs[1]);

        // Trigger active class for transition
        cardLeft.classList.add('active');
        cardRight.classList.add('active');

        // Remove 'entering' class after content update (for new card transition)
        cardLeft.classList.remove('entering');
        cardRight.classList.remove('entering');
        setEqualCardHeights();
    }, 500); // Allow time for previous card exit transition if any
}

function updateCardContent(cardElement, celebData) {
    cardElement.querySelector('.celebrity-img').src = celebData.image;
    cardElement.querySelector('.celebrity-img').alt = celebData.name;
    cardElement.querySelector('.celebrity-name').textContent = celebData.name;
    cardElement.querySelector('.celebrity-profession').textContent = celebData.profession;
    cardElement.querySelector('.worth-value').textContent = formatCurrency(celebData.netWorth);
    cardElement.querySelector('.net-worth').classList.add('hidden'); // Ensure hidden initially
}


// Reveal net worth and highlight winner
function revealNetWorth(isCorrectGuess, playerChoice) {
    const [celeb1, celeb2] = currentCelebs;
    const worthLeft = cardLeft.querySelector('.net-worth');
    const worthRight = cardRight.querySelector('.net-worth');

    worthLeft.classList.remove('hidden');
    worthRight.classList.remove('hidden');

    worthLeft.classList.add('visible');
    worthRight.classList.add('visible');

    // Determine richer celeb and apply highlight
    if (celeb1.netWorth > celeb2.netWorth) {
        worthLeft.classList.add('correct');
        worthRight.classList.add('incorrect');
    } else if (celeb2.netWorth > celeb1.netWorth) {
        worthRight.classList.add('correct');
        worthLeft.classList.add('incorrect');
    }

    // Disable card clicks after choice
    cardLeft.classList.add('disabled');
    cardRight.classList.add('disabled');


    setTimeout(() => {
        if (isCorrectGuess) {
            feedbackDisplay.textContent = "Correct! +100 points!";
            feedbackDisplay.classList.add('correct', 'show');
        } else {
            feedbackDisplay.textContent = "Incorrect! You lost a life.";
            feedbackDisplay.classList.add('incorrect', 'show');
        }
    }, 800); // Give time for worth to become visible

    setTimeout(() => {
        if (lives > 0) {
            loadCards(); // Load new cards after a short delay
        } else {
            showGameOverScreen();
        }
    }, 2500); // Delay before loading new cards or showing game over
}

// Handle user guess
function launchConfetti() {
    confetti({
        particleCount: 500,
        spread: 150,
        origin: { y: 0.6 },
        colors: [
            '#6a0dad',  
            '#ffae00',  
            '#007bff',  
            '#28a745',  
            '#dc3545'   
        ]

    });
}
function handleGuess(chosenCardId) {
    if (cardLeft.classList.contains('disabled') || cardRight.classList.contains('disabled')) {
        return;
    }

    const [celeb1, celeb2] = currentCelebs;
    let isCorrect;
    let selectedCard = document.getElementById(chosenCardId);

    if (chosenCardId === 'card-left') {
        isCorrect = celeb1.netWorth >= celeb2.netWorth;
    } else {
        isCorrect = celeb2.netWorth >= celeb1.netWorth;
    }

    if (isCorrect) {
        score += 100;
        launchConfetti(); 
    } else {
        lives--;
        selectedCard.classList.add("shake");
        setTimeout(() => {
            selectedCard.classList.remove("shake");
        }, 500);
    }
    updateUI();
    revealNetWorth(isCorrect, chosenCardId);
}

// Show game over screen
function showGameOverScreen() {
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.add('active');
}

// Restart game
function restartGame() {
    score = 0;
    lives = 3;
    updateUI();
    gameOverScreen.classList.remove('active');
    loadCards();
}

// Event Listeners
cardLeft.addEventListener('click', () => handleGuess('card-left'));
cardRight.addEventListener('click', () => handleGuess('card-right'));
restartGameBtn.addEventListener('click', restartGame);

// Initialize game
updateUI();
loadCards();