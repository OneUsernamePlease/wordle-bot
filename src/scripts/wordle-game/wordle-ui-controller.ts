export class WordleUiController {
    private _wordleGrid: HTMLElement;
    get wordleGrid() {
        return this._wordleGrid;
    }
    constructor(wordleGridId: string) {
        this._wordleGrid = document.getElementById(wordleGridId)!;
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
                box.appendChild(input);
                row.appendChild(box);
            }
    
            this.wordleGrid.appendChild(row);
        }
    }
    private removeGrid() {
        while (this.wordleGrid.firstChild) {
            this.wordleGrid.removeChild(this.wordleGrid.firstChild);
        }
    }
}