/*-------------- Constants -------------*/
const words = [
    "apple", "brave", "crane", "drape", "eagle", "flame", "grape", "haste", "inbox", "jolly",
    "knife", "lemon", "mango", "noble", "ocean", "plume", "query", "raven", "sable", "table",
    "union", "vivid", "whale", "xenon", "yeast", "zebra", "abide", "berry", "charm", "depot",
    "equip", "flare", "glide", "haunt", "input", "jumpy", "kneel", "lofty", "mirth", "nerdy",
    "optic", "prism", "quilt", "rider", "speak", "trump", "utter", "valid", "wrist", "xylol",
    "youth", "zonal", "adore", "blaze", "clamp", "dwell", "enjoy", "frost", "grasp", "hatch",
    "ivory", "jewel", "karma", "lyric", "music", "neigh", "olive", "plaid", "quill", "raise",
    "shady", "twist", "urban", "vigor", "weave", "xenon", "yacht", "zippy", "alert", "brisk",
    "cider", "drive", "easel", "fresh", "glint", "hinge", "itchy", "joint", "knack", "latch",
    "march", "notch", "orbit", "plead", "quite", "roast"
];
const maxGuesses = 5;
const state = {
    targetWord: words[Math.floor(Math.random() * words.length)], // Choose a random word for the player to guess
    grid: Array(5)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}
/*---------- Variables (state) ---------*/
let gameState;
let userGuesses = [];
let feedback = [];
let targetWord;

/*----- Cached Element References  -----*/
const gameElement = document.querySelector('#game');
const grid = document.querySelector('.grid');
const keyboard = document.querySelector('.keyboard');

/*-------------- Functions -------------*/
function renderKeyboard() {
    keyboard.innerHTML = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', function() {
            handleInput(letter);
        });
        keyboard.appendChild(button);
    }
}

function handleInput(letter) {
    if (state.currentCol < 5) {
        state.grid[state.currentRow][state.currentCol] = letter;
        state.currentCol++;
        updateGrid();
    }
}

function handleDelete() {
    if (state.currentCol > 0) {
        state.currentCol--;
        state.grid[state.currentRow][state.currentCol] = '';
        updateGrid();
    }
}

function handleSubmit() {
    if (state.currentCol === 5) {
        const guess = state.grid[state.currentRow].join('');

        if (isWordValid(guess)) {
            revealWord(guess);
            console.log('Submitted word:', guess);
        } else {
            console.log('Invalid word');
        }
    }
}

function handleKeydown(event) {
    const key = event.key.toUpperCase();

    if (key === 'ENTER') {
        handleSubmit();
    } else if (key === 'BACKSPACE') {
        handleDelete();
    } else if (/^[A-Z]$/.test(key)) {
        handleInput(key);
    }
}

function clearPreviousWord(state) {
    state.grid[state.currentRow] = Array(5).fill('');
    state.currentCol = 0;
    updateGrid();
}

function clearPreviousWord() {
    state.grid[state.currentRow] = Array(5).fill('');
    state.currentCol = 0;
    updateGrid();
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

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

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function isWordValid(word) {
    return words.includes(word.toLowerCase());
}

function occurrencesInWord(word, letter) {
    let result = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            result++;
        }
    }
    return result;
}

function positionOfOccurrence(word, letter, position) {
    let result = 0;
    for (let i = 0; i <= position; i++) {
        if (word[i] === letter) {
            result++;
        }
    }
    return result;
}

function revealWord(guess) {
    const row = state.currentRow;
    const animationDuration = 500; // ms
    const incorrectLetters = []; // Store incorrect letters for feedback

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.targetWord[i]) {
                box.classList.add('right');
            } else if (state.targetWord.includes(letter)) {
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
        feedback.push(`Incorrect letters for row ${row + 1}: ${incorrectLetters.join(', ')}`);
    }

    const isWinner = state.targetWord === guess;
    const isGameOver = state.currentRow === maxGuesses - 1; // Assuming the maximum number of guesses is 5

    if (isWinner) {
        console.log('You won!');
    } else if (isGameOver) {
        console.log('Game over!');
    } else {
        state.currentRow++;
    }

    userGuesses.push(guess);
}

  function startup() {
    const game = document.getElementById('game');
    drawGrid(game);
    renderKeyboard();
    console.log(state.targetWord)
}

/*----------- Event Listeners ----------*/
document.addEventListener('keydown', handleKeydown);

startup();
