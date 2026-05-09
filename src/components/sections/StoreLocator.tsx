"use client";

import { useState } from "react";
// import Image from "next/image";

export default function StoreLocator() {
  const [zipCode, setZipCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <section id="store-locator" style={{ backgroundColor: "var(--bg-light)", padding: "var(--space-32) 0", position: "relative" }}>
      <div className="container">
        
        <div className="grid grid-cols-2" style={{ gap: "var(--space-12)", alignItems: "center" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", marginBottom: "var(--space-2)" }}>
                Find Yakult <br />
                <span className="font-instrument text-primary" style={{ fontWeight: "normal" }}>near you.</span>
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>
                Available in the refrigerated section of most major grocery stores and local markets.
              </p>
            </div>

            <form onSubmit={handleSearch} style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-4)" }}>
              <input 
                type="text" 
                placeholder="Enter Zip Code or City"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "var(--space-4)",
                  borderRadius: "12px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  fontSize: "1.125rem",
                  fontFamily: "var(--font-body)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)"
                }}
              />
              <button 
                type="submit"
                disabled={isSearching}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  border: "none",
                  padding: "0 var(--space-8)",
                  borderRadius: "12px",
                  fontWeight: "800",
                  fontSize: "1rem",
                  cursor: isSearching ? "wait" : "pointer",
                  opacity: isSearching ? 0.8 : 1,
                  transition: "transform 0.2s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em"
                }}
                onMouseEnter={(e) => !isSearching && (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => !isSearching && (e.currentTarget.style.transform = "scale(1)")}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>

            <div style={{ display: "flex", gap: "var(--space-6)", marginTop: "var(--space-2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                <span>In Stock</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#eab308" }} />
                <span>Limited Stock</span>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: "500px", borderRadius: "24px", overflow: "hidden", backgroundColor: "#E5E5E5" }}>
            {/* Map Placeholder */}
            <div style={{ 
              position: "absolute", 
              inset: 0, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              background: "linear-gradient(45deg, #e5e5e5 25%, #d4d4d4 25%, #d4d4d4 50%, #e5e5e5 50%, #e5e5e5 75%, #d4d4d4 75%, #d4d4d4 100%)",
              backgroundSize: "20px 20px"
            }}>
              <div style={{
                backgroundColor: "white",
                padding: "var(--space-6)",
                borderRadius: "16px",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "var(--space-2)" }}>📍</div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "var(--space-1)" }}>Map View Ready</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Integrate with Google Maps API</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
