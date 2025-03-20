import arrayOfWords from "an-array-of-english-words";
import { WordleGame } from "./wordle-game/wordle-game";
import * as constants from "./const";
import { GameStatus } from "./wordle-game/types";


let wordleGame: WordleGame;
let wordleGrid: HTMLElement;

let testTargetWord = "mamma";
let testGuesses = ["steam", "manic", "marly", "imams", "mamma"];

document.addEventListener("DOMContentLoaded", initialize);
function initialize() {
    initializeVariables();
    registerEvents();
    newGame();
}
function initializeVariables() {
    wordleGrid = document.getElementById(constants.WORDLE_GRID_ID)!;
    wordleGame = new WordleGame(arrayOfWords);
    wordleGame.wordLength = getSelectedLength(<HTMLSelectElement>(document.getElementById(constants.WORD_LENGTH_SELECTION_ID)));
}
function registerEvents() {
    document.getElementById("test")?.addEventListener("click", test);
    (document.getElementById(constants.WORD_LENGTH_SELECTION_ID))?.addEventListener("change", updateSelectedLength);
    document.getElementById("btnNewGame")?.addEventListener("click", newGame);

}
function newGame() {
    if (wordleGame.guessCount > 0 && wordleGame.gameStatus === GameStatus.GameOngoing) {
        document.getElementById("wordleFeedback")!.innerHTML = "Give Up before starting a new game";
        return;
    }
    prepareGrid(wordleGame.wordLength, wordleGame.gameParameters.maxNumberOfGuesses);
    wordleGame.newGame();
}
function removeGrid() {
    while (wordleGrid.firstChild) {
        wordleGrid.removeChild(wordleGrid.firstChild);
    }
}
function prepareGrid(length: number, guesses: number) {
    removeGrid();
    
    for (let row = 0; row < guesses; row++) {
        const row = document.createElement("div");
        row.classList.add("gridRow");

        for (let letter = 0; letter < length; letter++) {
            const box = document.createElement("div");
            const input = document.createElement("input");
            box.classList.add("cell");
            input.setAttribute("type", "text");
            input.setAttribute("maxLength", "1");
            box.appendChild(input);
            row.appendChild(box);
        }

        wordleGrid.appendChild(row);
    }
}
function getSelectedLength(selectElement: HTMLSelectElement): number {
    const selection: string = selectElement.value;
    return Number(selection);
}
function updateSelectedLength(this: HTMLElement) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>this;
    wordleGame.wordLength = getSelectedLength(selectElement);
}
function test() {
    console.log("selected Length: " + wordleGame.wordLength);
}


