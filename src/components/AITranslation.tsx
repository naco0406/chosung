"use client"

import { CopyOutlined, SoundOutlined, SwapOutlined, TranslationOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Select, Spin, Typography, message } from 'antd';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AIResponse, aiService } from '../services/aiService';
import { AILoadingScreen } from './LoadingScreen';

const { Title, Paragraph, Text } = Typography;
const { Content, Footer } = Layout;
const { Option } = Select;

const StyledLayout = styled(Layout)`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const StyledContent = styled(Content)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const TranslationContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const LanguageBar = styled.div`
  display: flex;
  padding: 1rem;
  background-color: rgba(241, 243, 244, 0.6);
`;

const TranslationArea = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputArea = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const OutputArea = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: rgba(245, 245, 245, 0.5);
  min-height: 150px;
`;

const StyledTextArea = styled(Input.TextArea)`
  border: none;
  font-size: 18px;
  resize: none;
  background-color: transparent;
  &:focus {
    box-shadow: none;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.6);
`;

const IconButton = styled(Button)`
  border: none;
  background: none;
  box-shadow: none;
  &:hover {
    background-color: rgba(241, 243, 244, 0.6);
  }
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: transparent;
  padding: 12px;
`;

const TranslateButton = styled(Button)`
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  &:hover, &:focus {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

const AITranslationPage: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleTranslate = useCallback(async () => {
        if (!input.trim()) {
            message.warning('문자 를 줘. 번역의 이야');
            return;
        }

        setLoading(true);
        try {
            const response: AIResponse = await aiService.getResponse(input);
            const parsedResult = JSON.parse(response.result);
            setResult(parsedResult.answer);
        } catch (error) {
            console.error('Error processing translation:', error);
            message.error('번역 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    }, [input]);

    const copyToClipboard = useCallback(() => {
        if (result) {
            navigator.clipboard.writeText(result).then(() => {
                message.success('번역 결과가 클립보드에 복사되었습니다.');
            }, (err) => {
                console.error('Could not copy text: ', err);
                message.error('복사에 실패했습니다. 다시 시도해주세요.');
            });
        } else {
            message.info('복사할 번역 결과가 없습니다.');
        }
    }, [result]);

    if (isPageLoading) {
        return <AILoadingScreen />;
    }

    return (
        <StyledLayout>
            <StyledContent>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title level={3} style={{ marginBottom: 0 }}>나는 통역 전문가 이다</Title>
                    <Paragraph type="secondary">그것은 언어 변환의 전문 본인 입니다</Paragraph>
                </motion.div>

                <TranslationContainer
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <LanguageBar>
                        <Select defaultValue="ko" style={{ width: 120, marginRight: '8px' }}>
                            <Option value="ko">한국어</Option>
                            {/* <Option value="en">영어</Option> */}
                        </Select>
                        <Button icon={<SwapOutlined />} />
                        <Select defaultValue="en" style={{ width: 120, marginLeft: '8px' }}>
                            <Option value="en">번역체</Option>
                            {/* <Option value="ko">한국어</Option> */}
                        </Select>
                    </LanguageBar>
                    <TranslationArea>
                        <InputArea>
                            <StyledTextArea
                                placeholder="문자 를 줘. 번역의 이야"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                autoSize={{ minRows: 5, maxRows: 10 }}
                            />
                        </InputArea>
                        <OutputArea>
                            {loading ? (
                                <Spin size="large" />
                            ) : result ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Paragraph style={{ margin: 0, fontSize: '18px' }}>{result}</Paragraph>
                                </motion.div>
                            ) : (
                                <Text type="secondary">전시 이다 번역 결과를 이곳</Text>
                            )}
                        </OutputArea>
                    </TranslationArea>
                    <ActionBar>
                        <div>
                            <IconButton icon={<SoundOutlined />} />
                            <IconButton
                                icon={<CopyOutlined />}
                                onClick={copyToClipboard}
                                title="번역 결과 복사"
                            />
                        </div>
                        <TranslateButton
                            icon={<TranslationOutlined />}
                            onClick={handleTranslate}
                            loading={loading}
                        >
                            번역
                        </TranslateButton>
                    </ActionBar>
                </TranslationContainer>
            </StyledContent>
            <StyledFooter>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                    © 2024 Naco. All rights reserved.
                </Text>
            </StyledFooter>
        </StyledLayout>
    );
};

export default AITranslationPage;