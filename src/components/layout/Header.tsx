"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const headerRef = useRef(null);
  const modalRef = useRef(null);
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      gsap.fromTo(modalOverlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0, y: 50 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 });
    }
  }, [modalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      setIsScrolled(totalScroll > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          position: "fixed",
          top: isScrolled ? "0" : "1rem",
          left: isScrolled ? "0" : "1.5rem",
          right: isScrolled ? "0" : "1.5rem",
          zIndex: 50,
          borderRadius: isScrolled ? "0" : "16px",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          padding: isScrolled ? "1rem 2rem" : "1.2rem 2rem",
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: isScrolled ? "none" : "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: isScrolled ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="flex items-center justify-between mx-auto" style={{ maxWidth: "1440px" }}>
          {/* LOGO */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "700", color: "#fff", letterSpacing: "-0.05em", transition: "transform 0.3s ease" }}>Yakult</div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", gap: "3.5rem", alignItems: "center" }} className="desktop-nav">
            <Link href="#benefits" className="nav-link">
              Benefits
            </Link>
            <Link href="#science" className="nav-link">
              The Science
            </Link>
            <Link href="#testimonials" className="nav-link">
              Reviews
            </Link>
          </nav>

          {/* Controls */}
          <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
            <button
              onClick={() => setModalOpen(true)}
              className="newsletter-btn"
            >
              Newsletter
            </button>
            <Link 
              href="#store-locator" 
              className="buy-btn"
            >
              Buy Now
            </Link>

            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "#fff" }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Styles for hover underlines and buttons */}
      <style dangerouslySetInnerHTML={{__html: `
        .nav-link {
          position: relative;
          font-weight: 500;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.3s ease;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: #fff;
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        .newsletter-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          position: relative;
          padding-bottom: 4px;
        }
        .newsletter-btn::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: rgba(255,255,255,0.4);
          transform-origin: bottom right;
          transition: transform 0.4s ease;
        }
        .newsletter-btn:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .newsletter-btn:hover {
          color: #fff;
        }

        .buy-btn {
          background-color: #FDF8F5;
          color: #1A1010;
          padding: 0.7rem 1.6rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .buy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255,255,255,0.15);
        }

        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}} />

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: "70px",
          left: "1rem",
          right: "1rem",
          backgroundColor: "rgba(10,0,0,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "16px",
          padding: "var(--space-6)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-6)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <Link href="#benefits" style={{fontWeight: 600, fontSize: "1.15rem", color: "#fff"}} onClick={() => setMobileMenuOpen(false)}>Benefits</Link>
          <Link href="#science" style={{fontWeight: 600, fontSize: "1.15rem", color: "#fff"}} onClick={() => setMobileMenuOpen(false)}>The Science</Link>
          <Link href="#testimonials" style={{fontWeight: 600, fontSize: "1.15rem", color: "#fff"}} onClick={() => setMobileMenuOpen(false)}>Reviews</Link>
        </div>
      )}

      {/* Modal Appearance */}
      {modalOpen && (
        <div 
          ref={modalOverlayRef}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div 
            ref={modalRef}
            style={{
              backgroundColor: "#1A0505",
              padding: "var(--space-12)",
              borderRadius: "20px",
              maxWidth: "460px",
              width: "90%",
              boxShadow: "0 20px 40px -12px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setModalOpen(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)" }}
            >
              <X size={20} />
            </button>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "0.8rem", color: "#fff", fontWeight: 800 }}>Stay <span className="font-playfair" style={{ fontWeight: 300, fontStyle: "italic", color: "#FF9999" }}>Updated.</span></h2>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.8rem", fontSize: "0.95rem" }}>Subscribe to our newsletter for gut health tips and exclusive offers.</p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: "0.8rem 1.2rem", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.15)", outline: "none", backgroundColor: "rgba(255,255,255,0.03)", color: "#fff", fontSize: "0.9rem" }} />
              <button style={{ backgroundColor: "#FDF8F5", color: "#1A1010", padding: "0.8rem 1.8rem", borderRadius: "999px", fontWeight: "700", border: "none", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.03)"} onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}>Join</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
