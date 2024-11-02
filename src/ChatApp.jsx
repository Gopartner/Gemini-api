import React, { useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/prism"; // Ganti gaya sesuai yang tersedia

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_KEY}`;

    const handleSend = async () => {
        if (!input) return;

        const userMessage = { text: input, type: "user" };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post(url, {
                contents: [{ parts: [{ text: input }] }],
            });
            const responseText = response.data.candidates[0]?.content?.parts[0]?.text;

            if (responseText) {
                const aiMessage = { text: responseText, type: "ai" };
                setMessages((prev) => [...prev, aiMessage]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setInput("");
    };

    return (
        <div className="chat-app">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.type}>
                        {msg.type === "ai" ? (
                            <SyntaxHighlighter language="javascript" style={docco}>
                                {msg.text}
                            </SyntaxHighlighter>
                        ) : (
                            <p>{msg.text}</p>
                        )}
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
        </div>
    );
};

export default ChatApp;

