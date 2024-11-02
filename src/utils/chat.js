// chat.js
import inquirer from 'inquirer';
import chalk from 'chalk';

export async function startChat(fetchGeminiData) {
  const cursor = 'Kamu:';
  let showingCursor = true;
  let inputHistory = '';

  // Start blinking cursor while waiting for user input
  let cursorBlinkInterval = setInterval(() => {
    process.stdout.write(`\r${showingCursor ? cursor : ' '}`);
    showingCursor = !showingCursor;
  }, 500);

  while (true) {
    const { input } = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: chalk.yellow('❓ '),
        prefix: '', // Remove default prefix to avoid double emoji
      },
    ]);

    // Stop blinking when input is received
    clearInterval(cursorBlinkInterval);
    process.stdout.write(`\r ${input}   \n`); // Clear the cursor line

    if (input.toLowerCase() === 'exit') {
      console.log(chalk.yellow('Exiting chat...'));
      break;
    }

    await fetchGeminiData(input);

    // Restart blinking cursor for the next input
    inputHistory = input; // Save the current input for next prompt
    showingCursor = true; // Reset cursor visibility
    cursorBlinkInterval = setInterval(() => {
      process.stdout.write(`\r${showingCursor ? cursor : ' '}`);
      showingCursor = !showingCursor;
    }, 500);
  }
}

