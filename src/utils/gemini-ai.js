import axios from 'axios';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs';
import 'dotenv/config';
import { highlight } from 'cli-highlight';
import wrapAnsi from 'wrap-ansi'; 

const apiKey = process.env.VITE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

// Function to display welcome message
function displayWelcomeMessage() {
  console.log(chalk.bold(`\n🤖 Apa yang bisa saya bantu?`));
}

// Function to highlight bold text with **
function highlightBoldText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
    return chalk.red.bold(p1); // Ubah warna sesuai keinginan
  });
}

// Function to format response text with wrap-ansi
function formatResponseText(text, lineLength = 80) {
  const highlightedText = highlightBoldText(text);
  return wrapAnsi(highlightedText, lineLength); // Bungkus teks dengan kata utuh
}

// Function to fetch data from Gemini API
async function fetchGeminiData(query) {
  const spinner = ora('...').start();

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
      const geminiResponse = candidates[0]?.content?.parts[0];
      if (geminiResponse) {
        const responseText = geminiResponse.text;

        console.log(chalk.blue('🤖 Gemini Response:'));

        // Format response text to new lines
        const formattedText = formatResponseText(responseText);

        // Highlight code if it contains code blocks
        let outputText;
        if (formattedText.includes('```')) {
          const codeBlock = formattedText.match(/```(\w*)\n([\s\S]*?)```/);
          if (codeBlock) {
            const language = codeBlock[1] || 'plaintext';
            const code = codeBlock[2];
            const highlightedCode = highlight(code, { language: language.trim() });
            outputText = formattedText.replace(codeBlock[0], highlightedCode);
            console.log(highlightedCode);
          }
        } else {
          console.log(chalk.green(formattedText));
          outputText = formattedText;
        }

        // Save response to file
        saveResponseToFile(query, outputText);

        console.log(chalk.gray('-'.repeat(50)));
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
  } finally {
    spinner.stop();
  }
}

// Function to save response to a file
function saveResponseToFile(query, responseText) {
  const logEntry = `\nQuery: ${query}\nResponse: ${responseText}\n${'-'.repeat(50)}\n`;
  fs.appendFile('responses.txt', logEntry, (err) => {
    if (err) {
      console.error(chalk.red('Error saving response to file:', err));
    } else {
      console.log(chalk.yellow('Response saved to responses.txt'));
    }
  });
}

// Function to start chat
async function startChat() {
  while (true) {
    const { input } = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: chalk.yellow('kamu:'),
      },
    ]);

    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Exiting chat...'));
      break;
    }

    await fetchGeminiData(input);
  }
}

// Start the application
displayWelcomeMessage();
startChat();

