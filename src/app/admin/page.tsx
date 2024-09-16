'use client'

import React, { useState } from 'react';
import { Input, Button, message, Card, Typography } from 'antd';
import { chosungService } from '../../services/chosungService';

const { Title, Text } = Typography;

const AdminPage: React.FC = () => {
    const [newWord, setNewWord] = useState('');
    const [testWord, setTestWord] = useState('');
    const [dailyWord, setDailyWord] = useState('');
    const [dailyChosung, setDailyChosung] = useState('');
    const [similarity, setSimilarity] = useState<{ similarity: number; reason: string } | null>(null);

    const handleSetDailyWord = async () => {
        try {
            const response = await chosungService.setDailyWord(newWord);
            setDailyWord(response.word);
            const chosung = chosungService.calculateChosung(response.word);
            setDailyChosung(chosung);
            message.success(`오늘의 단어가 설정되었습니다: ${response.word} (초성: ${chosung})`);
        } catch (error) {
            message.error('오늘의 단어 설정에 실패했습니다.');
        }
    };

    const handleCheckSimilarity = async () => {
        try {
            const response = await chosungService.checkSimilarity(testWord);
            setSimilarity(response);
        } catch (error) {
            message.error('유사도 검사에 실패했습니다.');
        }
    };

    const handleGetDailyWord = async () => {
        try {
            const response = await chosungService.getDailyWord();
            setDailyWord(response.word);
            const chosung = chosungService.calculateChosung(response.word);
            setDailyChosung(chosung);
            message.success(`오늘의 단어: ${response.word} (초성: ${chosung})`);
        } catch (error) {
            message.error('오늘의 단어 조회에 실패했습니다.');
        }
    };

    return (
        <div className="p-8">
            <Title level={2}>관리자 페이지</Title>
            <Card title="오늘의 단어 설정" className="mb-4">
                <Input
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="새로운 단어 입력"
                    className="mb-2"
                />
                <Button onClick={handleSetDailyWord}>오늘의 단어 설정</Button>
            </Card>
            <Card title="유사도 테스트" className="mb-4">
                <Input
                    value={testWord}
                    onChange={(e) => setTestWord(e.target.value)}
                    placeholder="테스트할 단어 입력"
                    className="mb-2"
                />
                <Button onClick={handleCheckSimilarity}>유사도 검사</Button>
                {similarity && (
                    <div className="mt-2">
                        <Text>유사도: {similarity.similarity * 100}%</Text>
                        <br />
                        <Text>이유: {similarity.reason}</Text>
                    </div>
                )}
            </Card>
            <Card title="오늘의 단어 조회">
                <Button onClick={handleGetDailyWord}>오늘의 단어 조회</Button>
                {dailyWord && (
                    <div className="mt-2">
                        <Text>오늘의 단어: {dailyWord}</Text>
                        <br />
                        <Text>초성: {dailyChosung}</Text>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AdminPage;