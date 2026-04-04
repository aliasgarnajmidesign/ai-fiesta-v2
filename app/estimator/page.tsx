"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function PremiumEstimatorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
      color: "#1d1d1f",
      overflow: "hidden"
    }}>
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
        .message-anim {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .thinking-anim {
          animation: pulse 1.5s infinite ease-in-out;
        }
        /* Hide scrollbar for clean Apple look */
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>

      {/* Header */}
      <header style={{
        padding: "20px 40px",
        background: "rgba(250, 250, 250, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "center"
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "20px", 
          fontWeight: 600, 
          letterSpacing: "-0.5px",
          background: "linear-gradient(90deg, #1d1d1f, #434344)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          AI Fiesta System
        </h1>
      </header>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "40px 20px 120px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "10vh", color: "#86868b", animation: "fadeIn 1s ease" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 600, color: "#1d1d1f", marginBottom: "12px", letterSpacing: "-1px" }}>
              How can I assist you today?
            </h2>
            <p style={{ fontSize: "16px", fontWeight: 400 }}>
              Ask for cost estimates, construction data, or design ideas.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className="message-anim" style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
          }}>
            <div style={{
              maxWidth: "75%",
              padding: "16px 20px",
              borderRadius: m.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              background: m.role === "user" ? "#000000" : "#ffffff",
              color: m.role === "user" ? "#ffffff" : "#1d1d1f",
              boxShadow: m.role === "user" ? "0 4px 14px rgba(0,0,0,0.1)" : "0 2px 10px rgba(0,0,0,0.03)",
              border: m.role === "user" ? "none" : "1px solid rgba(0,0,0,0.05)",
              fontSize: "15px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-anim" style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className="thinking-anim" style={{
              padding: "16px 20px", borderRadius: "20px", background: "#ffffff", color: "#86868b", border: "1px solid rgba(0,0,0,0.05)", fontSize: "15px"
            }}>
              Processing data...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Floating Input Area */}
      <div style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "760px",
        padding: "0 20px",
        zIndex: 100
      }}>
        <form onSubmit={handleSubmit} style={{
          display: "flex",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "30px",
          padding: "8px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your request here..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              fontSize: "16px",
              outline: "none",
              color: "#1d1d1f",
              fontFamily: "inherit"
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              padding: "10px 24px",
              background: isLoading || !input.trim() ? "#e5e5ea" : "#000000",
              color: isLoading || !input.trim() ? "#86868b" : "#ffffff",
              border: "none",
              borderRadius: "24px",
              fontWeight: 500,
              fontSize: "15px",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              transition: "background 0.2s ease"
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
