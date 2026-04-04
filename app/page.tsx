"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PremiumLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Advanced CSS Animations & Effects */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap');
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 20px rgba(0, 122, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 122, 255, 0.6); }
          100% { box-shadow: 0 0 20px rgba(0, 122, 255, 0.3); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 300% 300%;
          animation: shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(31, 38, 135, 0.37),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .mirror-effect {
          position: relative;
        }
        
        .mirror-effect::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 70%
          );
          transform: scaleY(-1);
          opacity: 0.3;
          pointer-events: none;
        }

        .floating-element {
          animation: float 6s ease-in-out infinite;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .interactive-glow:hover {
          animation: pulse-glow 2s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hide scrollbar */
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        
        /* Smooth cursor following effect */
        .cursor-glow {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(0,122,255,0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease;
        }
      `}</style>

      {/* Dynamic cursor glow effect */}
      <div 
        className="cursor-glow"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
        }}
      />

      {/* Main Container */}
      <div style={{
        minHeight: "100vh",
        background: `
          radial-gradient(ellipse 100% 40% at 50% 0%, rgba(120, 119, 198, 0.3), transparent),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `,
        fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
        position: "relative"
      }}>
        
        {/* Animated Background Particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 4 + 1 + "px",
                height: Math.random() * 4 + 1 + "px",
                background: "rgba(255, 255, 255, 0.3)",
                borderRadius: "50%",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `float $${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + "s"
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <nav style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#ffffff",
              letterSpacing: "-1px"
            }}>
              AI Fiesta
            </div>
            <div style={{ display: "flex", gap: "30px", color: "rgba(255, 255, 255, 0.8)" }}>
              <a href="#features" style={{ textDecoration: "none", color: "inherit", transition: "all 0.3s ease" }}>Features</a>
              <a href="#pricing" style={{ textDecoration: "none", color: "inherit", transition: "all 0.3s ease" }}>Pricing</a>
              <a href="#contact" style={{ textDecoration: "none", color: "inherit", transition: "all 0.3s ease" }}>Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
          transform: `translateY($${scrollY * 0.5}px)`,
          position: "relative",
          zIndex: 10
        }}>
          
          {/* Main Logo/Icon with Mirror Effect */}
          <div className="mirror-effect fade-in-up floating-element" style={{
            fontSize: "120px",
            marginBottom: "40px",
            filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))"
          }}>
            🏗️
          </div>

          {/* Main Heading */}
          <h1 className="gradient-text fade-in-up" style={{
            fontSize: "clamp(48px, 8vw, 120px)",
            fontWeight: "700",
            lineHeight: "1.1",
            marginBottom: "30px",
            letterSpacing: "-3px",
            animationDelay: "0.2s"
          }}>
            AI Fiesta Estimator
          </h1>

          {/* Subheading */}
          <p className="fade-in-up" style={{
            fontSize: "24px",
            fontWeight: "300",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "600px",
            lineHeight: "1.6",
            marginBottom: "50px",
            animationDelay: "0.4s"
          }}>
            Revolutionary AI-powered construction cost estimation for the UAE market. 
            Get instant, accurate estimates with advanced material and labor breakdowns.
          </p>

          {/* CTA Button with Interactive Glow */}
          <Link href="/estimator">
            <button className="glass-card interactive-glow fade-in-up" style={{
              padding: "18px 50px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#ffffff",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
              overflow: "hidden",
              animationDelay: "0.6s",
              background: "linear-gradient(135deg, rgba(0, 122, 255, 0.8) 0%, rgba(88, 86, 214, 0.8) 100%)"
            }}>
              <span style={{ position: "relative", zIndex: 2 }}>Start Estimating Now</span>
            </button>
          </Link>

          {/* Feature Badges */}
          <div className="fade-in-up" style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "60px",
            flexWrap: "wrap",
            animationDelay: "0.8s"
          }}>
            {[
              { icon: "⚡", text: "Instant estimates" },
              { icon: "💰", text: "UAE-specific pricing" },
              { icon: "📊", text: "Detailed breakdowns" },
              { icon: "🔒", text: "Enterprise security" }
            ].map((feature, index) => (
              <div key={index} className="glass-card floating-element" style={{
                padding: "15px 25px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                fontWeight: "500",
                animationDelay: `$${2 + index * 0.5}s`
              }}>
                <span style={{ fontSize: "18px" }}>{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{
          padding: "100px 20px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          position: "relative",
          zIndex: 5
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#ffffff",
              marginBottom: "60px",
              letterSpacing: "-2px"
            }}>
              Powered by Advanced AI
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginTop: "60px"
            }}>
              {[
                {
                  icon: "🤖",
                  title: "Multi-Agent System",
                  description: "Specialized AI agents for estimation, research, design, and validation"
                },
                {
                  icon: "🏗️",
                  title: "UAE Construction Focus",
                  description: "Tailored for Dubai, Abu Dhabi, and Sharjah construction standards"
                },
                {
                  icon: "📈",
                  title: "Real-time Market Data",
                  description: "Live material costs and labor rates from local suppliers"
                },
                {
                  icon: "🎨",
                  title: "Design Integration",
                  description: "Visual design suggestions with cost implications"
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card floating-element" style={{
                  padding: "40px 30px",
                  borderRadius: "20px",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  animationDelay: `$${index * 0.2}s`
                }}>
                  <div style={{ fontSize: "48px", marginBottom: "20px" }}>{feature.icon}</div>
                  <h3 style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#ffffff",
                    marginBottom: "15px"
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.6"
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: "40px 20px",
          textAlign: "center",
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          color: "rgba(255, 255, 255, 0.7)"
        }}>
          <p>&copy; 2024 AI Fiesta. Revolutionizing construction estimation.</p>
        </footer>
      </div>
    </>
  );
}
