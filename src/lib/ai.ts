import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate story progress: ' + error.message);
  }
}
