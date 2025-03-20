import { ensureNumberInRange, rng } from "../utils";
import { GameParameters, GameStatus, GuessResult, LetterResult } from "./types";


export class WordleGame {
    private gameParameters: GameParameters = { maxNumberOfGuesses: 6, maxWordLength: 10, minWordLength: 3 };
    private _wordLength!: number;
    private _allWords: string[];
    private _possibleWords!: string[];
    private _theWord: string = "";
    private _gameStatus: GameStatus = GameStatus.GameOngoing;
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
    public get guessCount() {
        return this._guessCount;
    }
    public get gameStatus() {
        return this._gameStatus;
    }
    public constructor(allWords: string[], length = 5) {
        this._allWords = allWords;
        this.wordLength = length;
    }
    public newGame() {
        this._theWord = this.getRandomWord();

        // Just double-checking
        if (this._theWord.length !== this.wordLength) {
            throw new Error(`Wrong Length. Chosen word ${this._theWord}, defined length: ${this.wordLength}. Make sure to always use setter "this.wordLength" instead of "this._wordLength".`);
        }

        this._guesses = [];
        this._guessCount = 0;
        this._gameStatus = GameStatus.GameOngoing;
    }
    private analyzeLetters(guess: string): GuessResult {
        let guessArray = Array.from(guess);
        let solutionArray = Array.from(this._theWord);
        let guessResult: LetterResult[] = [];
        
        // check for correct positions
        for (let i = 0; i < guessArray.length; i++) {
            if (guessArray[i] === solutionArray[i]) {
                guessArray[i] = "";
                solutionArray[i] = "";
                guessResult[i] = LetterResult.CorrectPosition;
            }
        }

        // check for incorrect position and no occurrence
        for (let i = 0; i < guessArray.length; i++) {
            if (guessArray[i].length === 0) {
                continue;
            }
            const letterIndexInSolution = solutionArray.indexOf(guessArray[i])
            if (letterIndexInSolution >= 0) {
                solutionArray[letterIndexInSolution] = "";
                guessResult[i] = LetterResult.WrongPosition;
            } else {
                guessResult[i] = LetterResult.DoesNotOccur;
            }
        }

        return { guessResult: guessResult };
    }
    private getRandomWord(): string {
        const index = rng(0, this._possibleWords.length - 1);
        return this._possibleWords[index];
    }
    private getWordsWithLength(length: number): string[] {
        return this._allWords.filter(element => element.length === length);
    }
}

