import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        color: "#1f2937",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "600px", padding: "24px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", margin: "0 0 16px 0" }}>
          🏗️ AI Fiesta Estimator
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", margin: "0 0 32px 0" }}>
          Smart construction cost estimation powered by AI
        </p>

        <Link href="/estimator">
          <button
            style={{
              padding: "16px 48px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#2563eb",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Start Estimating
          </button>
        </Link>

        <div style={{ marginTop: "48px", fontSize: "14px", color: "#9ca3af" }}>
          <p>✨ Get instant construction cost estimates</p>
          <p>💰 Material & labor breakdowns</p>
          <p>📊 UAE-specific pricing</p>
        </div>
      </div>
    </div>
  );
}
