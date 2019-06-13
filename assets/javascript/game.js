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
console.log(words)
var words = ["playstation", "microsoft", "nintendo", "sega", "xbox", "sony", "switch", "pc", "vr", "streaming"];

const maxTries = 6;

var guessedLetters = [];
var wordList;
var guessingWord = [];
var remainingGuesses = 0;
var gameStarts = false;
var gameFinished = false;
var wins = 0;

function resetGame() {
    remainingGuesses = maxTries;
    gameStarts = false;

    wordList = Math.floor(Math.random() * (wordSelected.length));

    guessedLetters = [];
    guessingWord = [];

    document.getElementById("wordGuessGameImage").src = "";

    for (var i = 0; i < wordSelected[wordList].length; i++) {
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
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if (remainingGuesses <= 0) {
        document.getElementById("losing-image").style.cssText = "display: block";
        document.getElementById("pressTryAgain").style.cssText = "display :block";
        gameFinished = true;
    }
};

function updateWordGuessGameImage() {
    document.getElementById("wordGuessGameImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".jpg";
};

document.onkeydown = function(event) {
    if(gameFinished)  {
        resetGame();
        gameFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toLowerCase());
        }
    }
};

function guess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarts) {
        gameStarts = true;
    }

    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        processGuess(letter);
    }


}

updateDisplay();
processWin();
};

function processGuess(letter) {
    var positions = [];
    for (var i = 0; i < wordSelected[wordList].length; i++) {
        if(wordSelected[wordList][i] === letter) {
            positions.push(i);
        }
        }

        if (positions.length <= 0) {
            remainingGuesses--;
            updateWordGuessGameImage();
        } else {

            for(var i = 0; i < positions.length; i++) {
                guessingWord[positions[i]] = letter;
            }
        }
};

function processWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("winning-image").style.cssText = "display: block";
        document.getElementById("pressTryAgain").style.cssText = "display: block";
        wins++;
        gameFinished = true;
    }
};


updateDisplay();