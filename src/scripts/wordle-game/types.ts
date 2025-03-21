export enum GameStatus {
    GameOver = -1,
    GameOngoing = 0,
    GameWon = 1
}
export enum GuessFeedback {
    GuessNotInWordList = -1,
    WrongGuess = 0,
    CorrectGuess = 1
}
export enum LetterResult {
    CorrectPosition = 1,
    IncorrectPosition = 2,
    DoesNotOccur = 3
}
export interface GuessResult {
    guessFeedback: GuessFeedback,
    letterResults: null | LetterResult[],
    gameStatus: GameStatus
}
export interface GameParameters {
    maxNumberOfGuesses: number;
    maxWordLength: number;
    minWordLength: number;
    //dictionary: ?
}