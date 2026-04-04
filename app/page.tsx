"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function RoyalProfessionalLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Royal Professional Styling */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .royal-gradient {
          background: linear-gradient(135deg, 
            #0c0c0c 0%, 
            #1a1a1a 25%, 
            #2d1b3d 50%, 
            #1a1a1a 75%, 
            #0c0c0c 100%
          );
        }

        .gold-accent {
          background: linear-gradient(135deg, #d4af37, #f7d794, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .mirror-reflection {
          position: relative;
        }
        
        .mirror-reflection::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 30%,
            transparent 100%
          );
          transform: scaleY(-1) translateY(-10px);
          opacity: 0.6;
          pointer-events: none;
          border-radius: 20px;
        }

        .glass-professional {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
        }

        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .elegant-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .text-shadow-royal {
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        ::-webkit-scrollbar { width: 0; }
        
        /* Subtle parallax - no crazy movement */
        .parallax-subtle {
          transform: translateY($${scrollY * 0.1}px);
        }
      `}</style>

      <div className="royal-gradient" style={{ minHeight: "100vh", color: "#ffffff" }}>
        
        {/* Royal Navigation */}
        <nav style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "25px 50px",
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          <div style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: "28px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "600",
              letterSpacing: "-0.5px"
            }} className="gold-accent">
              AI Fiesta
            </div>
            <div style={{ 
              display: "flex", 
              gap: "40px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "400"
            }}>
              {["Features", "Solutions", "Pricing", "Contact"].map((item) => (
                <a 
                  key={item}
                  href={`#$${item.toLowerCase()}`}
                  className="smooth-transition"
                  style={{ 
                    textDecoration: "none", 
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "16px",
                    letterSpacing: "0.5px"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#d4af37"}
                  onMouseLeave={(e) => e.target.style.color = "rgba(255, 255, 255, 0.8)"}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Hero Section - Professional & Royal */}
        <section style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
          position: "relative"
        }}>
          
          {/* Subtle Background Pattern */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
            `,
            zIndex: 1
          }} />

          <div style={{ position: "relative", zIndex: 10 }}>
            
            {/* Professional Logo with Mirror Effect */}
            <div className="mirror-reflection" style={{
              fontSize: "80px",
              marginBottom: "50px",
              padding: "30px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(212, 175, 55, 0.1))",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              display: "inline-block"
            }}>
              🏗️
            </div>

            {/* Royal Heading */}
            <h1 style={{
              fontSize: "clamp(42px, 6vw, 72px)",
              fontFamily: "'Playfair Display', serif",
              fontWeight: "600",
              lineHeight: "1.2",
              marginBottom: "30px",
              letterSpacing: "-1px"
            }} className="text-shadow-royal">
              <span className="gold-accent">AI Fiesta</span><br />
              <span style={{ color: "#ffffff" }}>Construction Estimator</span>
            </h1>

            {/* Professional Tagline */}
            <p style={{
              fontSize: "22px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: "300",
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "700px",
              lineHeight: "1.6",
              marginBottom: "60px",
              letterSpacing: "0.5px"
            }}>
              Professional construction cost estimation powered by advanced AI. 
              <br />Trusted by leading contractors across the UAE.
            </p>

            {/* Premium CTA */}
            <Link href="/estimator">
              <button 
                className="glass-professional smooth-transition elegant-hover"
                style={{
                  padding: "20px 60px",
                  fontSize: "18px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "500",
                  color: "#000000",
                  background: "linear-gradient(135deg, #d4af37, #f7d794)",
                  border: "none",
                  borderRadius: "50px",
                  cursor: "pointer",
                  letterSpacing: "1px",
                  textTransform: "uppercase"
                }}
              >
                Start Professional Estimate
              </button>
            </Link>

            {/* Trust Indicators */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "50px",
              marginTop: "80px",
              flexWrap: "wrap"
            }}>
              {[
                { icon: "⚡", text: "Enterprise Grade", desc: "99.9% uptime" },
                { icon: "🔒", text: "Bank-Level Security", desc: "ISO 27001 certified" },
                { icon: "🏆", text: "UAE Market Leader", desc: "500+ contractors" },
                { icon: "📊", text: "Precision Analytics", desc: "±2% accuracy" }
              ].map((item, index) => (
                <div key={index} className="glass-professional smooth-transition elegant-hover" style={{
                  padding: "25px 20px",
                  borderRadius: "15px",
                  textAlign: "center",
                  minWidth: "200px"
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{item.icon}</div>
                  <div style={{ 
                    fontSize: "16px", 
                    fontWeight: "500", 
                    color: "#d4af37",
                    marginBottom: "5px"
                  }}>
                    {item.text}
                  </div>
                  <div style={{ 
                    fontSize: "14px", 
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "'Inter', sans-serif"
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Features Section */}
        <section style={{
          padding: "120px 50px",
          background: "rgba(0, 0, 0, 0.5)",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)"
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <h2 style={{
                fontSize: "48px",
                fontFamily: "'Playfair Display', serif",
                fontWeight: "600",
                marginBottom: "25px",
                letterSpacing: "-1px"
              }} className="gold-accent">
                Enterprise Solutions
              </h2>
              <p style={{
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.8)",
                fontFamily: "'Inter', sans-serif",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                Built for the most demanding construction projects in the UAE
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "40px"
            }}>
              {[
                {
                  title: "AI-Powered Estimation",
                  description: "Advanced machine learning algorithms trained on UAE construction data",
                  features: ["Real-time market pricing", "Material optimization", "Labor cost analysis"]
                },
                {
                  title: "Regulatory Compliance",
                  description: "Fully compliant with Dubai Municipality and Abu Dhabi regulations",
                  features: ["Building code integration", "Safety requirements", "Environmental standards"]
                },
                {
                  title: "Enterprise Integration",
                  description: "Seamlessly integrates with existing construction management systems",
                  features: ["API connectivity", "Data export", "Custom workflows"]
                }
              ].map((service, index) => (
                <div key={index} className="glass-professional smooth-transition elegant-hover" style={{
                  padding: "40px",
                  borderRadius: "20px"
                }}>
                  <h3 style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    marginBottom: "20px",
                    color: "#d4af37",
                    fontFamily: "'Playfair Display', serif"
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.8)",
                    marginBottom: "25px",
                    lineHeight: "1.6"
                  }}>
                    {service.description}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} style={{
                        fontSize: "15px",
                        color: "rgba(255, 255, 255, 0.7)",
                        marginBottom: "8px",
                        paddingLeft: "20px",
                        position: "relative"
                      }}>
                        <span style={{
                          position: "absolute",
                          left: 0,
                          color: "#d4af37"
                        }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer style={{
          padding: "60px 50px 40px",
          background: "rgba(0, 0, 0, 0.8)",
          borderTop: "1px solid rgba(212, 175, 55, 0.2)",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: "'Inter', sans-serif"
          }}>
            © 2024 AI Fiesta. Enterprise-grade construction estimation solutions.
          </div>
        </footer>
      </div>
    </>
  );
}
