# HireFlow Chatbot - Gemini AI Integration Guide

## ✅ Integration Status: **COMPLETE**

The Gemini AI integration is fully implemented and ready to use!

## 🎯 Features

- **Intelligent AI Responses**: Powered by Google's Gemini 1.5 Flash model
- **Context-Aware**: Understands HireFlow platform context
- **Persistent API Key**: Saves to localStorage for convenience
- **Fallback System**: Works without API key using local knowledge base
- **Error Handling**: Graceful degradation on API failures
- **Professional UI**: Settings panel for easy API key management

## 🚀 How to Use

### For End Users:

1. **Get Your Free API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Click "Get API Key" → "Create API Key"
   - Copy the generated key

2. **Configure the Chatbot**
   - Click the floating "AI HELP" button (bottom-right corner)
   - Click the gear icon (⚙️) in the chatbot header
   - Paste your API key in the input field
   - Click "Save"

3. **Start Chatting**
   - Type your question in the input field
   - Press Enter or click the send button
   - The AI will respond using Gemini's intelligence!

## 🔧 Technical Details

### Files Involved:

1. **`src/api/geminiService.js`**
   - Handles API communication with Gemini
   - Endpoint: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent`
   - Includes enhanced error handling and context injection
   - User-friendly error messages with emojis

2. **`src/components/Chatbot.jsx`**
   - Main chatbot UI component
   - Manages API key state and localStorage
   - Implements dual-mode (AI vs local) responses
   - Settings panel for API key input

3. **`src/styles/chatbot.css`**
   - Chatbot styling and animations

### API Limits (Free Tier):
- **15 requests per minute (RPM)**
- **1 million tokens per minute (TPM)**
- Sufficient for typical chatbot usage

### How It Works:

```javascript
// When user sends a message:
if (apiKey) {
    // Use Gemini AI
    botResponse = await getGeminiResponse(currentInput, apiKey);
} else {
    // Fallback to local knowledge base
    botResponse = getBotResponse(currentInput);
}
```

## 🧪 Testing

### Test Without API Key:
1. Open chatbot
2. Type: "What is HireFlow?"
3. Should get local knowledge base response

### Test With API Key:
1. Add your Gemini API key in settings
2. Type: "How can I improve my resume for tech jobs?"
3. Should get intelligent AI-powered response

### Verify API Key Persistence:
1. Add API key and save
2. Refresh the page
3. Open chatbot settings
4. API key should still be there (shown as dots for security)

## 🐛 Troubleshooting

### "API Key missing" error:
- Make sure you've entered the API key in settings
- Click "Save" after pasting the key

### "I'm having trouble connecting..." error:
- Check your internet connection
- Verify the API key is correct
- Check if you've exceeded the free tier limits

### "API Error: ..." message:
- The API key might be invalid
- You may have exceeded rate limits
- Check the browser console for detailed error messages

## 📊 Monitoring

Open browser DevTools (F12) → Console to see:
- API request/response logs
- Error messages
- Connection status

## 🎨 Customization

### Change AI Personality:
Edit the system prompt in `src/api/geminiService.js` (lines 21-26):

```javascript
text: `You are the HireFlow AI Assistant, a professional career coach and hiring expert. 
Context: The user is currently on the HireFlow platform. 
Your goal is to help them with job searches, resume tips, interview prep, and navigating the app.
Keep answers professional, encouraging, and concise. 

User Question: ${userPrompt}`
```

### Modify Fallback Responses:
Edit the `getBotResponse()` function in `src/components/Chatbot.jsx` (lines 24-75)

## ✨ Next Steps

The integration is complete! Users can now:
1. Use the chatbot without an API key (local responses)
2. Add their own Gemini API key for AI-powered responses
3. Get intelligent career advice and platform help

## 📝 Notes

- API keys are stored in browser localStorage (client-side only)
- No backend API key management needed
- Each user provides their own free API key
- Privacy-focused: conversations are not stored server-side
