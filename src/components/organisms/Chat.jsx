// src/components/organisms/Chat.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../store/slices/chatSlice';
import Message from './Message';
import axios from 'axios';

const Chat = () => {
  const [input, setInput] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`;

  const sendMessage = async () => {
    if (!input.trim()) return;
    dispatch(addMessage({ message: input, sender: 'user' }));

    try {
      // Buat konteks percakapan dari pesan terakhir (misalnya, 5 pesan terakhir)
      const lastMessages = messages.slice(-5); // Ambil 5 pesan terakhir sebagai konteks
      const context = lastMessages.map((msg) => `${msg.sender}: ${msg.message}`).join('\n');

      // Susun prompt dengan konteks percakapan
      const prompt = `${context}\nuser: ${input}`;

      // Kirim permintaan ke API Gemini dengan konteks
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const responseText = response.data.candidates[0]?.content?.parts[0]?.text;

      if (responseText) {
        dispatch(addMessage({ message: responseText, sender: 'bot' }));
      } else {
        dispatch(addMessage({ message: 'AI tidak dapat merespons.', sender: 'bot' }));
      }
    } catch (error) {
      console.error('Error:', error);
      dispatch(addMessage({ message: 'Terjadi kesalahan dalam mendapatkan respons dari AI.', sender: 'bot' }));
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md mb-4">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} sender={msg.sender} />
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

