import { useState, useCallback } from 'react';

interface Guess {
    word: string;
    similarity: number;
    reason: string;
    index: number;
}

export const useGuess = () => {
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [lastGuess, setLastGuess] = useState<Guess | null>(null);

    const addGuess = useCallback((word: string, similarity: number, reason: string) => {
        const existingGuessIndex = guesses.findIndex(guess => guess.word === word);

        if (existingGuessIndex !== -1) {
            const existingGuess = guesses[existingGuessIndex];
            setLastGuess(existingGuess);
        } else {
            const newGuess: Guess = {
                word,
                similarity,
                reason,
                index: guesses.length
            };
            setGuesses(prevGuesses => [...prevGuesses, newGuess]);
            setLastGuess(newGuess);
        }
    }, [guesses]);

    const getSortedGuesses = useCallback(() => {
        return guesses
            .filter(guess => guess !== lastGuess)
            .sort((a, b) => b.similarity - a.similarity);
    }, [guesses, lastGuess]);

    return {
        guesses,
        lastGuess,
        addGuess,
        getSortedGuesses
    };
};