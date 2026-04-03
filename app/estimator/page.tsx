'use client';
import { useChat } from 'ai/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch" style={{ color: '#000' }}>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          <span className="font-bold">{m.role === 'user' ? 'User: ' : 'AI: '}</span>
          {m.content}
        </div>
      ))}

      {error && (
        <div style={{ color: 'red', marginBottom: 12 }}>
          {String(error)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl" style={{ background: '#fff' }}>
        <input
          className="w-full p-2 outline-none"
          value={input}
          placeholder={isLoading ? 'Thinking…' : 'Say something...'}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}
