import { ensureNumberInRange, rng } from "../utils";
import { GameParameters, GameStatus, GuessFeedback, GuessResult, LetterResult } from "./types";


export class WordleGame {
    private _gameParameters: GameParameters = { maxNumberOfGuesses: 6, maxWordLength: 10, minWordLength: 3 };
    private _wordLength!: number;
    private _allWords: string[];
    private _possibleWords!: string[];
    private _solution: string = "";
    private _gameStatus: GameStatus = GameStatus.GameOngoing;
    private _guessCount: number = 0;
    private _guesses: [][] = [];
    
    public set wordLength(length: number) {
        length = ensureNumberInRange(length, this._gameParameters.minWordLength, this._gameParameters.maxWordLength);
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
    public get gameParameters() {
        return this._gameParameters;
    }
    public constructor(allWords: string[], length = 5) {
        this._allWords = allWords;
        this.wordLength = length;
    }
    public newGame() {
        this._solution = this.getRandomWord();

        // Just double-checking
        if (this._solution.length !== this.wordLength) {
            throw new Error(`Wrong Length. Chosen word ${this._solution}, defined length: ${this.wordLength}. Make sure to always use setter "this.wordLength" instead of "this._wordLength".`);
        }
        
        this._guesses = [];
        this._guessCount = 0;
        this._gameStatus = GameStatus.GameOngoing;
    }
    private analyzeLetters(guess: string): LetterResult[] {
        let guessArray = Array.from(guess);
        let solutionArray = Array.from(this._solution);
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

        return guessResult;
    }
    public submitGuess(guess: string): GuessResult {
        guess = guess.toLowerCase();
        
        if (guess.length !== this.wordLength) {
            return { guessFeedback: GuessFeedback.IncorrectLength, letterResults: null, gameStatus: GameStatus.GameOngoing };
        }
        if (!this._possibleWords.includes(guess)) {
            return { guessFeedback: GuessFeedback.GuessNotInWordList, letterResults: null, gameStatus: GameStatus.GameOngoing };
        }

        return this.processGuess(guess);
    }
    private processGuess(guess: string): GuessResult {
        const letterResults = this.analyzeLetters(guess);
        let guessFeedback: GuessFeedback;
        let gameStatus: GameStatus = GameStatus.GameOngoing;
        
        this._guessCount++;
        if (guess === this._solution) {
            guessFeedback = GuessFeedback.CorrectGuess;
            gameStatus = GameStatus.GameWon;
        } else {
            guessFeedback = GuessFeedback.WrongGuess;
            if (this.guessCount >= this._gameParameters.maxNumberOfGuesses) {
                gameStatus = GameStatus.GameOver;
            }
        }
        return { guessFeedback: guessFeedback, letterResults: letterResults, gameStatus: gameStatus };
    }
    private getRandomWord(): string {
        const index = rng(0, this._possibleWords.length - 1);
        return this._possibleWords[index];
    }
    private getWordsWithLength(length: number): string[] {
        return this._allWords.filter(element => element.length === length);
    }
}

