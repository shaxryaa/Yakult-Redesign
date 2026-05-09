"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need to drink it every day?",
    answer: "Yes, consistency is key! Since probiotics naturally pass through your digestive system, consuming Yakult daily ensures a steady supply of good bacteria to maintain optimal balance."
  },
  {
    question: "When is the best time to drink it?",
    answer: "You can enjoy Yakult at any time of the day. However, many people prefer drinking it as part of their morning routine or after a meal."
  },
  {
    question: "Is it safe for children?",
    answer: "Absolutely. Yakult is safe and beneficial for people of all ages, including children, as part of a balanced diet."
  },
  {
    question: "Does it need to be refrigerated?",
    answer: "Yes, Yakult contains live probiotic bacteria that are kept dormant at cool temperatures. Always store it in the refrigerator to maintain maximum efficacy."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ backgroundColor: "var(--surface)", padding: "var(--space-32) 0" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        
        <div style={{ textAlign: "center", marginBottom: "var(--space-16)" }}>
          <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Common <span className="font-instrument text-primary" style={{ fontWeight: "normal" }}>questions.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  paddingBottom: "var(--space-4)",
                  transition: "all 0.3s ease"
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "var(--space-4) 0",
                    color: "var(--text-dark)",
                  }}
                >
                  <span style={{ fontSize: "1.25rem", fontWeight: "800" }}>{faq.question}</span>
                  <span style={{ 
                    fontSize: "2rem", 
                    fontWeight: "300", 
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                    color: isOpen ? "var(--primary)" : "var(--text-muted)"
                  }}>
                    +
                  </span>
                </button>
                
                <div style={{
                  maxHeight: isOpen ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.4s ease",
                  opacity: isOpen ? 1 : 0
                }}>
                  <p style={{ color: "var(--text-muted)", paddingBottom: "var(--space-4)", maxWidth: "90%" }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
