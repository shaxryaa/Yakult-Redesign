"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: "var(--primary)", 
      color: "var(--bg-light)", 
      paddingTop: "var(--space-24)", 
      paddingBottom: "var(--space-8)" 
    }}>
      <div className="container" style={{ display: "grid", gap: "var(--space-12)" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", alignItems: "center", textAlign: "center" }}>
          <div>
            <h2 style={{ color: "var(--surface)", marginBottom: "var(--space-2)", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>Ready to improve your <span className="font-instrument" style={{ color: "var(--bg-light)", fontWeight: "normal" }}>gut health?</span></h2>
            <p style={{ color: "var(--bg-light)", opacity: 0.8, fontSize: "1.25rem", maxWidth: "500px", margin: "0 auto" }}>
              Join millions who digest life better every single day.
            </p>
          </div>
          
          <Link 
            href="#store-locator" 
            style={{
              backgroundColor: "var(--bg-light)",
              color: "var(--primary)",
              padding: "var(--space-4) var(--space-8)",
              borderRadius: "9999px",
              fontWeight: "800",
              fontSize: "1.125rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.backgroundColor = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "var(--bg-light)";
            }}
          >
            Find a Store Near You
          </Link>
        </div>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", margin: "var(--space-8) 0" }} />

        <div className="grid grid-cols-3" style={{ gap: "var(--space-8)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary)", letterSpacing: "-0.05em" }}>Yakult</div>
            <p style={{ color: "#A3A3A3", fontSize: "0.875rem" }}>
              A premium science-driven probiotic milk beverage that balances your microbiome since 1935.
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <h4 style={{ color: "var(--surface)", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em" }}>Explore</h4>
            <Link href="#benefits" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>Benefits</Link>
            <Link href="#science" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>The Science</Link>
            <Link href="#testimonials" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>Reviews</Link>
            <Link href="#faq" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>FAQ</Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
            <h4 style={{ color: "var(--surface)", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em" }}>Legal</h4>
            <Link href="#" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>Privacy Policy</Link>
            <Link href="#" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>Terms of Service</Link>
            <Link href="#" style={{ color: "#A3A3A3", transition: "color 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.color="white"} onMouseLeave={(e)=>e.currentTarget.style.color="#A3A3A3"}>Cookie Policy</Link>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-4)", color: "#737373", fontSize: "0.875rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p>© {new Date().getFullYear()} Yakult Honsha Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
