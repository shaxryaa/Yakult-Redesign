"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--text-dark)",
      color: "var(--surface)",
      padding: "var(--space-16) 0 var(--space-8)",
      marginTop: "var(--space-16)"
    }}>
      <div className="container">
        <div className="grid grid-cols-3" style={{ gap: "var(--space-8)", marginBottom: "var(--space-12)" }}>
          <div className="flex-col" style={{ gap: "var(--space-4)" }}>
            <h3 style={{ color: "var(--surface)", marginBottom: 0 }}>Yakult</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              The science-driven probiotic milk beverage for your daily gut health.
            </p>
          </div>

          <div className="flex-col" style={{ gap: "var(--space-2)" }}>
            <h4 style={{ color: "var(--surface)", marginBottom: "var(--space-2)", fontSize: "1.25rem" }}>Quick Links</h4>
            <Link href="#benefits" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Benefits</Link>
            <Link href="#science" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>How It Works</Link>
            <Link href="#faq" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>FAQ</Link>
          </div>

          <div className="flex-col" style={{ gap: "var(--space-2)" }}>
            <h4 style={{ color: "var(--surface)", marginBottom: "var(--space-2)", fontSize: "1.25rem" }}>Legal</h4>
            <Link href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Privacy Policy</Link>
            <Link href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Terms of Service</Link>
            <Link href="#" style={{ color: "var(--text-muted)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>Cookie Policy</Link>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "var(--space-8)",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.875rem"
        }}>
          &copy; {new Date().getFullYear()} Yakult Honsha Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
