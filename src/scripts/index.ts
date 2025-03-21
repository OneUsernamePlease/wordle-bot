import arrayOfWords from "an-array-of-english-words";
import { WordleGame } from "./wordle-game/wordle-game";
import * as constants from "./const";
import { GuessFeedback, GuessResult } from "./wordle-game/types";
import { WordleUiController } from "./wordle-game/wordle-ui-controller";

let wordleGame: WordleGame;
let wordleUi: WordleUiController;

document.addEventListener("DOMContentLoaded", initialize);
function initialize() {
    initializeVariables();
    registerEvents();
    newGame();
    document.removeEventListener("DOMContentLoaded", initialize);
}
function initializeVariables() {
    wordleUi = new WordleUiController(constants.WORDLE_GRID_ID);
    wordleGame = new WordleGame(arrayOfWords);
    wordleGame.wordLength = getSelectedLength(<HTMLSelectElement>(document.getElementById(constants.SELECT_WORDLE_LENGTH_ID)));
}
function registerEvents() {
    document.getElementById("test")?.addEventListener("click", test);
    document.getElementById(constants.SELECT_WORDLE_LENGTH_ID)?.addEventListener("change", selectLengthChanged);
    document.getElementById(constants.BTN_GUESS_ID)?.addEventListener("click", guessClicked);
    document.getElementById(constants.BTN_GIVE_UP_ID)?.addEventListener("click", giveUpClicked);
    document.getElementById(constants.WORDLE_GRID_ID)?.addEventListener("keydown", wordleGridKeyDown)

}
function guessClicked(this: HTMLElement, ev: MouseEvent) {
    const guessNumber = wordleGame.guessCount;
    const guess = wordleUi.getWordFromGrid(guessNumber);
    if (guess.length !== wordleGame.wordLength) {
        return;
    }

    const guessResult: GuessResult = wordleGame.submitGuess(guess);
    if (guessResult.guessFeedback === GuessFeedback.GuessNotInWordList) {
        return;
    }

    wordleUi.colorRow(guessNumber, guessResult);
}
function giveUpClicked(this: HTMLElement, ev: MouseEvent) {
    alert("the solution was: " + wordleGame.solution);
    newGame();
}
function wordleGridKeyDown(this: HTMLElement, ev: KeyboardEvent) {
    console.log("key down: " + ev.key);
}
function selectLengthChanged(this: HTMLElement) {
    const selectElement: HTMLSelectElement = <HTMLSelectElement>this;
    wordleGame.wordLength = getSelectedLength(selectElement);
}
function newGame() {
    wordleUi.prepareGrid(wordleGame.wordLength, wordleGame.gameParameters.maxNumberOfGuesses);
    wordleGame.newGame();
}
function getSelectedLength(selectElement: HTMLSelectElement): number {
    const selection: string = selectElement.value;
    return Number(selection);
}
function test() {
    console.log("selected Length: " + wordleGame.wordLength);
}


