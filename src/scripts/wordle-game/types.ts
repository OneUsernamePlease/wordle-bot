export enum GameStatus {
    GameOver = -1,
    GameOngoing = 0,
    GameWon = 1
}
export enum GuessFeedback {
    InvalidWord = -1,
    GameOver = 0,
    GameWon = 1,
    Continuing = 2
}
export enum LetterResult {
    CorrectPosition = 1,
    WrongPosition = 2,
    DoesNotOccur = 3
}
export interface GuessResult {
    guessResult: (LetterResult | undefined)[];
}
export interface GameParameters {
    maxNumberOfGuesses: number;
    maxWordLength: number;
    minWordLength: number;
    //dictionary: ?
}