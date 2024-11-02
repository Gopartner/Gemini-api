import React from 'react';
import GeminiAPI from '@o/GeminiAPI';

function App() {
  return (
    <div className="App">
      <header className="text-center p-4 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold">Gemini API Data Fetch Example</h1>
      </header>
      <main className="p-4">
        <GeminiAPI />
      </main>
    </div>
  );
}

export default App;

