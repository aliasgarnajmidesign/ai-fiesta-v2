"use client";

import { useChat } from "ai/react";

export default function EstimatorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#1f2937",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          color: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
          🏗️ AI Fiesta Estimator
        </h1>
        <p style={{ margin: "4px 0 0 0", fontSize: "14px", opacity: 0.9 }}>
          Construction cost estimation for UAE projects
        </p>
      </div>

      {/* Messages Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#9ca3af",
              paddingTop: "48px",
            }}
          >
            <p style={{ fontSize: "16px" }}>👋 Welcome to AI Fiesta Estimator</p>
            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Ask for construction cost estimates, material breakdowns, labor costs, or project planning advice.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: message.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px 16px",
                borderRadius: "12px",
                background: message.role === "user" ? "#2563eb" : "#e5e7eb",
                color: message.role === "user" ? "white" : "#1f2937",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                lineHeight: "1.5",
              }}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              marginBottom: "16px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                background: "#e5e7eb",
                color: "#1f2937",
              }}
            >
              ✨ AI is thinking...
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "12px 16px",
              borderRadius: "12px",
              background: "#fee2e2",
              color: "#991b1b",
              border: "1px solid #fecaca",
            }}
          >
            ❌ Error: {String(error)}
          </div>
        )}
      </div>

      {/* Input Form - Fixed Bottom */}
      <div
        style={{
          padding: "16px 24px 32px 24px",
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={isLoading ? "Waiting for response..." : "Ask about construction costs..."}
            disabled={isLoading}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
              cursor: isLoading ? "not-allowed" : "text",
              opacity: isLoading ? 0.6 : 1,
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: "12px 24px",
              background: isLoading ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
