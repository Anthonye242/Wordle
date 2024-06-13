// Array of possible words for the game
const words = ["APPLE", "CHAIR", "BAKER", "LUCKY", "BEACH", "HAPPY", "PIANO", "SMILE", "TIGER", "JUICE",
    "MUSIC", "GIANT", "CANDY", "DOLPH", "EAGLE", "FAIRY", "GOOSE", "HAPPY", "IGLOO", "JOKER",
    "KARMA", "LEMON", "MAGIC", "NIGHT", "OASIS", "PARTY", "QUEEN", "RADIO", "SUNNY", "TANGO",
    "UMBRA", "VAULT", "WATER", "XEROX", "YACHT", "ZEBRA", "ALARM", "BLINK", "CLOUD", "DIZZY",
    "EARTH", "FLAME", "GRAPE", "HONEY", "INBOX", "JELLY", "KIOSK", "LEASH", "MANGO", "NOVEL",
    "OPERA", "PEACH", "QUILT", "RULER", "SHADE", "TIARA", "UNITY", "VIOLA", "WHISK", "XENON",
    "YUMMY", "ZESTY", "ACTOR", "BENTO", "COMET", "DAISY", "EVOKE", "FLORA", "GAMER", "HEIST",
    "IMAGE", "JOUST", "KITTY", "LEASH", "MIRTH", "NOBLE", "OTTER", "PEACE", "QUEST", "ROVER",
    "SKATE", "THYME", "UPEND", "VIVID", "WALTZ", "XEROX", "YOUNG", "ZESTY", "AMPLE", "BOULE",
    "CHORD", "DANDY", "EPOCH", "FABLE", "GLAZE", "HALCY", "INLET", "JOUST", "KUDOS", "LATCH",
    "MERRY", "NOVEL", "ODOUR", "PIQUE", "QUELL", "REVEL", "SAVOR", "TULIP", "ULTRA", "VOCAL",
    "WALTZ", "XENON", "YIELD", "ZEBRA", "AMBER", "BLUSH", "CACAO", "DUSKY", "EXUDE", "FROST",
    "GLOBE", "HEAVE", "INLAY", "JELLY", "KNELL", "LURID", "MULCH", "NAVEL", "OGIVE", "PIQUE",
    "QUELL", "RUNIC", "SERGE", "TRUCE", "UMAMI", "VEXED", "WRYLY", "XENON", "YIELD", "ZESTY",
    "AMOUR", "BRAWN", "CLOVE", "DAISY", "ELOPE", "FERRY", "GRACE", "HOVEL", "IONIC", "JOUST",
    "KEBAB", "LUCID", "MERRY", "NADIR", "OGIVE", "PRISM", "QUASH", "RIVAL", "SCUBA", "TOKEN",
    "ULCER", "VYING", "WHARF", "XENON", "YOUTH", "ZIPPY", "AMUSE", "BLISS", "CLAMP", "DOZEN",
    "ELOPE", "FLINT", "GNARL", "HOVER", "IRATE", "JOKER", "KARMA", "LANCE", "MIRTH", "NAVEL",
    "ORBIT", "PLAID", "QUACK", "RHYME", "SCAMP", "TROLL", "UNZIP", "VOWEL", "WOVEN", "XEROX",
    "YIELD", "ZESTY", "ABIDE", "BLUSH", "CLAMP", "DANDY", "ELOPE", "FLINT", "GNASH", "HYDRA",
    "IONIC", "JAZZY", "KLUTZ", "LEMMA", "MODAL", "NEXUS", "OPTIC", "POUCH", "QUELL", "RHINO",
    "SNAIL", "TRYST", "ULCER", "VIVID", "WEAVE", "XENON", "YIELD", "ZESTY", "AGILE", "BLUSH",
    "CLAMP", "DOUSE", "ELUDE", "FJORD", "GLAZE", "HASTE", "IVORY", "JOULE", "KIOSK", "LEMON",
    "MIRTH", "NYMPH", "ORBIT", "PIQUE", "QUART", "RECUR", "SNARE", "TIARA", "ULCER", "VEXED",
    "WHIRL", "XENON", "YIELD", "ZEBRA", "AGLOW", "BLIMP", "CLAVE", "DUNCE", "ELOPE", "FLAIR",
    "GNOME", "HAZEL", "IONIC", "JOLLY", "KAYAK", "LEMMA", "MOIST", "NADIR", "OASIS", "PIANO",
    "QUASI", "REBEL", "SNEAK", "TROUT", "UNITY", "VOGUE", "WEDGE", "XENON", "YIELD", "ZEBRA",
    "ABIDE", "BLIMP", "CLAMP", "DRAPE", "ELOPE", "FLUKE", "GRAPE", "HEFTY", "IONIC", "JOUST",
    "KNACK", "LEMMA", "MERRY", "NUDGE", "ORBIT", "PLANK", "QUELL", "REBEL", "SNOOP", "TOAST",
    "ULTRA", "VIVID", "WITTY", "XENON", "YIELD", "ZEBRA", "ACORN", "BRAWL", "CLIMB", "DAISY",
    "ELBOW", "FLUKE", "GRAVY", "HUSHY", "IONIC", "JOUST", "KUDOS", "LASER", "MELON", "NOVEL",
    "OLIVE", "PLUSH", "QUERY", "SNEAK", "TRIPE", "ULTRA", "VIVID", "WRYLY", "XENON", "YIELD",
    "ZEBRA", "ADAPT", "BRISK", "CLAMP", "DAISY", "ELOPE", "FLUKE", "GRAIN", "HUSHY", "IONIC",
    "JOUST", "KAYAK", "LEMMA", "MERRY", "NUDGE", "OASIS", "PLAID", "QUELL", "REBEL"]

    const maxGuesses = 5; // Maximum number of guesses allowed

