import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

interface DailyChosungProps {
  chosung: string;
  activatedChosungs: boolean[];
}

const DailyChosung: React.FC<DailyChosungProps> = ({ chosung, activatedChosungs }) => {
  return (
    <Card className="mb-4 text-center bg-accent rounded-xl shadow-game">
      <Title level={4} className="text-text">오늘의 초성</Title>
      <div className="flex justify-center space-x-2">
        {chosung.split('').map((char, index) => (
          <span 
            key={index} 
            className={`text-4xl font-bold rounded-xl p-2 shadow-md transform hover:scale-110 transition-transform duration-200 ${
              activatedChosungs[index] 
                ? "text-primary bg-white" 
                : "text-gray-400 bg-gray-200"
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default DailyChosung;