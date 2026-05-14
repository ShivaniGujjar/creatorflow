const { ChatMistralAI } = require("@langchain/mistralai");
const { PromptTemplate } = require("@langchain/core/prompts");

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-large-latest",
  temperature: 0.8, 
});

// --- 1. ROADMAP GENERATION ---
const generateRoadmap = async (niche, isEvolution = false, previousTitles = [], researchData = {}) => {
  const currentDate = "May 14, 2026";
  const context = isEvolution 
    ? `PHASE: ADVANCED. Covered: ${previousTitles.join(", ")}.`
    : `PHASE: FOUNDATION. Target core audience for ${niche}.`;

  const template = `
    SYSTEM TIME: ${currentDate}
    ROLE: Elite Content Strategist.
    GOAL: Create a 7-day video roadmap for: {niche}.
    ${context}

    Return ONLY raw JSON.
    Structure:
    {{
      "days": [
        {{
          "dayNumber": 1,
          "title": "Title",
          "hook": "Hook",
          "script": "Script",
          "cameraAngle": "Angle",
          "visuals": [{{ "shotType": "Type", "description": "Desc" }}]
        }}
      ],
      "nextSuggestions": ["Topic 1"]
    }}
  `;

  try {
    const prompt = new PromptTemplate({ template, inputVariables: ["niche"] });
    const chain = prompt.pipe(model);
    const response = await chain.invoke({ niche });
    
    let content = response.content.trim();
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("No JSON found");
  } catch (error) {
    console.error("AI GEN ERROR:", error);
    throw new Error("AI failed to generate roadmap.");
  }
};

// --- 2. VIRAL ARCHITECT LOGIC (FIXED FOR 500 ERROR) ---
const generateVisualHooks = async (dayData) => {
  // Input Check
  if (!dayData || !dayData.title) return null;

  const template = `
    You are a Viral Content Architect in 2026.
    Topic: ${dayData.title}
    Script Snippet: ${dayData.script || "Educational content"}

    Generate 3 Viral Hooks and 2 Thumbnail Concepts.
    Return ONLY raw JSON. No conversational text.
    
    Structure:
    {{
      "hooks": ["Hook 1", "Hook 2", "Hook 3"],
      "thumbnails": [
        {{ "concept": "Visual description", "overlay": "Text Overlay" }},
        {{ "concept": "Visual description", "overlay": "Text Overlay" }}
      ]
    }}
  `;

  try {
    const response = await model.invoke(template);
    let content = response.content.trim();

    // REGEX CLEANING: Isse 500 parse error kabhi nahi aayega
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      // Ensure arrays exist
      return {
        hooks: parsed.hooks || [],
        thumbnails: parsed.thumbnails || []
      };
    }
    
    console.error("AI Response not in JSON format");
    return null;
  } catch (error) {
    console.error("MISTRAL ARCHITECT ERROR:", error.message);
    return null;
  }
};

module.exports = { generateRoadmap, generateVisualHooks };