"use client";

export function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

      .op-root {
        --ink: #2E2E2E;
        --ink-soft: #4A4A4A;
        --paper: #FAFAF9;
        --card: #FFFFFF;
        --slate: #7A7A7A;
        --hairline: #E4E4E1;
        --green: #4FC72E;
        --green-dark: #379A1F;
        --green-soft: #EAF9E4;
        --red: #C24545;
        font-family: 'Inter', sans-serif;
        color: var(--ink);
        background: var(--paper);
        min-height: 100%;
      }
      .op-root * { box-sizing: border-box; }
      .op-brandfont { font-family: 'Poppins', sans-serif; font-weight: 700; }

      .op-topbar { display: flex; align-items: center; justify-content: space-between; padding: 14px 24px; border-bottom: 1px solid var(--hairline); background: var(--card); flex-wrap: wrap; gap: 12px; }
      .op-logo { height: 58px; display: block; }
      .op-brand-sub { font-size: 11px; color: var(--slate); letter-spacing: .04em; text-transform: uppercase; margin-top: 2px; }

      .op-btn { border: 1px solid var(--ink); background: var(--ink); color: #fff; padding: 9px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; }
      .op-btn:hover { opacity: .9; }
      .op-btn.ghost { background: transparent; color: var(--ink); border-color: var(--hairline); }
      .op-btn.green { background: var(--green); border-color: var(--green); color: #fff; }
      .op-btn.danger { background: transparent; color: var(--red); border-color: var(--red); }
      .op-btn:disabled { opacity: .4; cursor: not-allowed; }

      .op-hero { position: relative; overflow: hidden; min-height: 620px; display: flex; align-items: center; justify-content: center; }
      .op-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
      .op-hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(20,26,20,.62) 0%, rgba(20,26,20,.72) 55%, rgba(20,26,20,.85) 100%); }
      .op-hero-content { position: relative; z-index: 2; max-width: 640px; text-align: center; padding: 60px 24px; }
      .op-hero-content h1 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 28px; color: #fff; margin-bottom: 16px; line-height: 1.25; }
      .op-hero-content p { color: rgba(255,255,255,.88); font-size: 14px; line-height: 1.6; margin-bottom: 18px; }
      .op-hero-content .tagline { font-style: italic; color: rgba(255,255,255,.8); font-size: 13.5px; margin-bottom: 22px; }
      .op-btn.ghost-light { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.65); }
      .op-btn.ghost-light:hover { background: rgba(255,255,255,.1); }

      .op-landing { max-width: 720px; margin: 60px auto; text-align: center; padding: 0 20px; }
      .op-landing h1 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 26px; margin-bottom: 8px; }
      .op-landing p { color: var(--slate); font-size: 14px; margin-bottom: 32px; }
      .op-choice-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      @media (max-width: 900px) { .op-choice-grid { grid-template-columns: 1fr 1fr; } }
      @media (max-width: 640px) { .op-choice-grid { grid-template-columns: 1fr; } }
      .op-choice { background: var(--card); border: 1px solid var(--hairline); border-radius: 12px; padding: 26px; cursor: pointer; text-align: left; transition: .15s; }
      .op-choice:hover { border-color: var(--green); box-shadow: 0 2px 12px rgba(79,199,46,.14); }
      .op-choice .eyebrow { font-size: 10px; text-transform: uppercase; letter-spacing: .08em; color: var(--green-dark); font-weight: 700; margin-bottom: 6px; }
      .op-choice h3 { font-family: 'Poppins', sans-serif; font-weight: 700; margin: 0 0 8px 0; font-size: 17px; }
      .op-choice p { color: var(--slate); font-size: 12.5px; margin: 0; }

      .op-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 20px; padding: 24px; max-width: 1180px; margin: 0 auto; align-items: start; }
      @media (max-width: 860px) { .op-layout { grid-template-columns: 1fr; } }

      .op-card { background: var(--card); border: 1px solid var(--hairline); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
      .op-card-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 15px; margin: 0 0 4px 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
      .op-card-sub { font-size: 11.5px; color: var(--slate); margin-bottom: 14px; }
      .op-eyebrow { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--green-dark); font-weight: 700; margin-bottom: 4px; }
      .op-badge { font-size: 10.5px; font-weight: 600; border: 1px solid; border-radius: 20px; padding: 2px 9px; }

      .op-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .op-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
      .op-field label { font-size: 11.5px; color: var(--ink-soft); font-weight: 600; }
      .op-input, .op-select, textarea.op-input { border: 1px solid var(--hairline); border-radius: 8px; padding: 9px 11px; font-size: 13.5px; font-family: 'Inter', sans-serif; color: var(--ink); background: #fff; width: 100%; }
      .op-input:focus, .op-select:focus { outline: 2px solid var(--green-soft); border-color: var(--green); }

      .op-chip-row { display: flex; gap: 8px; }
      .op-chip { border: 1px solid var(--hairline); background: #fff; padding: 7px 16px; border-radius: 20px; font-size: 12.5px; font-weight: 600; cursor: pointer; color: var(--slate); font-family: 'Inter', sans-serif; }
      .op-chip.active-yes { background: var(--green); border-color: var(--green); color: #fff; }
      .op-chip.active-no { background: var(--red); border-color: var(--red); color: #fff; }

      .op-tx-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
      .op-tx-table th { text-align: left; font-size: 10px; text-transform: uppercase; color: var(--slate); padding: 6px 4px; border-bottom: 1px solid var(--ink); }
      .op-tx-table td { padding: 8px 4px; border-bottom: 1px solid var(--hairline); vertical-align: middle; }
      .op-tx-table input[type=number] { width: 100px; }

      .op-summary { position: sticky; top: 20px; background: var(--ink); color: #F5F5F3; border-radius: 12px; padding: 22px; }
      .op-summary-eyebrow { font-family: 'Poppins', sans-serif; font-size: 11px; color: var(--green); letter-spacing: .05em; font-weight: 700; }
      .op-summary-name { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 18px; margin: 4px 0 16px 0; }
      .op-progress-total { text-align: center; margin-top: 8px; font-size: 12px; color: rgba(245,245,243,.75); }
      .op-progress-bar-track { background: rgba(255,255,255,.15); border-radius: 6px; height: 6px; width: 100%; overflow: hidden; margin-top: 8px; }
      .op-progress-bar-fill { background: var(--green); height: 100%; border-radius: 6px; }

      .op-thanks { max-width: 520px; margin: 80px auto; text-align: center; padding: 0 20px; }
      .op-thanks .icon { width: 64px; height: 64px; border-radius: 50%; background: var(--green-soft); color: var(--green-dark); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px auto; font-size: 30px; }
      .op-thanks h1 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 22px; margin-bottom: 10px; }
      .op-thanks p { color: var(--slate); font-size: 14px; }

      .op-doc-wrap { padding: 32px 16px; display: flex; justify-content: center; }
      .op-doc { background: #fff; width: 100%; max-width: 780px; padding: 48px; border: 1px solid var(--hairline); border-radius: 8px; position: relative; }
      .op-doc-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--ink); padding-bottom: 18px; margin-bottom: 24px; }
      .op-doc-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; margin: 0; }
      .op-doc-sub { font-size: 12px; color: var(--slate); margin-top: 4px; }
      .op-stamp { border: 2px solid var(--red); color: var(--red); border-radius: 8px; padding: 8px 14px; text-align: center; flex-shrink: 0; }
      .op-stamp .t1 { font-size: 11px; font-weight: 700; letter-spacing: .04em; }
      .op-stamp .t2 { font-size: 8.5px; letter-spacing: .05em; }

      .op-doc-section { margin-bottom: 22px; }
      .op-doc-section h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 14px; border-bottom: 1px solid var(--hairline); padding-bottom: 6px; margin-bottom: 10px; }
      .op-doc-row { display: flex; justify-content: space-between; gap: 16px; font-size: 12.5px; padding: 5px 0; }
      .op-doc-row .q { color: var(--slate); max-width: 62%; }
      .op-doc-row .a { font-weight: 600; text-align: right; }
      .op-doc-row .a.empty { color: var(--red); font-weight: 400; font-style: italic; }

      .op-empty { text-align: center; padding: 60px 20px; color: var(--slate); }
      .op-list-table { width: 100%; border-collapse: collapse; }
      .op-list-table th { text-align: left; font-size: 11px; text-transform: uppercase; color: var(--slate); border-bottom: 1px solid var(--hairline); padding: 8px 6px; }
      .op-list-table td { padding: 10px 6px; border-bottom: 1px solid var(--hairline); font-size: 13px; }

      .op-gate { max-width: 380px; margin: 100px auto; text-align: center; padding: 0 20px; }
      .op-gate h1 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 18px; }
      .op-gate .op-input { margin-bottom: 12px; text-align: center; }
      .op-gate .error { color: var(--red); font-size: 12.5px; margin-top: 8px; }

      .op-whatsapp-fab {
        position: fixed; bottom: 22px; right: 22px; z-index: 40;
        background: #25D366; color: #fff; padding: 13px 20px; border-radius: 999px;
        display: flex; align-items: center; gap: 9px; box-shadow: 0 6px 18px rgba(0,0,0,.28);
        font-weight: 600; font-size: 13.5px; text-decoration: none; font-family: 'Inter', sans-serif;
        transition: transform .15s;
      }
      .op-whatsapp-fab:hover { transform: scale(1.04); }
      .op-whatsapp-fab svg { width: 20px; height: 20px; flex-shrink: 0; }
      @media (max-width: 480px) {
        .op-whatsapp-fab { padding: 13px; }
        .op-whatsapp-fab .wa-label { display: none; }
      }

      @media print {
        .op-no-print { display: none !important; }
        .op-root { background: #fff !important; }
        .op-doc-wrap { padding: 0; }
        .op-doc { border: none; box-shadow: none; max-width: 100%; padding: 0; }
      }
    `}</style>
  );
}

export function Logo({ subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Optimice Colombia" className="op-logo" />
      {subtitle && <div className="op-brand-sub">{subtitle}</div>}
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", padding: "20px 24px", textAlign: "center", fontSize: 11.5, color: "var(--slate)", marginTop: 40 }}>
      OPTIMICE COLOMBIA S.A.S. protege sus datos personales de acuerdo con la Ley 1581 de 2012 y su{" "}
      <a href="/politica-datos" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-dark)", fontWeight: 600 }}>
        Política de Tratamiento y Protección de Datos Personales
      </a>
      . Para consultas, actualizaciones, correcciones, revocatorias o solicitudes de eliminación de información, puede comunicarse al correo{" "}
      <a href="mailto:info@optimice.com.co" style={{ color: "var(--green-dark)", fontWeight: 600 }}>info@optimice.com.co</a>.
    </footer>
  );
}

export function WhatsAppButton({ phone, message }) {
  const href = `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="op-whatsapp-fab op-no-print" aria-label="Contáctanos por WhatsApp">
      <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.61 1.902 6.475L4 29l7.716-1.865A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm0 21.75a9.71 9.71 0 0 1-4.95-1.358l-.355-.21-4.583 1.108 1.127-4.464-.232-.366A9.7 9.7 0 0 1 5.25 15c0-5.936 4.815-10.75 10.751-10.75S26.75 9.064 26.75 15 21.937 24.75 16.001 24.75zm5.34-7.926c-.293-.147-1.734-.856-2.003-.954-.269-.098-.465-.147-.66.147-.196.293-.758.954-.929 1.15-.171.196-.342.22-.635.073-.293-.147-1.235-.455-2.352-1.451-.869-.775-1.456-1.732-1.627-2.025-.171-.293-.018-.452.129-.598.132-.132.293-.343.44-.514.147-.171.196-.293.293-.489.098-.196.049-.367-.024-.514-.073-.147-.66-1.59-.904-2.178-.238-.572-.48-.494-.66-.503l-.562-.01c-.196 0-.514.073-.783.367-.269.293-1.026 1.003-1.026 2.446s1.05 2.836 1.196 3.032c.147.196 2.065 3.152 5.005 4.42.699.302 1.244.482 1.669.617.701.223 1.339.192 1.843.116.562-.084 1.734-.709 1.979-1.393.245-.685.245-1.271.171-1.393-.073-.123-.269-.196-.562-.343z" />
      </svg>
      <span className="wa-label">Contáctanos por WhatsApp</span>
    </a>
  );
}

export function Field({ label, children }) {
  return (
    <div className="op-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

export function YesNo({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div className="op-chip-row">
        <button type="button" className={`op-chip ${value === true ? "active-yes" : ""}`} onClick={() => onChange(value === true ? null : true)}>Sí</button>
        <button type="button" className={`op-chip ${value === false ? "active-no" : ""}`} onClick={() => onChange(value === false ? null : false)}>No</button>
      </div>
    </Field>
  );
}

export function CompletBadge({ pct }) {
  const color = pct === 100 ? "var(--green-dark)" : pct === 0 ? "var(--slate)" : "#B8863B";
  return (
    <span className="op-badge" style={{ color, borderColor: color }}>
      {pct}% diligenciado
    </span>
  );
}

export function Card({ title, eyebrow, pct, children }) {
  return (
    <div className="op-card">
      <div className="op-eyebrow">{eyebrow}</div>
      <div className="op-card-title">
        <span>{title}</span>
        {pct !== undefined && <CompletBadge pct={pct} />}
      </div>
      {children}
    </div>
  );
}
