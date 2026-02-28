"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for the indicator
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      
      setScrollProgress(Number(scroll) * 100);
      setIsScrolled(totalScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isScrolled ? "0 4px 6px rgba(0,0,0,0.05)" : "none",
          padding: "var(--space-4) 0",
        }}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--primary)" }}>Yakult</div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "var(--space-8)" }} className="desktop-nav">
            <Link href="#benefits" style={{ fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark)")}>Benefits</Link>
            <Link href="#science" style={{ fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark)")}>The Science</Link>
            <Link href="#testimonials" style={{ fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark)")}>Reviews</Link>
            <Link href="#faq" style={{ fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dark)")}>FAQ</Link>
          </nav>

          <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}>
            <Link 
              href="#store-locator" 
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "var(--space-2) var(--space-6)",
                borderRadius: "9999px",
                fontWeight: "bold",
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#c8161d";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "var(--primary)";
              }}
            >
              Buy Now
            </Link>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          backgroundColor: "var(--primary)",
          width: `${scrollProgress}%`,
          transition: "width 0.1s ease-out"
        }} />
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "70px",
          left: 0,
          right: 0,
          backgroundColor: "var(--surface)",
          padding: "var(--space-6)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
        }}>
          <Link href="#benefits" onClick={() => setMobileMenuOpen(false)}>Benefits</Link>
          <Link href="#science" onClick={() => setMobileMenuOpen(false)}>The Science</Link>
          <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
        </div>
      )}

      {/* CSS for Header */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}} />
    </>
  );
}
