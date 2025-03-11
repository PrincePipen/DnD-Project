import axios from 'axios';

const API_KEY = 'AIzaSyCh9pnnCMfcDsymFEKhkCk_yWev3YKVBYo';

// Initialize Google Generative AI
const initializeGenAI = async () => {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(API_KEY);
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  } catch (error) {
    console.error("Failed to initialize Google Generative AI:", error);
    return null;
  }
};

// Define interface for context parameter
interface StoryContext {
  character?: {
    name?: string;
    level?: number;
    race?: string;
    class?: string;
  };
  currentScene?: string;
  gameProgress?: any;
  previousScenes?: string[];
  diceResult?: number;
}

// Build structured prompt for storytelling
const buildPrompt = (context: StoryContext) => {
  const { character, currentScene, gameProgress, previousScenes = [] } = context;
  
  let prompt = `You are the AI Dungeon Master for a D&D game. 
The player character is ${character?.name}, a level ${character?.level} ${character?.race} ${character?.class}.

Current scene: ${currentScene}

`;
  
  return prompt;
};

// Use Google's Generative AI to get a response
export const fetchAIResponse = async (context: StoryContext) => {
  try {
    const model = await initializeGenAI();
    if (!model) {
      throw new Error("Failed to initialize AI model");
    }
    
    let prompt = buildPrompt(context);
  
    if (context.diceResult !== undefined) {
      prompt += `The player just rolled a ${context.diceResult} on a d20.\n`;
      prompt += `Based on this roll, continue the story with a short, exciting description of what happens next. Keep it under 3 sentences.`;
    } else {
      prompt += `Continue the story from here with a rich, immersive description that builds on the current scene. Add interesting details, potential challenges, or opportunities. Keep it under 4 sentences.`;
    }
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return getMockResponse(context);
  }
};

// Mock responses for testing and when API is unavailable
const getMockResponse = (context: StoryContext) => {
  const { character, diceResult } = context;
  
  const mockResponses = [
    `The forest grows denser as ${character?.name} ventures deeper, with strange sounds echoing through the trees. A faint blue light flickers between distant trunks, beckoning with mysterious promise.`,
    `Footprints mark the mud ahead - not human, but something with claws. They're fresh, suggesting whatever made them is close by.`,
    `A rusted metal contraption lies partially buried in the soil. It looks ancient, possibly dwarven in origin, with strange runes etched into its surface.`,
    `The village comes into view, but something is wrong. No smoke rises from chimneys, no children play in the streets.`,
  ];
  
  if (diceResult !== undefined) {
    if (diceResult >= 18) {
      return `With an exceptional roll of ${diceResult}, you notice hidden details others would miss. A secret pathway reveals itself, offering a safe route forward.`;
    } else if (diceResult > 10) {
      return `Your roll of ${diceResult} is sufficient. You proceed carefully, avoiding the obvious dangers.`;
    } else {
      return `With a disappointing roll of ${diceResult}, you stumble slightly. The noise attracts unwanted attention from nearby creatures.`;
    }
  }
  
  // Return a random story continuation
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

// Specific story generation for key moments
export const generateStoryElement = async (elementType: string, context: StoryContext) => {
  try {
    const prompt = `As a D&D Dungeon Master, generate a compelling ${elementType} for a player who is a level ${context.character?.level} ${context.character?.race} ${context.character?.class}. Make it dramatic and suitable for their character.`;
    
    const model = await initializeGenAI();
    if (!model) {
      throw new Error("Failed to initialize AI model");
    }
    
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating story element:', error);
    return `A mysterious ${elementType} appears...`; // Fallback
  }
};