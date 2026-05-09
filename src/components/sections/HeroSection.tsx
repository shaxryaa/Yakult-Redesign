"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Star, ShieldCheck, Activity, FlaskConical } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Variant Data ────────────────────────────────────────────────────────────
const variantsData = [
  {
    id: 0,
    name: "Original",
    label: "Classic Probiotic",
    title: "Daily Dose of",
    highlight: "Goodness",
    subtitle:
      "The science-driven probiotic beverage that balances your microbiome, supports immunity, and powers everyday wellness.",
    image: "/yakult-hero.png",
    bg1: "#E33941", // Rich vibrant Yakult red
    bg2: "#B01D22", // Cinematic mid red
    bg3: "#731115", // Gentle vignette
    imageScale: 1.2, 
    imageY: 20,
  },
  {
    id: 1,
    name: "Mango",
    label: "Tropical Fusion",
    title: "Tropical Bliss,",
    highlight: "Every Sip",
    subtitle:
      "The science-driven probiotic beverage that balances your microbiome, supports immunity, and powers everyday wellness.",
    image: "/Mango-yakult.png",
    bg1: "#FFD166", // Creamy sunlit highlight
    bg2: "#F49D1A", // Warm golden amber
    bg3: "#B85C00", // Soft tropical edge (not muddy)
    imageScale: 1.2,
    imageY: 20,
  },
  {
    id: 2,
    name: "Light",
    label: "Low Calorie",
    title: "Less Sugar,",
    highlight: "More Balance",
    subtitle:
      "The science-driven probiotic beverage that balances your microbiome, supports immunity, and powers everyday wellness.",
    image: "/Blue-yakult.png",
    bg1: "#8AD4EB", // Bright airy cyan highlight
    bg2: "#3A9ED8", // Clean cool blue
    bg3: "#16649E", // Calm minimal edge
    imageScale: 1.2,
    imageY: 20,
  },
];

