"use client"

import React, { useState, useEffect } from 'react';
import { Input, Button, Tooltip } from 'antd';

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled: boolean;
  dailyChosung: string;
  updateActivatedChosungs: (activatedChosungs: boolean[]) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled, dailyChosung, updateActivatedChosungs }) => {
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [activatedChosungs, setActivatedChosungs] = useState<boolean[]>(new Array(dailyChosung.length).fill(false));

  useEffect(() => {
    const newActivatedChosungs = checkChosungs(input, dailyChosung);
    setActivatedChosungs(newActivatedChosungs);
    updateActivatedChosungs(newActivatedChosungs);
    setIsValid(newActivatedChosungs.every(Boolean));
    setShowError(false);
  }, [input, dailyChosung]);

  const handleSubmit = () => {
    if (isValid && input.trim()) {
      onGuess(input.trim());
      setInput('');
      setActivatedChosungs(new Array(dailyChosung.length).fill(false));
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const checkChosungs = (guess: string, chosung: string): boolean[] => {
    const guessChosungs = guess.split('').map(char => {
      const code = char.charCodeAt(0) - 44032;
      if (code > -1 && code < 11172) return String.fromCharCode(Math.floor(code / 588) + 4352);
      return char;
    });

    return chosung.split('').map((char, index) => guessChosungs[index] === char);
  };

  return (
    <div className="mb-6 flex flex-col p-4 bg-white rounded-xl shadow-md">
      <div className="flex">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder="단어를 입력하세요"
          className="rounded-lg text-lg p-3 flex-grow mr-4"
          style={{ height: '50px' }}
        />
        <Tooltip title={isValid ? "추측하기" : "모든 초성이 일치해야 합니다"}>
          <Button
            onClick={handleSubmit}
            disabled={disabled}
            className={`rounded-lg text-white text-lg px-6 flex items-center justify-center transition-all duration-300 border-0 ${
              isValid 
                ? "bg-primary hover:bg-primary-dark" 
                : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
            }`}
            style={{ height: '50px', marginLeft: '-1px' }}
          >
            추측하기
          </Button>
        </Tooltip>
      </div>
      {showError && !isValid && input && (
        <p className="text-red-500 mt-2">
          입력한 단어의 초성이 오늘의 초성과 일치하지 않습니다.
        </p>
      )}
    </div>
  );
};

export default GuessInput;