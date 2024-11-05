import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ message, sender }) => {
  // Periksa apakah message adalah array yang valid
  if (!Array.isArray(message)) {
    console.error("Error: 'message' harus berupa array.", message);
    return null;
  }

  return (
    <div className={`my-2 p-2 ${sender === 'bot' ? 'bg-gray-200' : 'bg-blue-200'} rounded-lg`}>
      {message.map((part, index) => {
        // Pastikan setiap part memiliki struktur yang benar
        if (typeof part !== 'object' || !part.type || !part.content) {
          console.error("Error: Setiap elemen 'message' harus memiliki struktur { type, content }.", part);
          return null;
        }

        // Render sesuai tipe: 'code' atau 'text'
        return part.type === 'code' ? (
          <SyntaxHighlighter
            key={index}
            language="javascript"
            style={vscDarkPlus}
            className="rounded-md my-1"
          >
            {part.content.trim()}
          </SyntaxHighlighter>
        ) : (
          <p key={index} className="whitespace-pre-wrap">
            {part.content}
          </p>
        );
      })}
    </div>
  );
};

export default ChatMessage;

