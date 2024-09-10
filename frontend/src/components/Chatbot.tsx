import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>(""); // 用户输入
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  ); // 消息记录
  const apiKey = process.env.REACT_APP_API_KEY;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 更新消息记录
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
    ]);
    setInput(""); // 清空输入框

    // 调用 Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        }),
      }
    );

    // 处理 API 响应
    const data = await response.json();
    if (response.ok) {
      // 提取机器人的回复文本
      const botMessage =
        data.candidates[0]?.content.parts[0]?.text ||
        "Sorry, I didn’t understand that.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botMessage, isUser: false },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: " + data.error.message, isUser: false },
      ]);
    }
  };

  return (
    <div
      className="chatbot-container"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        zIndex: 1000,
        padding: "10px",
      }}
    >
      <h2 style={{ fontSize: "16px", margin: "0 0 10px" }}>Chatbot</h2>
      <div
        className="messages"
        style={{
          maxHeight: "250px",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.isUser ? "right" : "left" }}>
            <p
              style={{
                background: msg.isUser ? "#d1e7dd" : "#f8d7da",
                padding: "8px",
                borderRadius: "5px",
                display: "inline-block",
                maxWidth: "80%",
                margin: "5px 0",
              }}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
