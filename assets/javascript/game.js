// game begins
// computer chooses value of the word
// computer generates blanks accordingly to word length
// user chooses letter (a-z) of choice 
// computer generates a number of chances to guess letter for user
// computer determines status of letter choice
// user has 6 chances to guess correct letter
// if user loses a losing image displays
// users choice of letter was already taken
// error message
// user is notified of no penalty
// users choice of letter isnt part of the word
// user receives penalty for choice of letter
// users choice of letter is in the word
// user is notified of correct choice of letter and display is updated
// if user guessed all the correct letters of the word, user wins game 
// computer displays winning image
// computer ends game 
// computer adds a win to win counter score
// game restarts again for user

var words = ["playstation", "microsoft", "nintendo", "sega", "xbox", "sony", "switch", "pc", "vr", "streaming"];

const maxTries = 11;

var guessedLetters = [];
var guessingWord = [];
var remainingGuesses = maxTries;
var gameStarts = true;
var gameFinished = false;
var wins = 0;

var wordSelected = words[Math.floor(Math.random() * (words.length))];
for (var i = 0; i < wordSelected.length; i++) {
    guessingWord.push("_");
}
function resetGame() {
    remainingGuesses = maxTries;
    gameStarts = false;

    wordSelected = words[Math.floor(Math.random() * (words.length))];

    guessedLetters = [];
    guessingWord = [];

    document.getElementById("wordGuessGameImage").src = "";

    for (var i = 0; i < wordSelected.length; i++) {
        guessingWord.push("_");
    }

    document.getElementById("pressTryAgain").style.cssText = "display: none";
    document.getElementById("losing-image").style.cssText = "display: none";
    document.getElementById("winning-image").style.cssText = "display: none";

    updateDisplay();
};

function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    document.getElementById("currentWord").innerText += guessingWord;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};
function processLoss() {
    document.getElementById("losing-image").style.cssText = "display: block";
    document.getElementById("pressTryAgain").style.cssText = "display :block";
    gameFinished = true;
};
function updateWordGuessGameImage() {
    document.getElementById("wordGuessGameImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".jpg";
};

document.onkeydown = function (event) {
    if (gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toLowerCase());
        }
    }
};

function guess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarts) {
            gameStarts = true;
        }
        if (wordSelected.indexOf(letter) != -1) {
            processGuess(letter);
            guessedLetters.push(letter);
            remainingGuesses -= 1;
        }
        else if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            remainingGuesses -= 1;
        }
        if (remainingGuesses == 0) { processLoss() }
        var winner = true;
        for (var i = 0; i < wordSelected.length; i++) {
            if (wordSelected[i] != guessingWord[i]) {
                winner = false;
            }
        }
        if (winner) processWin();
        updateDisplay();
    }
};

function processGuess(letter) {
    for (var i = 0; i < wordSelected.length; i++) {
        if (wordSelected[i] === letter) {
            guessingWord[i] = letter;
        }
    }
};

function processWin() {
    document.getElementById("winning-image").style.cssText = "display: block";
    document.getElementById("pressTryAgain").style.cssText = "display: block";
    wins++;
    gameFinished = true;
};


updateDisplay();