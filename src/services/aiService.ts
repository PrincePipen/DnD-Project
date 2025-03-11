import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Character {
  name: string;
  race: string;
  class: string;
  level: number;
}

export interface StoryContext {
  diceResult: undefined;
  action: any;
  currentScene: any;
  character?: Character;
  location: string;
  recentEvents: string[];
  prompt: string;
}

const API_KEY = process.env.VITE_GOOGLE_AI_API_KEY || 'AIzaSyCh9pnnCMfcDsymFEKhkCk_yWev3YKVBYo';
const genAI = new GoogleGenerativeAI(API_KEY);

export const fetchAIResponse = async (context: StoryContext): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Build prompt based on context
    let prompt = `You are a Dungeon Master for a D&D game. `;
    
    if (context.character) {
      prompt += `The player is ${context.character.name}, a level ${context.character.level} ${context.character.race} ${context.character.class}. `;
    }
    
    if (context.currentScene) {
      prompt += `Current scene: ${context.currentScene}. `;
    }
    
    if (context.recentEvents?.length) {
      prompt += `Recent events: ${context.recentEvents.join('. ')}. `;
    }
    
    if (context.action) {
      prompt += `The player chose to ${context.action}. `;
    }
    
    if (context.diceResult !== undefined) {
      prompt += `They rolled a ${context.diceResult} on a d20. `;
    }
    
    prompt += `Generate a short, engaging response (2-3 sentences) describing what happens next.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Response Error:', error);
    return "The story continues..."; // Fallback response
  }
};

export const generateRandomEncounter = async (characterLevel: number, environment: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Create a brief D&D random encounter for a level ${characterLevel} character in a ${environment} environment. 
                   Describe the encounter in 2-3 sentences and provide three possible actions the player could take.
                   Format as JSON with properties: "description" (string), "options" (array of 3 action strings), and "difficulty" (string: "easy", "medium", or "hard").`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      // Clean up the response text to ensure it contains valid JSON
      const jsonText = text.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      return {
        description: "You encounter a hostile creature blocking your path.",
        options: ["Fight", "Negotiate", "Flee"],
        difficulty: "medium"
      };
    }
  } catch (error) {
    console.error("Error generating random encounter:", error);
    return {
      description: "You encounter a hostile creature blocking your path.",
      options: ["Fight", "Negotiate", "Flee"],
      difficulty: "medium"
    };
  }
};