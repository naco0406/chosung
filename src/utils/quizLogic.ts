const words = [
    '사과', '바나나', '체리', '달력', '엘리베이터', '친구', '기타', '행복', '인터넷', '재킷',
    '키위', '레몬', '망고', '중앙', '오렌지', '파인애플', '질문', '라디오', '딸기', '우산'
  ];
  
  export const generateDailyChosung = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const wordIndex = seed % words.length;
    const word = words[wordIndex];
    const chosung = word.split('').map(char => {
      const code = char.charCodeAt(0) - 44032;
      if (code > -1 && code < 11172) return String.fromCharCode(Math.floor(code / 588) + 4352);
      return char;
    }).join('');
    return { chosung, word };
  };
  
  export const checkAnswer = (input: string, answer: string) => {
    return input.trim().toLowerCase() === answer.toLowerCase();
  };