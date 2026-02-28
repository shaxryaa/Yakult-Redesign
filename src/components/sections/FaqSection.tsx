"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What makes Yakult different from other probiotic drinks?",
    a: "Yakult contains our exclusive L. casei strain Shirota, which has over 80 years of scientific research backing its ability to survive gastric juices and reach your intestines alive."
  },
  {
    q: "When is the best time to drink Yakult?",
    a: "You can enjoy Yakult at any time of day! We recommend making it part of your daily routine, whether that's with breakfast, as a midday refreshing break, or after dinner."
  },
  {
    q: "Should Yakult be kept refrigerated?",
    a: "Yes. Yakult contains live bacteria, so keeping it refrigerated ensures the probiotic strain remains alive and active until you are ready to drink it."
  },
  {
    q: "Can children drink Yakult?",
    a: "Yes, Yakult is suitable for children once they start eating a normal, balanced diet. It's a great way to support their developing immune and digestive systems."
  }
];

// Applying Progressive Disclosure UX law: We only show questions initially
// to keep the interface clean, allowing users to expand answers relevant to them.
export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-12)" }}>
          <h2 style={{ fontSize: "2.5rem" }}>Frequently Asked <span className="text-secondary">Questions</span></h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index}
              faq={faq}
              isOpen={openIdx === index}
              onToggle={() => setOpenIdx(openIdx === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ faq, isOpen, onToggle }: { faq: {q: string, a: string}, isOpen: boolean, onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: contentRef.current.scrollHeight,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [isOpen]);

  return (
    <div style={{
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "white",
      transition: "box-shadow 0.2s",
      boxShadow: isOpen ? "0 10px 15px -3px rgba(0,0,0,0.05)" : "none"
    }}>
      <button 
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "var(--space-6)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "1.25rem",
          fontWeight: 600,
          color: isOpen ? "var(--primary)" : "var(--text-dark)",
          transition: "color 0.2s"
        }}
      >
        {faq.q}
        <div style={{ 
          transform: `rotate(${isOpen ? "45deg" : "0"})`,
          transition: "transform 0.3s ease",
          color: "var(--text-muted)"
        }}>
          <Plus size={24} />
        </div>
      </button>

      <div 
        ref={contentRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <p style={{ 
          margin: 0, 
          padding: "0 var(--space-6) var(--space-6)",
          color: "var(--text-muted)",
          lineHeight: 1.6
        }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}
