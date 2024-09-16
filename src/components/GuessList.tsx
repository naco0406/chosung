import React from 'react';
import { List, Typography } from 'antd';

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
            <div className='flex flex-col w-full'>
                <div className="flex flex-row justify-between">
                    <Text className="text-lg">#{guess.index + 1}. <span className='font-bold'>{guess.word}</span></Text>
                    <Text
                        className={`text-md ml-2 ${guess.similarity > 0.5 ? "text-secondary" : "text-accent"} my-auto`}
                    >
                        유사도: {guess.similarity * 100}%
                    </Text>
                </div>
                <Text
                    className="text-xs font-light mt-1"
                >
                    {guess.reason}
                </Text>
            </div>
        </List.Item>
    );
    return (
        <div className="mt-6 bg-white rounded-xl shadow-game overflow-hidden">
            <div className="bg-primary text-white p-4 text-lg">
                {lastGuess && (
                    <div className='flex flex-col w-full'>
                        <div className="flex flex-row justify-between">
                            <Text className="text-lg">#{lastGuess.index + 1}. <span className='font-bold'>{lastGuess.word}</span></Text>
                            <Text
                                className={`text-md ml-2 ${lastGuess.similarity > 0.5 ? "text-secondary" : "text-accent"} my-auto`}
                            >
                                유사도: {lastGuess.similarity * 100}%
                            </Text>
                        </div>
                        <Text
                            className="text-xs font-light mt-1"
                        >
                            {lastGuess.reason}
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