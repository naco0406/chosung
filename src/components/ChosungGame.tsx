"use client"

import { useGuess } from '@/hooks/useGuess';
import { chosungService } from '@/services/chosungService';
import { Layout, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import DailyChosung from './DailyChosung';
import GuessInput from './GuessInput';
import GuessList from './GuessList';
import LoadingScreen from './LoadingScreen';

const { Content } = Layout;
const { Title } = Typography;

const ChosungGame: React.FC = () => {
    const [dailyChosung, setDailyChosung] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activatedChosungs, setActivatedChosungs] = useState<boolean[]>([]);
    const { addGuess, lastGuess, getSortedGuesses } = useGuess();

    useEffect(() => {
        const fetchDailyWord = async () => {
            try {
                const { word } = await chosungService.getDailyWord();
                setAnswer(word);
                const chosung = chosungService.calculateChosung(word);
                setDailyChosung(chosung);
                setActivatedChosungs(new Array(chosung.length).fill(false));
                setIsLoading(false);
            } catch (error) {
                message.error('오늘의 단어를 불러오는데 실패했습니다.');
            }
        };
        fetchDailyWord();
    }, []);

    const handleGuess = async (input: string) => {
        try {
            const { similarity, reason } = await chosungService.checkSimilarity(input);
            if (similarity >= 1) {
                setIsCorrect(true);
                message.success('정답입니다!');
            } else {
                message.info(`유사도: ${similarity * 100}%`);
            }
            addGuess(input, similarity, reason);
        } catch (error) {
            message.error('유사도 검사에 실패했습니다.');
        }
    };

    const updateActivatedChosungs = (newActivatedChosungs: boolean[]) => {
        setActivatedChosungs(newActivatedChosungs);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Layout className="h-[100dvh] overflow-hidden bg-gradient-to-br from-background to-secondary">
            <Content className="p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-game p-6">
                    <Title level={2} className="text-center mb-6 text-primary">초성 꼬맨틀</Title>
                    <DailyChosung chosung={dailyChosung} activatedChosungs={activatedChosungs} />
                    <GuessInput
                        onGuess={handleGuess}
                        disabled={isCorrect}
                        dailyChosung={dailyChosung}
                        updateActivatedChosungs={updateActivatedChosungs}
                    />
                    <GuessList lastGuess={lastGuess} sortedGuesses={getSortedGuesses()} />
                    {isCorrect && (
                        <p className="mt-6 text-center text-secondary font-bold text-xl animate-bounce">
                            축하합니다! 정답은 "{answer}" 입니다! 🎉
                        </p>
                    )}
                </div>
            </Content>
        </Layout>
    );
};

export default ChosungGame;