"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section 
      className="section-padding" 
      style={{ overflow: "hidden", position: "relative", minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      <div className="container grid grid-cols-2" style={{ alignItems: "center", gap: "var(--space-12)" }}>
        
        {/* Text Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <h1 style={{ marginBottom: 0 }}>
            Know Your <span className="text-primary">Gut</span>.
            <br /> Elevate Your Health.
          </h1>
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", maxWidth: "500px" }}>
            Experience the science-driven probiotic milk beverage that balances your microbiome, boosts immunity, and supports daily wellness in one small bottle.
          </p>
          
          <div style={{ display: "flex", gap: "var(--space-4)", marginTop: "var(--space-4)" }}>
            <Link 
              href="#store-locator" 
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "var(--space-4) var(--space-8)",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "1.125rem",
                transition: "transform 0.2s ease, background-color 0.2s ease",
                boxShadow: "0 10px 15px -3px rgba(227, 27, 35, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.backgroundColor = "#c8161d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.backgroundColor = "var(--primary)";
              }}
            >
              Buy Now
            </Link>
            <Link 
              href="#science" 
              style={{
                backgroundColor: "white",
                color: "var(--text-dark)",
                border: "2px solid #E5E7EB",
                padding: "var(--space-4) var(--space-8)",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "1.125rem",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.backgroundColor = "#FFF5F5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Visual Content (Bottle) */}
        <div style={{ position: "relative", height: "100%", display: "flex", justifyContent: "center" }}>
          <div 
            style={{
              width: "480px",
              height: "580px",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF0F0",
              borderRadius: "40px 160px 40px 160px", // Stylish organic shape
              border: "2px solid #FFE4E6",
              boxShadow: "0 25px 50px -12px rgba(227, 27, 35, 0.15)",
              overflow: "hidden"
            }}
          >
            <Image 
              src="/yakult-hero.png" 
              alt="Yakult Bottle"
              fill
              style={{ objectFit: "contain", padding: "2rem", transform: "scale(1.15)" }} // Increased size of the actual bottle inside
              priority
            />
          </div>
          
          {/* Background decorative elements */}
          <div style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 102, 204, 0.1)",
            zIndex: -1,
            filter: "blur(20px)"
          }} />
          <div style={{
            position: "absolute",
            bottom: "0%",
            left: "10%",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "rgba(227, 27, 35, 0.1)",
            zIndex: -1,
            filter: "blur(30px)"
          }} />
        </div>
      </div>
    </section>
  );
}