const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.3)",
      borderRadius: "999px",
      padding: "0.5rem 1rem",
      color: "rgba(255,255,255,1)",
      fontSize: "0.85rem",
      fontWeight: 600,
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
      transition: "transform 0.3s ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <span style={{ color: "rgba(255,255,255,0.7)" }}>{icon}</span>
    <span style={{ letterSpacing: "0.02em" }}>{text}</span>
  </div>
);

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [activeVariant, setActiveVariant] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const distantBottlesRef = useRef<HTMLDivElement>(null);

  const handleNext = () =>
    setActiveVariant((prev) => (prev + 1) % variantsData.length);
  const handlePrev = () =>
    setActiveVariant((prev) => (prev - 1 + variantsData.length) % variantsData.length);

  // ── Background + color animation ──────────────────────────────────────────
  useGSAP(
    () => {
      const v = variantsData[activeVariant];

      gsap.to(bgRef.current, {
        "--bg1": v.bg1,
        "--bg2": v.bg2,
        "--bg3": v.bg3,
        duration: 1.2,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        ".hero-text",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
      );
    },
    { dependencies: [activeVariant], scope: containerRef }
  );

  // ── Continuous motion (floating, rotation, particles) ────────────────────
  useGSAP(
    () => {
      // Main bottle float & idle rotation
      gsap.to(floatRef.current, {
        y: -18,
        rotationZ: 1.5,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Distant bottles subtle drift
      if (distantBottlesRef.current) {
        const bottles = distantBottlesRef.current.children;
        gsap.to(bottles[0], { y: 20, rotationZ: -5, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(bottles[1], { y: -30, rotationZ: 15, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      // Dynamic splash and bubble animations
      gsap.to(".dynamic-bubble", {
        y: "random(-60, 60)",
        x: "random(-60, 60)",
        rotationZ: "random(-45, 45)",
        duration: "random(4, 8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { amount: 2, from: "random" },
      });

      gsap.to(".dynamic-splash", {
        scale: 1.02,
        rotationZ: "random(-2, 2)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  const v = variantsData[activeVariant];

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "0",
        backgroundColor: "#000", // Fallback
      }}
    >
      {/* ── Ultra Premium Cinematic Deep Background ──────────────────────── */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 75% 50%, var(--bg1, ${v.bg1}) 0%, var(--bg2, ${v.bg2}) 40%, var(--bg3, ${v.bg3}) 100%)`,
          transition: "background 1.2s ease",
          zIndex: 0,
        }}
      >
        {/* SVG Noise Overlay for realistic cinematic texture */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.15,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Ambient Glow behind product (Softer) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "12%",
            transform: "translateY(-50%)",
            width: "650px",
            height: "650px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)`,
            zIndex: 2,
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />

        {/* Faint Circular Depth Rings */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height: "1000px",
            borderRadius: "50%",
            border: "7px solid rgba(255,255,255,0.03)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />



        {/* Distant Blurred Bottles for Atmospheric Depth - Reduced */}
        <div ref={distantBottlesRef} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "15%", right: "35%", width: "100px", height: "180px", filter: "blur(12px)", opacity: 0.15, transform: "rotate(-15deg)" }}>
            <Image src={variantsData[0].image} alt="blur bottle" fill style={{ objectFit: "contain" }} />
          </div>
          <div style={{ position: "absolute", bottom: "12%", right: "8%", width: "140px", height: "240px", filter: "blur(18px)", opacity: 0.1, transform: "rotate(25deg)" }}>
            <Image src={variantsData[1].image} alt="blur bottle" fill style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* ── Content Grid ────────────────────────────────────────────────────── */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 10, width: "100%" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "4rem", // Increased gap for breathing room
            alignItems: "center",
            minHeight: "calc(100vh - 6rem)",
            paddingBottom: "3rem",
          }}
        >
          {/* ── LEFT: Text & Controls ──────────────────────────────────────── */}
          <div
            style={{
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem", // Increased gap
              paddingLeft: "2rem",
            }}
          >
            {/* Flavor label pill */}
            <div
              className="hero-text"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "9999px",
                  padding: "0.4rem 1.1rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.9)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                {v.label}
              </span>
            </div>

            {/* Headline & Subtitle Group */}
            <div key={activeVariant} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
              <h1
                className="hero-text"
                style={{
                  fontSize: "clamp(3.2rem, 5.5vw, 6rem)", // Reduced
                  lineHeight: "1.05", // Better proportional scaling
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  textShadow: "0 4px 20px rgba(255,255,255,0.08)", // Softer
                  margin: 0,
                  color: "#fff",
                }}
              >
                {v.title}
                <br />
                <span
                  className="font-playfair"
                  style={{
                    fontWeight: 300, // Lighter
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                    fontSize: "1.05em",
                    display: "inline-block",
                    marginTop: "-0.05em",
                  }}
                >
                  {v.highlight}
                </span>
              </h1>

              <p
                className="hero-text"
                style={{
                  fontSize: "1.05rem", // Reduced
                  maxWidth: "440px", // Reduced width for breathing room
                  opacity: 0.85,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  margin: 0,
                  letterSpacing: "0.01em",
                }}
              >
                {v.subtitle}
              </p>

              {/* CTA Buttons */}
              <div
                className="hero-text"
                style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}
              >
                <Link
                  href="#order"
                  className="btn-primary"
                  style={{
                    backgroundColor: "#FDF8F5", // ultra premium cream
                    color: "#1A1010",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.15)", // softer
                    padding: "0.9rem 2.2rem", // compact
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
                  }}
                >
                  Order Now
                </Link>

                <Link
                  href="#menu"
                  className="btn-outline"
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.3)",
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    boxShadow: "0 0 10px rgba(255,255,255,0.02)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    padding: "0.9rem 2.2rem", // compact
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(255,255,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(255,255,255,0.02)";
                  }}
                >
                  Explore Variants
                </Link>
              </div>
            </div>

            {/* Premium Social Proof Card */}
            <div
              className="hero-text"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2rem",
                padding: "0.9rem 1.4rem",
                backgroundColor: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                width: "fit-content",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            >
              {/* Stacked avatars */}
              <div style={{ display: "flex" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      marginLeft: i !== 0 ? "-12px" : "0",
                      border: "1.5px solid rgba(255,255,255,0.6)",
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: `rgba(255,255,255,${0.1 + i * 0.05})`,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-3px",
                        width: "100%",
                        height: "50%",
                        backgroundColor: "rgba(255,255,255,0.3)",
                        borderRadius: "50% 50% 0 0",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "14px",
                        height: "14px",
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: 1.2,
                    letterSpacing: "0.01em",
                  }}
                >
                  Trusted by 10,000+ Families
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    marginTop: "4px",
                  }}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#FFD166" stroke="none" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Premium Product Showcase ────────────────────────────────────── */}
          <div
            style={{
              position: "relative",
              height: "700px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              perspective: "1200px",
            }}
          >
            {/* Feature Badges (Floating around the bottle) - Repositioned to avoid overlap */}
            <div style={{ position: "absolute", top: "15%", left: "-5%", zIndex: 20 }}>
              <Badge icon={<ShieldCheck size={14} />} text="6.5 Billion Probiotics" />
            </div>
            <div style={{ position: "absolute", bottom: "30%", left: "-2%", zIndex: 20 }}>
              <Badge icon={<Activity size={14} />} text="Daily Wellness" />
            </div>
            <div style={{ position: "absolute", top: "25%", right: "-10%", zIndex: 20 }}>
              <Badge icon={<FlaskConical size={14} />} text="Scientifically Tested" />
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                zIndex: 50,
              }}
            >
              <button
                onClick={handlePrev}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#FDFBF7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1C1917",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDFBF7";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              >
                <ArrowLeft size={24} />
              </button>

              {/* Variant dots */}
              <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                {variantsData.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVariant(i)}
                    style={{
                      width: i === activeVariant ? "32px" : "10px",
                      height: "10px",
                      borderRadius: "9999px",
                      backgroundColor: i === activeVariant ? "#fff" : "rgba(255,255,255,0.3)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      padding: 0,
                      boxShadow: i === activeVariant ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  backgroundColor: "#FDFBF7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1C1917",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FDFBF7";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <ArrowRight size={18} />
              </button>
            </div>

           

            {/* Bottle carousel */}
            <div
              ref={floatRef}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {variantsData.map((item, index) => {
                let offset = index - activeVariant;
                if (offset < -1) offset += variantsData.length;
                if (offset > 1) offset -= variantsData.length;

                const isCenter = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                let x = 0;
                let z = 0;
                let scale = 1;
                let zIndex = 1;
                let blur = 0;
                let opacity = 1;

                if (isLeft) {
                  x = -220; z = -200; scale = 0.5; zIndex = 5; blur = 8; opacity = 0.2;
                } else if (isRight) {
                  x = 220; z = -200; scale = 0.5; zIndex = 5; blur = 8; opacity = 0.2;
                } else if (isCenter) {
                  // Reduced scale for elegance and breathing room
                  x = 0; z = 80; scale = 1.35; zIndex = 10; blur = 0; opacity = 1;
                } else {
                  opacity = 0;
                }

                const extraY = (item as { imageY?: number }).imageY ?? 0;
                const extraScale = (item as { imageScale?: number }).imageScale ?? 1;
                scale = scale * extraScale;

                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      width: "300px",
                      height: "520px",
                      transition: "all 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
                      transform: `translateX(${x}px) translateY(${extraY}px) translateZ(${z}px) scale(${scale})`,
                      zIndex,
                      opacity,
                      filter: `blur(${blur}px)`,
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{
                        objectFit: "contain",
                        filter: isCenter
                          ? "drop-shadow(0 20px 40px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,255,255,0.05))"
                          : "none",
                        transition: "filter 0.9s ease",
                        zIndex: 10,
                      }}
                      priority={isCenter}
                    />

                    {/* ── RED VARIANT ASSETS ── */}
                    {item.id === 0 && (
                      <>
                        <div className="dynamic-splash" style={{ position: "absolute", bottom: "-140px", right: "-210px", width: "650px", height: "700px", zIndex: 2, opacity: isCenter ? 1 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/creme-splash.png" alt="cream splash" fill style={{ objectFit: "contain", filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.25))" }} />
                        </div>
                        {/* Distant background bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "5%", left: "-25%", width: "120px", height: "120px", zIndex: 1, filter: "blur(6px)", opacity: isCenter ? 0.4 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "10%", right: "-40%", width: "160px", height: "160px", zIndex: 1, filter: "blur(8px)", opacity: isCenter ? 0.3 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        {/* Midground Bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "35%", right: "-20%", width: "80px", height: "80px", zIndex: 5, filter: "blur(2px)", opacity: isCenter ? 0.7 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "35%", left: "-10%", width: "90px", height: "90px", zIndex: 5, filter: "blur(3px)", opacity: isCenter ? 0.6 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        {/* Sharp Foreground Bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "20%", right: "80%", width: "110px", height: "110px", zIndex: 15, opacity: isCenter ? 0.9 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "10%", right: "-20%", width: "130px", height: "130px", zIndex: 15, opacity: isCenter ? 1 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))" }} />
                        </div>
                        {/* Additional Bubbles for Density */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "50%", left: "-35%", width: "100px", height: "100px", zIndex: 1, filter: "blur(5px)", opacity: isCenter ? 0.5 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "-10%", right: "-10%", width: "140px", height: "140px", zIndex: 15, opacity: isCenter ? 0.7 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "50%", right: "-35%", width: "90px", height: "90px", zIndex: 5, filter: "blur(3px)", opacity: isCenter ? 0.6 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "-5%", left: "10%", width: "150px", height: "150px", zIndex: 15, opacity: isCenter ? 0.8 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/red-bubble.png" alt="red bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))" }} />
                        </div>
                      </>
                    )}

                    {/* ── MANGO VARIANT ASSETS ── */}
                    {item.id === 1 && (
                      <>
                        <div className="dynamic-splash" style={{ position: "absolute", bottom: "-165px", left: "-210px", width: "700px", height: "700px", zIndex: 2, opacity: isCenter ? 1 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <div style={{ position: "relative", width: "100%", height: "110%", transform: "scaleX(-1)" }}>
                            <Image src="/mango-splash.png" alt="mango splash" fill style={{ objectFit: "contain", filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.2))" }} />
                          </div>
                        </div>
                        {/* Foreground Slice */}
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "-10%", right: "-30%", width: "240px", height: "240px", zIndex: 15, filter: "blur(1px)", opacity: isCenter ? 1 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-slice.png" alt="mango slice" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }} />
                        </div>
                        {/* Midground Slice */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "15%", left: "-30%", width: "180px", height: "180px", zIndex: 1, filter: "blur(3px)", opacity: isCenter ? 0.85 : 0, transition: "opacity 0.8s ease", transform: "rotate(-25deg)", pointerEvents: "none" }}>
                          <Image src="/mango-slice.png" alt="mango slice" fill style={{ objectFit: "contain" }} />
                        </div>
                        {/* Deep Bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "5%", right: "-25%", width: "100px", height: "100px", zIndex: 1, filter: "blur(5px)", opacity: isCenter ? 0.6 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-bubble.png" alt="mango bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "30%", left: "-45%", width: "140px", height: "140px", zIndex: 1, filter: "blur(7px)", opacity: isCenter ? 0.4 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-bubble.png" alt="mango bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        {/* Foreground Bubbles */}
                        
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "25%", right: "-15%", width: "90px", height: "90px", zIndex: 15, opacity: isCenter ? 0.8 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-bubble.png" alt="mango bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 8px 15px rgba(0,0,0,0.2))" }} />
                        </div>
                        {/* Additional Slices for Density */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "-5%", right: "-40%", width: "150px", height: "150px", zIndex: 1, filter: "blur(5px)", opacity: isCenter ? 0.7 : 0, transition: "opacity 0.8s ease", transform: "rotate(45deg)", pointerEvents: "none" }}>
                          <Image src="/mango-slice.png" alt="mango slice" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "40%", right: "85%", width: "190px", height: "190px", zIndex: 15, filter: "blur(1px)", opacity: isCenter ? 0.9 : 0, transition: "opacity 0.8s ease", transform: "rotate(-15deg)", pointerEvents: "none" }}>
                          <Image src="/mango-slice.png" alt="mango slice" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }} />
                        </div>
                        {/* Additional Bubbles for Density */}
                        
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "-8%", left: "10%", width: "160px", height: "160px", zIndex: 15, opacity: isCenter ? 0.8 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-bubble.png" alt="mango bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.2))" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "10%", right: "80%", width: "140px", height: "140px", zIndex: 5, opacity: isCenter ? 0.7 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/mango-bubble.png" alt="mango bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                      </>
                    )}

                    {/* ── LIGHT VARIANT ASSETS ── */}
                    {item.id === 2 && (
                      <>
                        <div className="dynamic-splash" style={{ position: "absolute", bottom: "-145px", right: "-200px", width: "600px", height: "755px", zIndex: 2, opacity: isCenter ? 0.85 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/creme-splash.png" alt="light splash" fill style={{ objectFit: "contain", filter: "brightness(1.1) hue-rotate(-12deg) drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }} />
                        </div>
                        {/* Deep Bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "10%", left: "-30%", width: "90px", height: "90px", zIndex: 1, filter: "blur(4px)", opacity: isCenter ? 0.5 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "5%", right: "-40%", width: "140px", height: "140px", zIndex: 1, filter: "blur(6px)", opacity: isCenter ? 0.3 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        {/* Crisp Foreground Bubbles */}
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "35%", right: "-25%", width: "110px", height: "110px", zIndex: 15, opacity: isCenter ? 0.9 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "25%", left: "-10%", width: "80px", height: "80px", zIndex: 15, opacity: isCenter ? 0.8 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.2))" }} />
                        </div>
                        {/* Additional Bubbles for Density */}
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "45%", right: "-35%", width: "110px", height: "110px", zIndex: 1, filter: "blur(5px)", opacity: isCenter ? 0.4 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", top: "-5%", left: "-20%", width: "150px", height: "150px", zIndex: 15, opacity: isCenter ? 0.8 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "50%", left: "-45%", width: "100px", height: "100px", zIndex: 5, filter: "blur(3px)", opacity: isCenter ? 0.6 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain" }} />
                        </div>
                        <div className="dynamic-bubble" style={{ position: "absolute", bottom: "-5%", right: "10%", width: "130px", height: "130px", zIndex: 15, opacity: isCenter ? 0.9 : 0, transition: "opacity 0.8s ease", pointerEvents: "none" }}>
                          <Image src="/blue-bubble.png" alt="blue bubble" fill style={{ objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }} />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive Styles ───────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 992px) {
            .container > div[style*="grid"] {
              grid-template-columns: 1fr !important;
              text-align: center;
              padding-top: 2rem;
            }
            .container > div[style*="grid"] > div:first-child {
              align-items: center;
              padding-left: 0 !important;
            }
            .container > div[style*="grid"] > div:first-child a,
            .container > div[style*="grid"] > div:first-child div[style*="fit-content"] {
              margin-left: auto;
              margin-right: auto;
            }
            .container > div[style*="grid"] > div:last-child {
              height: 480px !important;
            }
            .hero-text { text-align: center; }
          }
        `
      }} />
    </section>
  );
}
