import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '@s/chatSlice';
import ChatMessage from '@o/ChatMessage';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`;

  // Fungsi untuk memecah respons menjadi bagian teks dan kode
  const parseResponse = (responseText) => {
    const regex = /```(.*?)\n([\s\S]*?)```/g; // Regex untuk memisahkan blok kode
    let parts = [];
    let lastIndex = 0;

    // Cari dan pisahkan blok kode dari teks biasa
    let match;
    while ((match = regex.exec(responseText)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: responseText.slice(lastIndex, match.index).trim() });
      }
      parts.push({ type: 'code', content: match[2].trim() });
      lastIndex = regex.lastIndex;
    }

    // Tambahkan teks yang tersisa setelah blok kode terakhir
    if (lastIndex < responseText.length) {
      parts.push({ type: 'text', content: responseText.slice(lastIndex).trim() });
    }

    return parts;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Tambahkan pesan user ke dalam state
    dispatch(addMessage({
      message: [{ type: 'text', content: input }],
      sender: 'user'
    }));

    try {
      // Ambil 5 pesan terakhir sebagai konteks percakapan
      const lastMessages = messages.slice(-5);
      const context = lastMessages.map((msg) => `${msg.sender}: ${msg.message.map((part) => part.content).join(' ')}`).join('\n');
      const prompt = `${context}\nuser: ${input}`;

      // Kirim permintaan ke AI
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }],
      });
      
      const responseText = response.data.candidates[0]?.content?.parts[0]?.text;

      // Pisahkan respons ke dalam bagian teks dan kode
      const parts = parseResponse(responseText);

      // Tambahkan pesan AI ke dalam state
      dispatch(addMessage({ message: parts, sender: 'bot' }));
    } catch (error) {
      console.error('Error:', error);
      dispatch(addMessage({ message: [{ type: 'text', content: 'Terjadi kesalahan dalam mendapatkan respons dari AI.' }], sender: 'bot' }));
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md mb-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} sender={msg.sender} />
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Tulis pesan..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Chat;

