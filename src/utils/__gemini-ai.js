import axios from 'axios';
import readline from 'readline';
import 'dotenv/config';

const apiKey = process.env.VITE_API_KEY; // Pastikan Anda sudah menambahkan API Key ke file .env
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

// Set up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to fetch data from Gemini API
async function fetchGeminiData(query) {
  try {
    const response = await axios.post(
      url,
      {
        contents: [
          {
            parts: [{ text: query }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Access the content of the response
    const candidates = response.data.candidates;
    if (candidates && candidates.length > 0) {
      const geminiResponse = candidates[0]?.content?.parts[0]?.text; // Akses teks langsung
      if (geminiResponse) {
        console.log('Gemini Response:', geminiResponse); // Tampilkan hanya teks
      } else {
        console.error('No valid content found in candidates.');
      }
    } else {
      console.error('No candidates returned from Gemini API.');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error Status:', error.response.status);
      console.error('Error Data:', error.response.data);
    } else {
      console.error('Request Error:', error.message);
    }
  }
}

// Function to start chat
function startChat() {
  rl.question('You: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Exiting chat...');
      rl.close();
      return;
    }
    await fetchGeminiData(input);
    startChat(); // Recur to ask for the next input
  });
}

// Start the chat
console.log('Welcome to Gemini AI Chat! Type your question or type "exit" to leave.');
startChat();

