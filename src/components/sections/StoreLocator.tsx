"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StoreLocator() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="store-locator" className="section-padding" style={{ backgroundColor: "var(--primary)", color: "white" }}>
      <div className="container">
        <div 
          ref={ctaRef}
          style={{ 
            textAlign: "center", 
            maxWidth: "800px", 
            margin: "0 auto",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "var(--space-12)",
            borderRadius: "32px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "var(--space-6)" }}>
            <MapPin size={48} />
          </div>
          <h2 style={{ fontSize: "3rem", color: "white", marginBottom: "var(--space-4)" }}>Ready to Elevate Your Health?</h2>
          <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "var(--space-8)" }}>
            Find Yakult near you and start your journey to a balanced microbiome today.
          </p>

          <form 
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              maxWidth: "500px",
              margin: "0 auto",
              position: "relative"
            }}
          >
            <input 
              type="text" 
              placeholder="Enter your zip code..." 
              style={{
                width: "100%",
                padding: "var(--space-4) var(--space-6)",
                paddingRight: "120px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "1.125rem",
                outline: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                color: "var(--text-dark)"
              }}
            />
            <button 
              type="submit"
              style={{
                position: "absolute",
                right: "8px",
                top: "8px",
                bottom: "8px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "9999px",
                padding: "0 var(--space-6)",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c8161d"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--primary)"}
            >
              <Search size={18} />
              Find
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
