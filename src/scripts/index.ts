import arrayOfWords from "an-array-of-english-words";
import { WordleGame } from "./wordle-game/wordle-game";
import * as constants from "./const";
import { GameStatus } from "./wordle-game/types";
import { WordleUiController } from "./wordle-game/wordle-ui-controller";


let wordleGame: WordleGame;
let wordleUi: WordleUiController;

let testTargetWord = "mamma";
let testGuesses = ["steam", "manic", "marly", "imams", "mamma"];

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
    document.getElementById(constants.BTN_NEW_GAME_ID)?.addEventListener("click", newGameClicked);
    document.getElementById(constants.BTN_GUESS_ID)?.addEventListener("click", guessClicked);
    document.getElementById(constants.BTN_GIVE_UP_ID)?.addEventListener("click", giveUpClicked);

}
function newGameClicked() {
    if (wordleGame.guessCount > 0 && wordleGame.gameStatus === GameStatus.GameOngoing) {
        document.getElementById("wordleFeedback")!.innerHTML = "Give Up before starting a new game";
        return;
    }
    newGame();
}
function guessClicked(this: HTMLElement, ev: MouseEvent) {
    throw new Error("Function not implemented.");
}
function giveUpClicked(this: HTMLElement, ev: MouseEvent) {
    throw new Error("Function not implemented.");
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


