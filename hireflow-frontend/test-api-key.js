// Test Gemini API Key
const API_KEY = "AIzaSyCAwFNYxme9MqX-4bw5EXTeU1EcZwNyIOw";

async function testGeminiAPI() {
    console.log("🔍 Testing Gemini API with your key...\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Hello, please introduce yourself in one sentence."
                    }]
                }]
            })
        });

        console.log("📡 Response Status:", response.status);
        console.log("📡 Response OK:", response.ok);
        console.log("");

        const data = await response.json();

        if (data.error) {
            console.error("❌ ERROR FOUND:");
            console.error("Error Code:", data.error.code);
            console.error("Error Message:", data.error.message);
            console.error("Error Status:", data.error.status);
            console.error("\nFull Error Object:", JSON.stringify(data.error, null, 2));
        } else if (data.candidates && data.candidates[0]) {
            console.log("✅ SUCCESS!");
            console.log("AI Response:", data.candidates[0].content.parts[0].text);
        } else {
            console.log("⚠️ Unexpected response structure:");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ NETWORK ERROR:");
        console.error(error.message);
    }
}

testGeminiAPI();
