import readline from 'readline';
import { highlight } from 'cli-highlight';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>> paste | ketikan sesuatu.\n'
});

let inputBuffer = []; // Buffer untuk menyimpan input

console.log('Tekan Ctrl+D (Unix) atau Ctrl+Z (Windows) untuk mengakhiri input.');

rl.prompt();

rl.on('line', (input) => {
  // Memeriksa apakah input adalah kode
  if (input.trim() !== '') {
    // Jika input tidak kosong, tambahkan ke buffer
    inputBuffer.push(input);
  }
  rl.prompt(); // Minta input lagi
});

// Ketika pengguna menutup input (Ctrl+D atau Ctrl+Z)
rl.on('close', () => {
  // Gabungkan semua input menjadi satu string
  const completeInput = inputBuffer.join('\n').trim();

  // Tampilkan hasil dengan highlight hanya jika ada input
  if (completeInput) {
    console.log('>>> Respon:');
    console.log('```javascript');
    console.log(highlight(completeInput, { language: 'javascript', ignoreIllegals: true }));
    console.log('```');
  } else {
    console.log('Tidak ada kode yang dimasukkan.');
  }

  console.log('Aplikasi ditutup.');
  process.exit(0);
});