// Game state object
const state = {
    targetWord: words[Math.floor(Math.random() * words.length)], // Choose a random word for the player to guess
    grid: Array(5)
        .fill()
        .map(() => Array(5).fill('')), // Create a 5x5 grid filled with empty strings
    currentRow: 0, // Current row (guess) the player is on
    currentCol: 0, // Current column (letter) the player is on
}

/*----- Cached Element References  -----*/
const gameElement = document.querySelector('#game'); // Main game container
const grid = document.querySelector('.grid'); // Grid element
const keyboard = document.querySelector('.keyboard'); // Keyboard element
const feedbackElement = document.querySelector('#feedback'); // Element to display feedback

/*-------------- Functions -------------*/

// Render the on-screen keyboard
function renderKeyboard() {
    keyboard.innerHTML = ''; // Clear existing keyboard
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Create buttons for each letter
    for (let letter of alphabets) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', function() {
            handleInput(letter);
        });
        keyboard.appendChild(button);
    }

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', handleDelete);
    keyboard.appendChild(deleteBtn);
}

// Handle letter input (from keyboard or on-screen buttons)
function handleInput(letter) {
    if (state.currentCol < 5) { // Only add letter if not at end of word
        state.grid[state.currentRow][state.currentCol] = letter;
        state.currentCol++;
        updateGrid();
    }
}

// Handle deletion of a letter
function handleDelete() {
    if (state.currentCol > 0) { // Only delete if not at start of word
        state.currentCol--;
        state.grid[state.currentRow][state.currentCol] = '';
        updateGrid();
    }
}

// Handle word submission
function handleSubmit() {
    if (state.currentCol === 5) { // Only submit if word is complete
        const guess = state.grid[state.currentRow].join('');

        if (isWordValid(guess)) {
            revealWord(guess);
            console.log('Submitted word:', guess);

            const isWinner = state.targetWord === guess.toUpperCase();
            const isGameOver = state.currentRow === maxGuesses - 1;

            if (isWinner) {
                console.log('You won!');
                const winMessage = document.createElement('div');
                winMessage.textContent = 'Congratulations! You guessed the word correctly!';
                winMessage.classList.add('win-message');
                gameElement.appendChild(winMessage);
                showRestartButton();
            } else if (isGameOver) {
                console.log('Game over!');
                const loseMessage = document.createElement('div');
                loseMessage.textContent = `You lost! The word was ${state.targetWord}`;
                loseMessage.classList.add('lose-message');
                gameElement.appendChild(loseMessage);
                showRestartButton();
            } else {
                state.currentRow++;
                clearPreviousWord();
            }
        } else {
            console.log('Invalid word');
            showInvalidWordMessage(guess); // Show message for invalid word
            return;
        }
    }
}

