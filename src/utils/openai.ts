
import { useState } from 'react';

interface OpenAIResponse {
  data: any;
  error: string | null;
  loading: boolean;
}

// This is a client-side approach - for production, you should use a backend service
// to protect your API key
export const useOpenAI = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('openai_api_key')
  );
  const [state, setState] = useState<OpenAIResponse>({
    data: null,
    error: null,
    loading: false,
  });

  const saveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    return true;
  };

  const clearApiKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey(null);
  };

  const fetchResearchData = async (topic: string, requirements?: string, industry?: string) => {
    if (!apiKey) {
      setState({
        data: null,
        error: "API key not found. Please set your OpenAI API key.",
        loading: false,
      });
      return null;
    }

    setState(prevState => ({
      ...prevState,
      loading: true,
      error: null,
    }));

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a research assistant that provides comprehensive, well-structured research reports. 
              Format your response as a JSON object with the following structure:
              {
                "title": "SEO-optimized title for the research",
                "introduction": "Brief overview of the topic",
                "detailedInsights": [
                  { "subtitle": "Section title", "content": "Detailed information" }
                ],
                "keyStatistics": ["Stat 1", "Stat 2", "Stat 3"],
                "expertOpinions": [
                  { "expert": "Expert name and credentials", "opinion": "Expert's view" }
                ],
                "conclusion": "Summary and future outlook",
                "references": [
                  { 
                    "title": "Source title", 
                    "authors": "Authors", 
                    "journal": "Publication name or null", 
                    "year": "Publication year", 
                    "url": "Source URL" 
                  }
                ]
              }`
            },
            {
              role: "user",
              content: `Research Topic: ${topic}
                ${industry ? `Industry Focus: ${industry}` : ""}
                ${requirements ? `Additional Requirements: ${requirements}` : ""}
                Please provide a comprehensive research report with accurate information, 
                statistics, expert opinions, and proper citations from authoritative sources 
                in the ${industry || "relevant"} field.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 2500,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setState({
          data: null,
          error: data.error.message || "An error occurred when fetching from OpenAI",
          loading: false,
        });
        return null;
      }

      // Parse the response content as JSON
      try {
        const contentText = data.choices[0].message.content;
        const jsonMatch = contentText.match(/\{[\s\S]*\}/);
        const jsonContent = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
        
        setState({
          data: jsonContent,
          error: null,
          loading: false,
        });
        
        return jsonContent;
      } catch (parseError) {
        console.error("Error parsing JSON from OpenAI response:", parseError);
        setState({
          data: null,
          error: "Error processing the research data. Please try again.",
          loading: false,
        });
        return null;
      }
    } catch (error) {
      console.error("OpenAI API Error:", error);
      setState({
        data: null,
        error: "Failed to fetch research data. Please check your API key and try again.",
        loading: false,
      });
      return null;
    }
  };

  return {
    fetchResearchData,
    saveApiKey,
    clearApiKey,
    hasApiKey: !!apiKey,
    ...state,
  };
};
