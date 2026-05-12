const { ChatMistralAI } = require("@langchain/mistralai");
const { PromptTemplate } = require("@langchain/core/prompts");

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-large-latest",
  temperature: 0.7, // Temperature thoda kam kiya accuracy ke liye
});

const generateRoadmap = async (niche, isEvolution = false, previousTitles = []) => {
  const context = isEvolution 
    ? `This is WEEK 2+. The user already covered: ${previousTitles.join(", ")}. Suggest advanced or trending angles.`
    : `This is WEEK 1. Focus on foundational viral topics for the niche: ${niche}.`;

  const template = `
    You are an expert Video Director and Content Strategist. Create a 7-day video roadmap.
    ${context}

    CRITICAL INSTRUCTION FOR VISUALS:
    For each day, provide 4 UNIQUE shooting instructions in the 'visuals' array.
    Vary the cinematography: Zoom, Panning, Tilting, POV, Handheld, Close-up.

    STRICT JSON RULES:
    1. Return ONLY raw JSON. No markdown, no \`\`\`json blocks.
    2. Ensure all quotes inside strings are escaped (e.g., use \\" instead of ").
    3. Do not include trailing commas.

    Structure:
    {{
      "days": [
        {{
          "dayNumber": 1,
          "title": "Title",
          "hook": "Hook",
          "script": "Script",
          "cameraAngle": "Angle Note",
          "visuals": [
            {{ "shotType": "Type", "description": "Order" }},
            {{ "shotType": "Type", "description": "Order" }},
            {{ "shotType": "Type", "description": "Order" }},
            {{ "shotType": "Type", "description": "Order" }}
          ]
        }}
      ],
      "nextSuggestions": ["Topic 1", "Topic 2", "Topic 3"]
    }}
  `;

  try {
    const prompt = new PromptTemplate({ template, inputVariables: ["niche"] });
    const chain = prompt.pipe(model);
    const response = await chain.invoke({ niche });

    let content = response.content;

    // --- ROBUST JSON CLEANING ---
    // 1. Remove markdown backticks if present
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    
    if (jsonStart === -1) {
        console.log("RAW CONTENT:", content);
        throw new Error("AI Response is not JSON");
    }

    let jsonString = content.substring(jsonStart, jsonEnd);
    
    // 2. Fix potential trailing commas before closing braces/brackets
    jsonString = jsonString.replace(/,(\s*[\]}])/g, "$1");

    const parsedData = JSON.parse(jsonString);

    // Ensure visuals exist
    parsedData.days = parsedData.days.map(day => ({
      ...day,
      visuals: Array.isArray(day.visuals) ? day.visuals : []
    }));

    return parsedData;

  } catch (error) {
    console.error("AI GEN ERROR:", error);
    // Error details pinpointing
    if (error instanceof SyntaxError) {
        console.error("JSON Syntax Issue. Raw string was:", error.message);
    }
    throw new Error("AI failed to generate visual intelligence.");
  }
};

module.exports = { generateRoadmap };