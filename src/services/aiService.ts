import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
// In production, this should be an environment variable
const API_KEY = "AIzaSyCh9pnnCMfcDsymFEKhkCk_yWev3YKVBYo";
const genAI = new GoogleGenerativeAI(API_KEY);

interface StoryGenerationParams {
  character?: {
    name: string;
    race: string;
    class: string;
    level: number;
  };
  currentLocation?: string;
  recentEvents?: string[];
  prompt?: string;
}

export const getAIStoryContent = async ({
  character,
  currentLocation = "forest path",
  recentEvents = [],
  prompt
}: StoryGenerationParams) => {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Construct the context for the AI
    let context = `You are a storyteller for a Dungeons & Dragons adventure. Write a short, engaging paragraph (maximum 3 sentences) `;
    
    if (character) {
      context += `for ${character.name}, a level ${character.level} ${character.race} ${character.class}. `;
    }
    
    if (currentLocation) {
      context += `The character is currently in/at a ${currentLocation}. `;
    }
    
    if (recentEvents && recentEvents.length > 0) {
      context += `Recent events include: ${recentEvents.join('. ')}. `;
    }
    
    context += prompt || "Continue the story with an interesting development or encounter.";

    // Generate content with the model
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating AI content:", error);
    return "The journey continues as you move forward...";
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