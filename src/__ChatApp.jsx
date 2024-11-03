import React, { useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // Gaya dark code editor

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`;

    const handleSend = async () => {
        if (!input) return;

        const userMessage = { text: input, type: "user" };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post(url, {
                contents: [{ parts: [{ text: input }] }],
            });
            const responseText = response.data.candidates[0]?.content?.parts[0]?.text;

            if (responseText) {
                const aiMessage = { text: responseText, type: "ai" };
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setInput("");
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <div className="space-y-4 mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded ${
                            msg.type === "user"
                                ? "bg-blue-500 text-white text-right"
                                : "bg-gray-800 text-white text-left"
                        }`}
                    >
                        {msg.type === "ai" && msg.text.includes("```") ? (
                            // Pisahkan kode blok dari teks biasa
                            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                                {msg.text}
                            </SyntaxHighlighter>
                        ) : (
                            <p>{msg.text}</p>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    className="flex-grow p-2 border rounded-l"
                    placeholder="Tulis pesan di sini..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                    onClick={handleSend}
                >
                    Kirim
                </button>
            </div>
        </div>
    );
};

export default ChatApp;

