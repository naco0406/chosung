import axios from 'axios';

const API_BASE_URL = 'https://dev.naco.kr/api/ai';

export interface AIResponse {
    result: string;
}

export const aiService = {
    getResponse: async (string: string): Promise<AIResponse> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${string}`);
            return response.data;
        } catch (error) {
            console.error('Error translating:', error);
            throw error;
        }
    },
};