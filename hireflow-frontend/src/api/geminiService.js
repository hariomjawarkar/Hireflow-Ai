/**
 * HireFlow AI - Gemini Integration Service
 * This service handles communication with Google's Gemini AI.
 * Free Tier limits: 15 RPM, 1 million TPM.
 */

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

export const getGeminiResponse = async (userPrompt, apiKey) => {
    if (!apiKey) return "API Key missing. Please set your Gemini Key in the chatbot settings.";

    console.log("🔍 Testing Gemini API...");
    console.log("📍 Endpoint:", GEMINI_API_URL);
    console.log("🔑 API Key (first 10 chars):", apiKey.substring(0, 10) + "...");

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": apiKey,
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are the HireFlow AI Assistant, a professional career coach and hiring expert. 
                        Context: The user is currently on the HireFlow platform. 
                        Your goal is to help them with job searches, resume tips, interview prep, and navigating the app.
                        Keep answers professional, encouraging, and concise. 
                        
                        User Question: ${userPrompt}`
                    }]
                }]
            })
        });

        console.log("📡 Response Status:", response.status);
        console.log("📡 Response OK:", response.ok);

        const data = await response.json();

        // Check for API errors
        if (data.error) {
            console.error("Gemini API Error (Full Details):", data.error);
            console.error("Error Code:", data.error.code);
            console.error("Error Message:", data.error.message);
            console.error("Error Status:", data.error.status);

            // Show the FULL error message for debugging
            const fullError = `${data.error.message} (Code: ${data.error.code || 'N/A'}, Status: ${data.error.status || 'N/A'})`;

            // Provide user-friendly error messages
            if (data.error.message.includes("API key not valid") || data.error.message.includes("API_KEY_INVALID")) {
                return "🔑 Invalid API Key! Please check your Gemini API key in settings and make sure it's correct.";
            } else if (data.error.message.includes("quota") || data.error.message.includes("RESOURCE_EXHAUSTED")) {
                return "⏰ You've reached your API quota limit. Please try again later or check your Google AI Studio dashboard.";
            } else if (data.error.message.includes("not found") || data.error.message.includes("not supported")) {
                return `🔧 Full Error: ${fullError}\n\nThis usually means the model name or API version is incorrect. Please check the browser console (F12) for details.`;
            } else {
                return `⚠️ API Error: ${fullError}`;
            }
        }

        // Validate response structure
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            console.error("Unexpected API response structure:", data);
            return "🤔 I received an unexpected response. Please try asking your question again.";
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Gemini Fetch Error:", error);

        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return "🌐 Network error! Please check your internet connection and try again.";
        }

        return "⚡ I'm having trouble connecting to my AI brain. Please check your internet connection or API key.";
    }
};
