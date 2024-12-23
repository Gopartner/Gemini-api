import React, { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

const SimpleTest = () => {
  const [copied, setCopied] = useState(null);
  const textToCopy = "Teks yang akan disalin";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(textToCopy);
        setTimeout(() => setCopied(null), 1500);
      });
  };

  return (
    <div>
      <p>{textToCopy}</p>
      <button onClick={handleCopy}>
        {copied === textToCopy ? <FaCheck /> : <FaCopy />}
        <span className={`ml-1 ${copied === textToCopy ? 'opacity-100' : 'opacity-0'}`}>Tersalin</span>
      </button>
    </div>
  );
};

export default SimpleTest;
