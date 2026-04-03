export default function HomePage() {
  return (
    <main style={{ 
      padding: '24px', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>🏗️ AI Fiesta Estimator</h1>
      <p style={{ fontSize: '16px', color: '#666' }}>
        Professional construction cost estimation powered by Google Gemini AI
      </p>
      <div style={{ marginTop: '24px' }}>
        <a 
          href="/estimator" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          Start Estimating
        </a>
      </div>
    </main>
  );
}
