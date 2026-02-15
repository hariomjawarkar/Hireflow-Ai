// List available Gemini models
const API_KEY = "AIzaSyCAwFNYxme9MqX-4bw5EXTeU1EcZwNyIOw";

async function listModels() {
    console.log("📋 Fetching available Gemini models...\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Available models that support generateContent:\n");
            data.models
                .filter(model => model.supportedGenerationMethods?.includes('generateContent'))
                .forEach(model => {
                    console.log(`📌 ${model.name}`);
                    console.log(`   Display Name: ${model.displayName}`);
                    console.log(`   Description: ${model.description}`);
                    console.log("");
                });
        } else {
            console.log("Response:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
