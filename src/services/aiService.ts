import axios from 'axios';
import { promptBuilder } from '../lib/ai/promptBuilder';
import { responseParser } from '../lib/ai/responseParser';

const AI_API_URL = 'https://api.example.com/ai'; // Replace with your actual AI API URL

export const fetchAIResponse = async (userInput) => {
  try {
    const prompt = promptBuilder(userInput);
    const response = await axios.post(AI_API_URL, { prompt });
    return responseParser(response.data);
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw new Error('Failed to fetch AI response');
  }
};

export const generateStoryElement = async (context) => {
  try {
    const prompt = promptBuilder(context);
    const response = await axios.post(AI_API_URL, { prompt });
    return responseParser(response.data);
  } catch (error) {
    console.error('Error generating story element:', error);
    throw new Error('Failed to generate story element');
  }
};