import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaCheck } from 'react-icons/fa';

const CardMessage = ({ message, sender, image }) => {
  const [copiedText, setCopiedText] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 1500);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 1500);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className={`my-2 p-2 ${sender === 'bot' ? 'bg-gray-200' : 'bg-blue-200'} rounded-lg`}>
      {image && (
        <img src={image} alt="Gambar" className="w-full h-64 object-cover rounded-lg mb-2" />
      )}
      {message.map((part, index) => {
        if (part.type === 'text') {
          return (
            <div key={index} className="flex items-center">
              <p className="whitespace-pre-wrap">{part.content}</p>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleCopyText(part.content)}
              >
                {copiedText === part.content ? (
                  <FaCheck />
                ) : (
                  <FaCopy />
                )}
                <span className={`ml-1 ${copiedText === part.content ? 'opacity-100' : 'opacity-0'}`}>Tersalin</span>
              </button>
            </div>
          );
        } else if (part.type === 'code') {
          return (
            <div key={index} className="flex items-center">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                className="rounded-md my-1"
              >
                {part.content.trim()}
              </SyntaxHighlighter>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleCopyCode(part.content)}
              >
                {copiedCode === part.content ? (
                  <FaCheck />
                ) : (
                  <FaCopy />
                )}
                <span className={`ml-1 ${copiedCode === part.content ? 'opacity-100' : 'opacity-0'}`}>Tersalin</span>
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CardMessage;
