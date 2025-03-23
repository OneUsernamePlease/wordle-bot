import { GuessResult, LetterResult } from "./types";

export class WordleUiController {
    private _wordleGrid: HTMLElement;
    get wordleGrid() {
        return this._wordleGrid;
    }
    get rows() {
        return this._wordleGrid.querySelectorAll(".gridRow");
    }
    constructor(wordleGridId: string) {
        this._wordleGrid = document.getElementById(wordleGridId)!;
    }
    public getWordFromGrid(row: number): string {
        const gridChildren = this._wordleGrid.children;
        const numberOfRows = gridChildren.length;
        if (row >= numberOfRows) {
            throw new Error(`Error. Trying to retrieve word from row[${row + 1}], grid only has ${numberOfRows} rows.`);
        }
        const targetRow = gridChildren[row];
        const inputs = targetRow.querySelectorAll("input");
        const word = Array.from(inputs).map(input => input.value).join("");

        return word;
    }
    public colorRow(row: number, guessResult: GuessResult) {
        const letterResult = guessResult.letterResults;
        if (!letterResult) {
            return;
        }
        const rowElement = this._wordleGrid.children[row];
        const letterBoxElements = rowElement.querySelectorAll(".cell");
        for (let i = 0; i < letterResult.length; i++) {
            switch (letterResult[i]) {
                case LetterResult.CorrectPosition:
                    letterBoxElements[i].classList.add("correctPosition");
                    break;
            
                case LetterResult.IncorrectPosition:
                    letterBoxElements[i].classList.add("incorrectPosition");
                    break;
            
                case LetterResult.DoesNotOccur:
                    letterBoxElements[i].classList.add("doesNotOccur");
                    break;
            
                default:
                    break;
            }
            
        }
    }
    public enableRowInputs(rowIndex: number) {
        const rowElement = this.rows[rowIndex];
        const inputs = rowElement.querySelectorAll("input");
        inputs.forEach(input => {
            input.disabled = false;
        });
    }
    public disableRowInputs(rowIndex: number) {
        const rowElement = this.rows[rowIndex];
        const inputs = rowElement.querySelectorAll("input");
        inputs.forEach(input => {
            input.disabled = true;
        });
    }
    public prepareGrid(length: number, guesses: number) {
        this.removeGrid();
        
        for (let row = 0; row < guesses; row++) {
            const row = document.createElement("div");
            row.classList.add("gridRow");
    
            for (let letter = 0; letter < length; letter++) {
                const box = document.createElement("div");
                const input = document.createElement("input");
                box.classList.add("cell");
                input.setAttribute("type", "text");
                input.setAttribute("maxLength", "1");
                input.disabled = true;
                box.appendChild(input);
                row.appendChild(box);
            }
    
            this.wordleGrid.appendChild(row);
        }

        this.enableRowInputs(0);
    }
    private removeGrid() {
        while (this.wordleGrid.firstChild) {
            this.wordleGrid.removeChild(this.wordleGrid.firstChild);
        }
    }
}