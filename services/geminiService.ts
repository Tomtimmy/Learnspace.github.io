import { GoogleGenAI, Type } from "@google/genai";
import { Module } from '../types';

const API_KEY = process.env.API_KEY || "";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

// Initialize safely. If key is empty, calls will fail later, but app won't crash on load.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const courseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.STRING,
        description: 'A unique identifier for the module, e.g., "m1".'
      },
      title: {
        type: Type.STRING,
        description: 'The title of the course module.'
      },
      lessons: {
        type: Type.ARRAY,
        description: 'A list of lessons within this module.',
        items: {
          type: Type.OBJECT,
          properties: {
             id: {
                type: Type.STRING,
                description: 'A unique identifier for the lesson, e.g., "l1".'
             },
             title: {
                type: Type.STRING,
                description: 'The title of the lesson.'
             },
             content: {
                type: Type.STRING,
                description: 'A brief, one-sentence description of the lesson content.'
             }
          },
        }
      }
    },
  },
};

export const generateCourseOutline = async (topic: string): Promise<Module[]> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  try {
    const prompt = `Generate a detailed course outline for a beginner-level course on "${topic}". The outline should consist of several modules, and each module should contain a few lesson titles. For each lesson, provide a one-sentence summary of its content. Structure the output as a JSON array of modules.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: courseSchema,
      },
    });

    const jsonText = response.text?.trim();
    if (!jsonText) {
        throw new Error("No content generated");
    }
    const generatedModules = JSON.parse(jsonText);
    
    // The API might return objects without all properties, so we ensure they conform to the Module type
    return generatedModules.map((mod: any) => ({
        id: mod.id || `mod-${Math.random().toString(36).substr(2, 9)}`,
        title: mod.title || 'Untitled Module',
        lessons: (mod.lessons || []).map((lesson: any) => ({
            id: lesson.id || `lesson-${Math.random().toString(36).substr(2, 9)}`,
            title: lesson.title || 'Untitled Lesson',
            content: lesson.content || 'No content available.'
        }))
    }));

  } catch (error) {
    console.error("Error generating course outline:", error);
    throw new Error(`Failed to generate course outline from Gemini API: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const searchHelpCenter = async (query: string): Promise<{ text: string; sources: any[] }> => {
    if (!API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }

    try {
        const prompt = `You are a helpful and friendly customer support agent for an online learning platform called LearnSpace. Based on the user's query, search for relevant help articles and provide a clear, concise, and helpful answer. Format your response in markdown.
        
        User Query: "${query}"`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text || "I couldn't find a specific answer to that, but please browse our help center topics.";
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return { text, sources };
    } catch (error) {
        console.error("Error searching help center:", error);
        throw new Error(`Failed to search help center using Gemini API: ${error instanceof Error ? error.message : String(error)}`);
    }
};