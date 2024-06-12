/*-------------- Constants -------------*/
const words = ["Apple", "Chair", "Baker", "Lucky", "Beach", "Happy", "Piano", "Smile", "Tiger", "Juice",
    "Music", "Giant", "Candy", "Dolph", "Eagle", "Fairy", "Goose", "Happy", "Igloo", "Joker",
    "Karma", "Lemon", "Magic", "Night", "Oasis", "Party", "Queen", "Radio", "Sunny", "Tango",
    "Umbra", "Vault", "Water", "Xerox", "Yacht", "Zebra", "Alarm", "Blink", "Cloud", "Dizzy",
    "Earth", "Flame", "Grape", "Honey", "Inbox", "Jelly", "Kiosk", "Leash", "Mango", "Novel",
    "Opera", "Peach", "Quilt", "Ruler", "Shade", "Tiara", "Unity", "Viola", "Whisk", "Xenon",
    "Yummy", "Zesty", "Actor", "Bento", "Comet", "Daisy", "Evoke", "Flora", "Gamer", "Heist",
    "Image", "Joust", "Kitty", "Leash", "Mirth", "Noble", "Otter", "Peace", "Quest", "Rover",
    "Skate", "Thyme", "Upend", "Vivid", "Waltz", "Xerox", "Young", "Zesty", "Ample", "Boule",
    "Chord", "Dandy", "Epoch", "Fable", "Glaze", "Halcy", "Inlet", "Joust", "Kudos", "Latch",
    "Merry", "Novel", "Odour", "Pique", "Quell", "Revel", "Savor", "Tulip", "Ultra", "Vocal",
    "Waltz", "Xenon", "Yield", "Zebra", "Amber", "Blush", "Cacao", "Dusky", "Exude", "Frost",
    "Globe", "Heave", "Inlay", "Jelly", "Knell", "Lurid", "Mulch", "Navel", "Ogive", "Pique",
    "Quell", "Runic", "Serge", "Truce", "Umami", "Vexed", "Wryly", "Xenon", "Yield", "Zesty",
    "Amour", "Brawn", "Clove", "Daisy", "Elope", "Ferry", "Grace", "Hovel", "Ionic", "Joust",
    "Kebab", "Lucid", "Merry", "Nadir", "Ogive", "Prism", "Quash", "Rival", "Scuba", "Token",
    "Ulcer", "Vying", "Wharf", "Xenon", "Youth", "Zippy", "Amuse", "Bliss", "Clamp", "Dozen",
    "Elope", "Flint", "Gnarl", "Hover", "Irate", "Joker", "Karma", "Lance", "Mirth", "Navel",
    "Orbit", "Plaid", "Quack", "Rhyme", "Scamp", "Troll", "Unzip", "Vowel", "Woven", "Xerox",
    "Yield", "Zesty", "Abide", "Blush", "Clamp", "Dandy", "Elope", "Flint", "Gnash", "Hydra",
    "Ionic", "Jazzy", "Klutz", "Lemma", "Modal", "Nexus", "Optic", "Pouch", "Quell", "Rhino",
    "Snail", "Tryst", "Ulcer", "Vivid", "Weave", "Xenon", "Yield", "Zesty", "Agile", "Blush",
    "Clamp", "Douse", "Elude", "Fjord", "Glaze", "Haste", "Ivory", "Joule", "Kiosk", "Lemon",
    "Mirth", "Nymph", "Orbit", "Pique", "Quart", "Recur", "Snare", "Tiara", "Ulcer", "Vexed",
    "Whirl", "Xenon", "Yield", "Zebra", "Aglow", "Blimp", "Clave", "Dunce", "Elope", "Flair",
    "Gnome", "Hazel", "Ionic", "Jolly", "Kayak", "Lemma", "Moist", "Nadir", "Oasis", "Piano",
    "Quasi", "Rebel", "Sneak", "Trout", "Unity", "Vogue", "Wedge", "Xenon", "Yield", "Zebra",
    "Abide", "Blimp", "Clamp", "Drape", "Elope", "Fluke", "Grape", "Hefty", "Ionic", "Joust",
    "Knack", "Lemma", "Merry", "Nudge", "Orbit", "Plank", "Quell", "Rebel", "Snoop", "Toast",
    "Ultra", "Vivid", "Witty", "Xenon", "Yield", "Zebra", "Acorn", "Brawl", "Climb", "Daisy",
    "Elbow", "Fluke", "Gravy", "Hushy", "Ionic", "Joust", "Kudos", "Laser", "Melon", "Novel",
    "Olive", "Plush", "Query", "Sneak", "Tripe", "Ultra", "Vivid", "Wryly", "Xenon", "Yield",
    "Zebra", "Adapt", "Brisk", "Clamp", "Daisy", "Elope", "Fluke", "Grain", "Hushy", "Ionic",
    "Joust", "Kayak", "Lemma", "Merry", "Nudge", "Oasis", "Plaid", "Quell", "Rebel", "Snoop",
    "Toast", "Ultra", "Vivid", "Wryly", "Xenon", "Yield", "Zebra", "Adore", "Blimp", "Clamp",
    "Daisy", "Elope", "Fluke", "Grape", "Hushy", "Ionic", "Joust", "Kudos", "Laser", "Melon",
    "Novel", "Olive", "Plush", "Query", "Sneak", "Tripe", "Ultra", "Vivid", "Wryly", "Xenon",
    "Yield", "Zebra", "Abide", "Blush", "Clamp", "Daisy", "Elope", "Fluke", "Grape", "Hushy"]

const maxGuesses = 5;
const state = {
    targetWord: words[Math.floor(Math.random() * words.length)], // Choose a random word for the player to guess
    grid: Array(5)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}
 /*----- Cached Element References  -----*/
 const gameElement = document.querySelector('#game');
 const grid = document.querySelector('.grid');
 const keyboard = document.querySelector('.keyboard');
 const feedbackElement = document.querySelector('#feedback');
 
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
    return words.includes(word.toUpperCase());
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

    const isWinner = targetWord === guessWord;
    const isGameOver = state.currentRow === maxGuesses - 1;

    if (isWinner) {
        console.log('You won!');
        const winMessage = document.createElement('div');
        winMessage.textContent = 'Congratulations! You guessed the word correctly!';
        winMessage.classList.add('win-message');
        gameElement.appendChild(winMessage);
    } else if (isGameOver) {
        console.log('Game over!');
    } else {
        state.currentRow++;
        clearPreviousWord();
    }
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