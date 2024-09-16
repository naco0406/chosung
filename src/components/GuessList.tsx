import React from 'react';
import { List, Typography, Tooltip } from 'antd';

const { Text } = Typography;

interface Guess {
    word: string;
    similarity: number;
    reason: string;
    index: number;
}

interface GuessListProps {
    lastGuess: Guess | null;
    sortedGuesses: Guess[];
}

const GuessList: React.FC<GuessListProps> = ({ lastGuess, sortedGuesses }) => {
    const renderGuess = (guess: Guess) => (
        <List.Item className="border-b last:border-b-0 py-4 px-6 hover:bg-background transition-colors duration-200">
            <div>
                <Text strong className="text-lg">#{guess.index + 1}. {guess.word}</Text>
                <Tooltip title={guess.reason}>
                    <Text
                        className={`text-lg font-bold ml-2 ${guess.similarity > 0.5 ? "text-secondary" : "text-accent"}`}
                    >
                        유사도: {guess.similarity * 100}%
                    </Text>
                </Tooltip>
            </div>
        </List.Item>
    );
    return (
        <div className="mt-6 bg-white rounded-xl shadow-game overflow-hidden">
            <div className="bg-primary text-white p-4 font-bold text-lg">
                {lastGuess && (
                    <div className="flex flex-row justify-between">
                        <Text strong className="text-lg">#{lastGuess.index + 1}. {lastGuess.word}</Text>
                        <Text
                            className={`text-lg font-bold ml-2 ${lastGuess.similarity > 0.5 ? "text-secondary" : "text-accent"}`}
                        >
                            유사도: {lastGuess.similarity * 100}%
                        </Text>
                    </div>
                )}
            </div>
            <List
                className="overflow-auto flex-grow px-4"
                dataSource={sortedGuesses}
                renderItem={renderGuess}
            />
        </div>
    );
};

export default GuessList;