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


const maxGuesses = 5

/*---------- Variables (state) ---------*/
let gameState
let userGuesses = []
let feedback = []
let targetWord
/*----- Cached Element References  -----*/
const userInputField = document.querySelector('#user-input');
const submitButton = document.querySelector('#submit-button');
const feedbackDisplay = document.querySelector('#feedback-display');
const messageDisplay = document.querySelector('#message-display');


/*-------------- Functions -------------*/
function initGame() {
    gameState = 'playing'
    userGuesses = []
    feedback = []
    targetWord = words[Math.floor(math.random() * words.length)]
    render()
}
/*----------- Event Listeners ----------*/