// Function to display invalid word message
function showInvalidWordMessage(word) {
    const invalidMessage = document.createElement('div');
    invalidMessage.textContent = `"${word}" is not in the word list.`;
    invalidMessage.classList.add('invalid-message');
    gameElement.appendChild(invalidMessage);

    // Remove the message after a delay
    setTimeout(() => {
        invalidMessage.remove();
    }, 2000); // Message disappears after 2 seconds
}

// Handle keydown events for keyboard input
function handleKeydown(event) {
    const key = event.key.toUpperCase();

    if (key === 'ENTER') {
        handleSubmit();
    } else if (key === 'BACKSPACE') {
        handleDelete();
    } else if (/^[A-Z]$/.test(key)) { // Only handle letter keys
        handleInput(key);
    }
}

// Clear the current word to start the next guess
function clearPreviousWord() {
    state.grid[state.currentRow] = Array(5).fill('');
    state.currentCol = 0;
    updateGrid();
}

// Create a single box for the grid
function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

// Draw the entire 5x5 grid
function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }
    container.appendChild(grid);
}

// Update the grid display with current state
function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

// Check if a word is in the valid words list
function isWordValid(word) {
    return words.includes(word.toUpperCase());
}

// Count occurrences of a letter in a word
function occurrencesInWord(word, letter) {
    let result = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            result++;
        }
    }
    return result;
}

// Reveal the guessed word with correct/incorrect highlighting
function revealWord(guess) {
    const row = state.currentRow;
    const animationDuration = 500; // ms
    const incorrectLetters = []; // Store incorrect letters for feedback
    const targetWord = state.targetWord; // Target word is already in uppercase

    const guessWord = guess.toUpperCase(); // Convert user's guess to uppercase

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent.toUpperCase(); // Convert letter to uppercase

        setTimeout(() => {
            if (letter === targetWord[i]) {
                box.classList.add('right');
            } else if (targetWord.includes(letter)) {
                box.classList.add('wrong');
                incorrectLetters.push(letter); // Add incorrect letter to feedback
            } else {
                box.classList.add('empty');
            }

            box.classList.add('animated');
            box.style.animationDelay = `${(i * animationDuration) / 2}ms`;
        }, ((i + 1) * animationDuration) / 2);
    }

    // Display feedback for incorrect letters
    if (incorrectLetters.length > 0) {
        const feedback = `Incorrect letters for row ${row + 1}: ${incorrectLetters.join(', ')}`;
        feedbackElement.textContent = feedback;
    }
}

// Show the restart button after game over
function showRestartButton() {
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart-button');
    restartButton.addEventListener('click', resetGame);
    gameElement.appendChild(restartButton);
}

// Reset the game to initial state
function resetGame() {
    // Reset the game state
    state.targetWord = words[Math.floor(Math.random() * words.length)];
    state.grid = Array(5).fill().map(() => Array(5).fill(''));
    state.currentRow = 0;
    state.currentCol = 0;

    // Clear the game element
    gameElement.innerHTML = '';

    // Redraw the grid and keyboard
    drawGrid(gameElement);
    renderKeyboard();
    feedbackElement.textContent = '';

    console.log('New target word:', state.targetWord);
}

// Initialize the game
function startup() {
    const game = document.getElementById('game');
    drawGrid(game);
    renderKeyboard();
    console.log(state.targetWord)
}

/*----------- Event Listeners ----------*/
document.addEventListener('keydown', handleKeydown);

startup(); // Start the game