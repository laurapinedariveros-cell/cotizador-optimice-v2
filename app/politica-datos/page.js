"use client";
import Link from "next/link";
import { Styles, Logo } from "../../components/Brand";
import { POLICY_TEXT } from "../../lib/policyText";

function renderBlocks(text) {
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, i) => {
    const lines = block.split("\n").filter((l) => l.trim() !== "");
    if (lines.length === 0) return null;

    if (lines.length === 1) {
      const line = lines[0];
      if (/^\d+\.\d+\.\s/.test(line)) {
        return <h3 key={i} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, marginTop: 22 }}>{line}</h3>;
      }
      if (/^\d+\.\s/.test(line)) {
        return <h2 key={i} style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, marginTop: 30, borderBottom: "1px solid var(--hairline)", paddingBottom: 6 }}>{line}</h2>;
      }
      return <p key={i} style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>{line}</p>;
    }

    // Multi-line block: if lines look like a short list, render as list
    const looksLikeList = lines.every((l) => l.length < 140);
    if (looksLikeList) {
      return (
        <ul key={i} style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--ink-soft)", paddingLeft: 20 }}>
          {lines.map((l, j) => <li key={j}>{l}</li>)}
        </ul>
      );
    }
    return (
      <div key={i}>
        {lines.map((l, j) => (
          <p key={j} style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>{l}</p>
        ))}
      </div>
    );
  });
}

export default function PoliticaDatosPage() {
  return (
    <div className="op-root">
      <Styles />
      <div className="op-topbar">
        <Logo />
        <Link href="/" className="op-btn ghost">Volver</Link>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 80px 24px" }}>
        {renderBlocks(POLICY_TEXT)}
      </div>
    </div>
  );
}
