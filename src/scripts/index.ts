import arrayOfWords from "an-array-of-english-words";
import { WordleGame } from "./wordle-game/wordle-game";
import * as constants from "./const";
import { GameStatus, GuessFeedback, GuessResult } from "./wordle-game/types";
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
    document.getElementById(constants.BTN_NEW_GAME_ID)?.addEventListener("click", newGameClicked);
    document.getElementById(constants.WORDLE_GRID_ID)?.addEventListener("keyup", wordleGridKeyUp); // change to beforeinput
    document.getElementById(constants.WORDLE_GRID_ID)?.addEventListener("focusin", wordleGridFocusIn);

}
function guessClicked(this: HTMLElement, ev: MouseEvent) {
    makeGuess();
}
function giveUpClicked(this: HTMLElement, ev: MouseEvent) {
    alert("the solution was: " + wordleGame.solution);
    document.getElementById("wordleFeedback")!.innerHTML = "";
    newGame();
}
function newGameClicked() {
    if (wordleGame.guessCount > 0 && wordleGame.gameStatus === GameStatus.GameOngoing) {
        document.getElementById("wordleFeedback")!.innerHTML = "Give Up before starting a new game";
        return;
    }
    newGame();
}
function wordleGridKeyUp(this: HTMLElement, ev: KeyboardEvent) {
    const key = ev.key.toLowerCase();
    const isLetter = WordleGame.symbolAllowed(key)
    const isActionKey = WordleGame.isRelevantActionKey(key)
    if (!isLetter && !isActionKey) {
        return;
    }
    const inputElement = <HTMLInputElement>ev.target;
    const currentCell = inputElement.parentElement!;
    const currentRow = currentCell.parentElement!;
    const allCellsInRow = Array.from(currentRow.querySelectorAll(".cell"));
    const currentCellIndex = allCellsInRow.indexOf(currentCell);

    if (isActionKey) {
        switch (key) {
            case "enter":
                makeGuess();
                break;
            case "delete":
            
                break;
            case "backspace":
            
                break;
            case "arrowleft":
            
                break;
            case "arrowright":
            
                break;
    
            default:
                break;
        }
    } else if (isLetter) {

    }
    
    //if (currentCellIndex >= wordleGame.wordLength - 1) {
    //    // we are in the last cell in the current row
    //    return;
    //    // todo: if there are empty cells in the row, jump into the leftmost
    //}
    const nextCell = allCellsInRow[currentCellIndex + 1];
    if (!nextCell) {
        return;
    }
    const nextCellInput = nextCell.querySelector("input");
    nextCellInput?.focus();

}
function wordleGridFocusIn(this: HTMLElement, ev: FocusEvent) {
    const inputElement = <HTMLInputElement>ev.target;
    const inputValueLength = inputElement.value.length;
    inputElement.setSelectionRange(inputValueLength, inputValueLength);
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
function makeGuess() {
    const guessIndex = wordleGame.guessCount;
    const guess = wordleUi.getWordFromGrid(guessIndex);
    if (guess.length !== wordleGame.wordLength) {
        return;
    }

    const guessResult: GuessResult = wordleGame.submitGuess(guess);
    if (guessResult.guessFeedback === GuessFeedback.GuessNotInWordList) {
        return;
    }

    wordleUi.colorRow(guessIndex, guessResult);
    wordleUi.disableRowInputs(guessIndex);
    if (guessIndex + 1 >= wordleGame.gameParameters.maxNumberOfGuesses) {
        (<HTMLElement>document.activeElement).blur();
        return;
    }
    wordleUi.enableRowInputs(guessIndex + 1);
    setFocus(0, guessIndex + 1);
}
function setFocus(letterIndex: number, row?: number) {
    if (row === undefined) {
        row = wordleGame.guessCount;
    }
    const rowElement = wordleUi.wordleGrid.querySelectorAll(".gridRow")[row];
    const inputElement = rowElement.querySelectorAll(".cell")[letterIndex].querySelector("input")!;
    inputElement.focus();
}
function test() {
    console.log("selected Length: " + wordleGame.wordLength);
}


