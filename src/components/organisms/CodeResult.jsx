import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';

const CodeResult = ({ data, title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="bg-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleCopy}
        >
          {copied ? 'Tersalin' : <FaCopy />}
        </button>
      </div>
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        className="rounded-md"
      >
        {data}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeResult;
