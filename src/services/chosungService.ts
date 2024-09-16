import axios from 'axios';

const API_BASE_URL = 'https://dev.naco.kr/api';

export interface DailyWordResponse {
    word: string;
}

export interface SimilarityResponse {
    similarity: number;
    reason: string;
}

export const chosungService = {
    getDailyWord: async (): Promise<DailyWordResponse> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/daily`);
            return response.data;
        } catch (error) {
            console.error('Error fetching daily word:', error);
            throw error;
        }
    },

    setDailyWord: async (word: string): Promise<DailyWordResponse> => {
        try {
            const response = await axios.post(`${API_BASE_URL}/daily`, { word });
            return response.data;
        } catch (error) {
            console.error('Error setting daily word:', error);
            throw error;
        }
    },

    checkSimilarity: async (word: string): Promise<SimilarityResponse> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/similarity/${word}`);
            return response.data;
        } catch (error) {
            console.error('Error checking similarity:', error);
            throw error;
        }
    },

    calculateChosung: (word: string): string => {
        return word.split('').map(char => {
            const code = char.charCodeAt(0) - 44032;
            if (code > -1 && code < 11172) return String.fromCharCode(Math.floor(code / 588) + 4352);
            return char;
        }).join('');
    }
};