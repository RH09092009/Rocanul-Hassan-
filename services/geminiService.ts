
import { GoogleGenAI } from "@google/genai";
import { Doctor, Hospital, MedicalService, SearchFilters, Language, ChatMessage, HealthArticle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchMedicalEntities = async (
  filters: SearchFilters,
  language: Language,
  userLatLong?: { lat: number; lng: number }
): Promise<Doctor[] | Hospital[] | MedicalService[]> => {
  const modelId = "gemini-2.5-flash";
  const { searchType, location, specialty, gender } = filters;
  
  const locationText = location || (userLatLong ? "User's current coordinates" : "Unknown location");
  const langText = language === 'bn' ? 'Bangla' : 'English';

  let systemPrompt = "";
  
  if (searchType === 'doctor') {
    systemPrompt = `
      Find real specialist doctors based on:
      Location: ${locationText}
      Specialty: ${specialty}
      Gender: ${gender}
      Language: ${langText}

      CRITICAL: Use Google Search to find REAL, VALID phone numbers for appointments. 
      If a direct mobile number isn't available, provide the hospital reception number.
      
      JSON Structure:
      {
        "id": "uuid",
        "name": "Dr. Name",
        "specialty": "Specialty",
        "qualification": "Degrees",
        "location": "Hospital/Chamber Name",
        "city": "City/Area",
        "experience": "Years",
        "visitingHours": "Time",
        "fee": "Amount",
        "contactInfo": "01xxxxxxxxx", 
        "rating": "4.8",
        "reviewCount": 120,
        "gender": "Male/Female",
        "isVerified": true,
        "languages": ["English", "Bangla"],
        "nextAvailable": "Today 5PM"
      }
    `;
  } else if (searchType === 'hospital') {
    systemPrompt = `
      Find hospitals based on:
      Location: ${locationText}
      Focus: ${specialty !== 'general_physician' ? specialty : 'General'}
      Language: ${langText}

      CRITICAL: Use Google Search to find REAL, VALID emergency and reception phone numbers.

      JSON Structure:
      {
        "id": "uuid",
        "name": "Hospital Name",
        "address": "Full Address",
        "phone": "01xxxxxxxxx",
        "emergencyPhone": "Hotline Number",
        "departments": ["Dept A", "Dept B"],
        "features": ["ICU", "24/7 Pharmacy"],
        "visitingHours": "24/7 or specific",
        "rating": "4.5",
        "website": "URL",
        "totalBeds": "500+",
        "ambulanceAvailable": true
      }
    `;
  } else {
    // Ambulance, Pharmacy, Blood Bank, Oxygen
    systemPrompt = `
      Find ${searchType.replace('_', ' ')} services based on:
      Location: ${locationText}
      Language: ${langText}

      CRITICAL: Use Google Search to find REAL, VALID contact numbers. 
      For Ambulances/Blood Banks, prioritize 24/7 hotlines.

      JSON Structure:
      {
        "id": "uuid",
        "name": "Service Name",
        "type": "${searchType}",
        "address": "Address",
        "phone": "01xxxxxxxxx",
        "isOpen24Hours": true,
        "deliveryAvailable": true
      }
    `;
  }

  const prompt = `
    You are a medical assistant. ${systemPrompt}
    IMPORTANT: Provide the output strictly as a JSON array inside a markdown code block.
    Translate text fields to ${langText} where appropriate.
  `;

  try {
    const tools: any[] = [{ googleSearch: {} }, { googleMaps: {} }];
    let toolConfig = undefined;
    
    if (userLatLong) {
      toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: userLatLong.lat,
            longitude: userLatLong.lng
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: tools,
        toolConfig: toolConfig,
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const jsonMatch = text?.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      const entities = JSON.parse(jsonMatch[1]);
      
      return entities.map((entity: any, index: number) => {
        const chunk = groundingChunks[index % groundingChunks.length];
        let mapUrl = undefined;
        let sourceUrl = undefined;

        if (chunk?.web?.uri) sourceUrl = chunk.web.uri;
        if (chunk?.maps?.uri) mapUrl = chunk.maps.uri;

        if (!mapUrl && entity.address) {
           mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(entity.name + ' ' + entity.address)}`;
        }

        return {
          ...entity,
          sourceUrl,
          mapUrl: mapUrl || chunk?.maps?.uri
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const chatWithHealthAssistant = async (
  query: string, 
  history: ChatMessage[], 
  language: Language
): Promise<string> => {
  const modelId = "gemini-2.5-flash";
  const langInstruction = language === 'bn' ? "Respond in Bangla." : "Respond in English.";
  
  const prompt = `
    You are a helpful, empathetic, and safe AI Health Assistant for a medical app called MediFind.
    
    User Query: "${query}"
    
    Instructions:
    1. ${langInstruction}
    2. Provide helpful general health information.
    3. STRICTLY AVOID giving specific medical diagnoses or prescribing medication.
    4. If the user mentions severe symptoms (chest pain, breathing trouble, heavy bleeding), IMMEDIATELY advise them to call emergency services or visit a hospital.
    5. Be concise and use bullet points for readability.
    6. Tone: Professional, caring, and safe.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "I apologize, I cannot answer that right now.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Connection error. Please try again later.";
  }
};

export const getHealthArticles = async (language: Language): Promise<HealthArticle[]> => {
  const modelId = "gemini-2.5-flash";
  const langText = language === 'bn' ? "Bangla" : "English";
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const prompt = `
    Find 6 recent, trending, and medically verified health tips or short articles suitable for the general public in ${langText}.
    
    Current Date: ${today}.
    
    Instructions:
    1. Focus on health topics relevant to the CURRENT DATE/SEASON (e.g., if summer: heatstroke, hydration; if winter: flu, skin care).
    2. Include topics on Nutrition, Mental Health, or Disease Prevention.
    3. Ensure content is accurate and safe.

    Return strictly a JSON array with this structure:
    [
      {
        "id": "1",
        "title": "Article Title",
        "summary": "Short 2-line summary...",
        "content": "Full article text with 3-4 paragraphs. Provide detailed and helpful information. Use newline characters for paragraph breaks.",
        "category": "Nutrition/General Health",
        "readTime": "5 min"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const jsonMatch = text?.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    return [];
  } catch (error) {
    console.error("Article Fetch Error:", error);
    return [];
  }
};
