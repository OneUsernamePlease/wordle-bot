enum GuessFeedback {
    InvalidWord = -1,
    GameOver = 0,
    GameWon = 1,
    Continuing = 2
}
enum LetterResult {
    CorrectPosition = 1,
    WrongPosition = 2,
    DoesNotOccur = 3
}
interface GuessResult {
    guessResult: (LetterResult | undefined)[];
}
interface GameParameters {
    maxNumberOfGuesses: number;
    maxWordLength: number;
    minWordLength: number;
    //dictionary: ?
}