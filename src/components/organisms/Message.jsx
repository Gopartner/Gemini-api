// src/components/organisms/Message.jsx
import React from 'react';

const Message = ({ message, sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Message;

