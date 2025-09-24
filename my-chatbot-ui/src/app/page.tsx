"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.response }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Error: Could not connect to backend." }
      ]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  return (
    <div className="font-sans grid grid-rows-[60px_1fr_40px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 bg-gray-50">
      <header className="row-start-1 w-full max-w-xl flex items-center justify-between px-4 py-2 bg-white rounded shadow mb-2">
        <h1 className="text-2xl font-bold text-blue-600">My Chatbot</h1>
        <span className="text-sm text-gray-400">Powered by LM Studio</span>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-xl">
        <div className="flex flex-col gap-4 w-full overflow-y-auto max-h-[60vh] p-2 border rounded bg-white shadow">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] text-black ${
                msg.role === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 w-full"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            ref={inputRef}
            className="flex-1 border rounded px-3 py-2 focus:outline-none text-black"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </main>
      <footer className="row-start-3 w-full max-w-xl flex items-center justify-center px-4 py-2 bg-white rounded shadow mt-2 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} My Chatbot. All rights reserved.
      </footer>
    </div>
  );
}
