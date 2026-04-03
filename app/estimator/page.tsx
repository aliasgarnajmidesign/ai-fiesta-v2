"use client";
import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch text-black">
      {messages.map(m => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          <span className="font-bold">{m.role === 'user' ? 'User: ' : 'AI: '}</span>
          {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white">
        <input
          className="w-full p-2 outline-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
