import { tavily } from "@tavily/core";
import dotenv from 'dotenv';
dotenv.config();

// Tavily Client Initialize
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

/**
 * Ye function internet scan karega aapke niche ke liye 
 * specifically May 2026 ke context mein.
 */
export const conductResearch = async (niche) => {
  try {
    const query = `Current viral trends, news, and technical breakthroughs in ${niche} as of May 2026`;
    
    console.log(`[RAG-ENGINE] Scanning 2026 Web for: ${niche}...`);

    const response = await tvly.search(query, {
      searchDepth: "advanced",
      maxResults: 5,
      includeAnswer: true // Ye AI-generated summary bhi deta hai
    });

    // Saare results ko ek context block mein convert karna
    const contextText = response.results
      .map(res => `TOPIC: ${res.title}\nINFO: ${res.content}`)
      .join("\n\n");

    return {
      summary: response.answer,
      rawContext: contextText
    };
  } catch (error) {
    console.error("Research Protocol Failed:", error);
    return {
      summary: "Real-time search failed. Reverting to base model knowledge.",
      rawContext: ""
    };
  }
};