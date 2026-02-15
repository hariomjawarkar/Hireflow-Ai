// Test Gemini API with correct model
const API_KEY = "AIzaSyCAwFNYxme9MqX-4bw5EXTeU1EcZwNyIOw";

async function testCorrectModel() {
    console.log("🔍 Testing with gemini-2.5-flash model...\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: "Hello! Please introduce yourself as the HireFlow AI Assistant in one friendly sentence."
                    }]
                }]
            })
        });

        console.log("📡 Response Status:", response.status);
        console.log("📡 Response OK:", response.ok);
        console.log("");

        const data = await response.json();

        if (data.error) {
            console.error("❌ ERROR:");
            console.error(JSON.stringify(data.error, null, 2));
        } else if (data.candidates && data.candidates[0]) {
            console.log("✅ SUCCESS! The API is working!");
            console.log("\n🤖 AI Response:");
            console.log(data.candidates[0].content.parts[0].text);
        } else {
            console.log("⚠️ Unexpected response:");
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("❌ Network Error:", error.message);
    }
}

testCorrectModel();
