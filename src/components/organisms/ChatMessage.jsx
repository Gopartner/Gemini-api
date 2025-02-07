import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';

const ChatMessage = ({ message, sender }) => {
  const [copiedText, setCopiedText] = useState(null);
                                              const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 1500); // Reset setelah 1.5 detik
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

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

        let contentElement;
        let copyButton = null;

        if (part.type === 'code') {
          contentElement = (
            <SyntaxHighlighter
              key={index}
              language="javascript"
              style={vscDarkPlus}
              className="rounded-md my-1"
            >
              {part.content.trim()}
            </SyntaxHighlighter>
          );
        } else if (part.type === 'text') { // Tambahkan kondisi untuk tipe 'text'
          contentElement = (
            <p key={index} className="whitespace-pre-wrap">
              {part.content}
            </p>
          );
          // Tambahkan tombol copy hanya jika panjang teks > 0
          if (part.content.trim().length > 0) {
            copyButton = (
              <button
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleCopy(part.content.trim())}
              >
                {copiedText === part.content.trim() ? (
                  <FaCheck />
                ) : (
                  <FaCopy />
                )}
                <span className={`ml-1 ${copiedText === part.content.trim() ? 'opacity-100' : 'opacity-0'}`}>Tersalin</span>
              </button>
            );
          }
        } else {
          console.warn(`Tipe pesan yang tidak dikenal: ${part.type}`);
          contentElement = <span key={index}>Pesan tidak didukung</span>;
        }

        return (
          <div key={index} className="flex items-center">
            {contentElement}
            {copyButton}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessage;
