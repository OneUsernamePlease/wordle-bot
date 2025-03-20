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
    wordleGame.newGame();
}
function removeGrid() {
    while (wordleGrid.firstChild) {
        wordleGrid.removeChild(wordleGrid.firstChild);
    }
}
function prepareGrid(length: number, guesses: number) {
    
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


