import React, { useState } from 'react';

const GeminiAPI = () => {
  const [responseText, setResponseText] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchGeminiData = async () => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: 'Explain how AI works' }],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseText(data.contents[0].parts[0].text || 'No response text available.');
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Gemini API Response</h2>
      <button
        onClick={fetchGeminiData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Fetch AI Explanation
      </button>
      {responseText && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold">Response:</h3>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiAPI;

