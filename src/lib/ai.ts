import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCh9pnnCMfcDsymFEKhkCk_yWev3YKVBYo";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "learnlm-1.5-pro-experimental"
});

export async function generateStoryProgress(
  character: any,
  currentScene: string,
  playerChoice: string
): Promise<string> {
  try {
    const prompt = `
      You are an expert Dungeon Master for a D&D 5e game. 
      Current character: ${JSON.stringify(character)}
      Current scene: ${currentScene}
      Player choice: ${playerChoice}
      
      Generate the next scene in the story, considering the character's attributes and the player's choice.
      Include opportunities for skill checks, combat, or roleplay.
      Keep the response under 250 words and end with 2-3 clear choices for the player.
    `;

    // Generate content with safety settings
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 1000,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Failed to generate story content');
    }

    return text;
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    
    // Handle specific API errors
    if (error?.message?.includes('API key')) {
      throw new Error('Invalid or missing API key. Please check your configuration.');
    }
    
    if (error?.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.');
    }

    if (error.message === 'Failed to generate story content') {
      throw new Error('The story generator encountered an issue. Please try again.');
    }

    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }

    throw new Error(`AI Generation Error: ${error.message || 'Unknown error occurred'}`);
  }
}
