import { ensureNumberInRange, rng } from "../utils";

export class WordleGame {
    private gameParameters: GameParameters = { maxNumberOfGuesses: 6, maxWordLength: 10, minWordLength: 3 };
    private _wordLength!: number;
    private _allWords: string[];
    private _possibleWords!: string[];
    private _theWord: string = "";
    private _gameWon: boolean = false;
    private _guessCount: number = 0;
    private _guesses: GuessResult[] = [];
    public set wordLength(length: number) {
        length = ensureNumberInRange(length, this.gameParameters.minWordLength, this.gameParameters.maxWordLength);
        this._wordLength = length;
        this._possibleWords = this.getWordsWithLength(length);
    }
    public get wordLength() {
        return this._wordLength;
    }
    public constructor(allWords: string[], length = 6) {
        this._allWords = allWords;
        this.wordLength = length;
    }
    public newGame() {
        this._theWord = this.getRandomWord();

        // Just double-checking
        if (this._theWord.length !== this.wordLength) {
            throw new Error(`Wrong Length. Chosen word ${this._theWord}, defined length: ${this.wordLength}. Make sure to always use setter "this.wordLength" instead of "this._wordLength".`);
        }

        this._guessCount = 0;
        this._gameWon = false;
    }
    public analyzeGuess(guess: string) {
        let guessResult: LetterResult[] = [];
        let guessTransformed: (string | undefined)[] = guess.split("");
        let targetWordTransformed: (string | undefined)[] = this._theWord.split("");
        // check for correct positions
        for (let i = 0; i < guessTransformed.length; i++) {
            if (guessTransformed[i] === targetWordTransformed[i]) {
                guessResult[i] = LetterResult.CorrectPosition;
                guessTransformed[i] = undefined;
                targetWordTransformed.splice(i, 1);
            }
        }

        // check for incorrect positions
        for (let i = 0; i < guessTransformed.length; i++) {
            const curGuessLetter = guessTransformed[i];
            if (curGuessLetter === undefined) {
                continue;
            }
            
            const indexOfLetter = targetWordTransformed.indexOf(curGuessLetter)
            if (indexOfLetter < 0) {
                guessTransformed[i] = undefined;
                continue;    
            }
            guessResult[i] = LetterResult.WrongPosition;
            targetWordTransformed.splice(i, 1);
        }

        this._guesses[this._guessCount - 1] = { guessResult: guessResult };
    }
    public submitGuess(guess: string): GuessFeedback {
        const validWord = this._possibleWords.includes(guess);
        if (!validWord) {
            return GuessFeedback.InvalidWord;
        }
        
        this._guessCount++;
        if (guess === this._theWord) {
            return GuessFeedback.GameWon;
        }
        if (this._guessCount >= this.gameParameters.maxNumberOfGuesses) {
            return GuessFeedback.GameOver;
        }

        this.analyzeGuess(guess);
        return GuessFeedback.Continuing;
    }
    private getRandomWord(): string {
        const index = rng(0, this._possibleWords.length - 1);
        return this._possibleWords[index];
    }
    public getWordsWithLength(length: number): string[] {
        return this._allWords.filter(element => element.length === length);
    }
}

