import axios from 'axios';
import readline from 'readline';
import chalk from 'chalk';
import 'dotenv/config';

const apiKey = process.env.VITE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display welcome message in a single-column table format
function displayWelcomeMessage() {
  const message = 'Welcome to Gemini AI Chat! Type your question or type "exit" to leave.';
  
  const tableData = [
    { Message: message }
  ];
  
  console.table(tableData);
}

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

    const candidates = response.data.candidates;
    if (candidates && candidates.length > 0) {
      const geminiResponse = candidates[0]?.content?.parts[0]?.text;
      if (geminiResponse) {
        console.log(chalk.blue('Gemini Response:'), chalk.green(geminiResponse));
      } else {
        console.error(chalk.red('No valid content found in candidates.'));
      }
    } else {
      console.error(chalk.red('No candidates returned from Gemini API.'));
    }
  } catch (error) {
    if (error.response) {
      console.error(chalk.red('Error Status:'), error.response.status);
      console.error(chalk.red('Error Data:'), error.response.data);
    } else {
      console.error(chalk.red('Request Error:'), error.message);
    }
  }
}

// Function to start chat
function startChat() {
  rl.question(chalk.yellow('You: '), async (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Exiting chat...'));
      rl.close();
      return;
    }
    await fetchGeminiData(input);
    startChat();
  });
}

// Display welcome message in a single-column table
displayWelcomeMessage();
startChat();

