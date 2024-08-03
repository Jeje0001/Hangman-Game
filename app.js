// Select necessary DOM elements
const keyboard = document.querySelector(".keyboard");
const guesstext = document.querySelector(".incorrect b");
const worddisplay = document.querySelector(".worddisplay");
const hangman = document.querySelector(".mainbox img");
const playagain = document.querySelector("#play");

let current; // Current word to guess
let wrongguess = 0; // Number of wrong guesses
const maxguess = 6; // Maximum allowed wrong guesses
let correct = []; // Array to store correct guesses

let gamemodal = document.querySelector(".gamemodal");

// Function to reset the game state
const reset = () => {
    correct = [];
    wrongguess = 0;
    hangman.src = `images/hangman-${wrongguess}.svg`;
    guesstext.innerText = `${wrongguess} / ${maxguess}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);

    // Display empty letters for the current word
    worddisplay.innerHTML = current.split("").map(() => `<li class="letter"></li>`).join("");
    gamemodal.classList.remove("show");
}

// Function to get a random word and hint from the word list
const getrandom = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word, hint);
    current = word;
    document.querySelector(".hint").innerText = `Hint: ${hint}`;
    reset();
}

// Function to handle game over state
const gameover = (victory) => {
    setTimeout(() => {
        const modaltext = victory ? `You found the word:` : `The correct word was:`;
        if (gamemodal && gamemodal.querySelector("img")) {
            const imgElement = gamemodal.querySelector("img");
            const imagePath = `images/${victory ? "victory" : "lost"}.gif`;
            imgElement.src = imagePath;
            gamemodal.querySelector("h4").innerText = `${victory ? "Congrats" : "Gameover"}`;
            gamemodal.querySelector("p").innerHTML = `${modaltext} <b>${current}</b>`;
            gamemodal.classList.add("show");
        } else {
            console.error("Image element not found or gamemodal is undefined.");
        }
    }, 300);
}

// Initialize the game with a random word
getrandom();

// Function to handle letter button clicks
const initgame = (button, clickedletter) => {
    if (current.includes(clickedletter)) {
        [...current].forEach((letter, index) => {
            if (letter === clickedletter) {
                correct.push(letter);
                worddisplay.querySelectorAll("li")[index].innerText = letter;
                worddisplay.querySelectorAll("li")[index].classList.add("letter");
            }
        });
    } else {
        wrongguess += 1;
        hangman.src = `images/hangman-${wrongguess}.svg`;
    }
    button.disabled = true;
    guesstext.innerText = `${wrongguess} / ${maxguess}`;

    if (wrongguess == maxguess) {
        return gameover(false);
    }
    if (correct.length == current.length) {
        return gameover(true);
    }
}

// Create letter buttons and add event listeners
for (let index = 97; index < 123; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    keyboard.appendChild(button);
    button.addEventListener("click", e => initgame(e.target, String.fromCharCode(index)));
}

// Add event listener to the play again button
playagain.addEventListener("click", getrandom);
