"use client";
import { useState } from "react";
import { Styles, Logo, Footer } from "../components/Brand";
import ContactoForm from "../components/ContactoForm";
import RevisoriaForm from "../components/RevisoriaForm";
import PTForm from "../components/PTForm";
import OutsourcingForm from "../components/OutsourcingForm";
import { emptyRevisoria, emptyPT, emptyOutsourcing, sectionCompleteness } from "../lib/model";
import { insertSaved } from "../lib/data";

export default function ClientPage() {
  const [view, setView] = useState("hero"); // hero | landing | form | thanks
  const [tipo, setTipo] = useState(null);
  const [revisoria, setRevisoria] = useState(emptyRevisoria());
  const [pt, setPT] = useState(emptyPT());
  const [outsourcing, setOutsourcing] = useState(emptyOutsourcing());
  const [sending, setSending] = useState(false);
  const [autorizado, setAutorizado] = useState(false);

  const dataByTipo = { revisoria, pt, outsourcing };
  const setterByTipo = { revisoria: setRevisoria, pt: setPT, outsourcing: setOutsourcing };
  const currentData = tipo ? dataByTipo[tipo] : null;
  const setCurrentData = tipo ? setterByTipo[tipo] : null;

  const setContacto = (updater) => {
    setCurrentData((d) => ({ ...d, contacto: typeof updater === "function" ? updater(d.contacto) : updater }));
  };

  const overallPct = (() => {
    if (!tipo) return 0;
    const contactoPct = sectionCompleteness(currentData.contacto);
    if (tipo === "revisoria") {
      const secciones = ["generales", "cuentas", "fiscal", "personal", "financiera"];
      const pcts = secciones.map((s) => sectionCompleteness(revisoria[s]));
      return Math.round((contactoPct + pcts.reduce((a, b) => a + b, 0)) / (pcts.length + 1));
    }
    if (tipo === "pt") {
      const p1 = sectionCompleteness(pt.general);
      const p2 = sectionCompleteness(pt.consideraciones);
      const marcadas = pt.transacciones.filter((t) => t.valorIngresos || t.valorEgresos).length;
      const p3 = pt.transacciones.length ? Math.round((marcadas / pt.transacciones.length) * 100) : 0;
      return Math.round((contactoPct + p1 + p2 + p3) / 4);
    }
    const p1 = sectionCompleteness(outsourcing.operacion);
    const p2 = sectionCompleteness(outsourcing.contable);
    return Math.round((contactoPct + p1 + p2) / 3);
  })();

  const empresaNombre = currentData?.contacto?.razonSocial || "";
  const contactoCompleto = currentData?.contacto?.correo && currentData?.contacto?.telefono;

  const startNew = (t) => {
    setTipo(t);
    if (t === "revisoria") setRevisoria(emptyRevisoria());
    else if (t === "pt") setPT(emptyPT());
    else setOutsourcing(emptyOutsourcing());
    setView("form");
  };

  const enviar = async () => {
    setSending(true);
    const id = `${tipo === "revisoria" ? "RF" : tipo === "pt" ? "PT" : "OC"}-${Date.now()}`;
    await insertSaved({
      id,
      tipo,
      empresa: empresaNombre || "Sin nombre",
      fecha: new Date().toISOString().slice(0, 10),
      data: {
        ...currentData,
        _consentimientoDatos: { autorizado: true, fechaHora: new Date().toISOString() },
      },
    });
    setSending(false);
    setView("thanks");
  };

  return (
    <div className="op-root">
      <Styles />
      <div className="op-topbar">
        <Logo subtitle="Cuestionario de información para propuesta" />
      </div>

      {view === "hero" && (
        <div className="op-hero">
          <video className="op-hero-video" autoPlay muted loop playsInline poster="/hero-poster.jpg">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="op-hero-overlay" />
          <div className="op-hero-content">
            <h1>Cotizar con una firma contable no debería ser complicado</h1>
            <p>
              Sabemos que solicitar una cotización puede tomar tiempo: correos, llamadas, documentos y varias
              preguntas antes de recibir una propuesta.
            </p>
            <p>
              En OPTIMICE COLOMBIA S.A.S. queremos hacerlo más fácil. Por eso, hemos automatizado la recepción
              inicial de la información para conocer rápidamente tu empresa y preparar una cotización ajustada
              a tus necesidades.
            </p>
            <p>
              Esto no reemplaza el contacto personal. Después de recibir tu información, coordinaremos una
              reunión para conocernos, entender mejor tu operación y resolver las inquietudes necesarias.
            </p>
            <p style={{ marginBottom: 4 }}>
              Inicia aquí tu solicitud de cotización. Es fácil, confidencial y puedes ingresar valores aproximados.
            </p>
            <p className="tagline">Menos trámites para cotizar. Más tiempo para conocerte y entender tu negocio.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="op-btn green" style={{ padding: "12px 28px", fontSize: 14.5 }} onClick={() => setView("landing")}>
                Solicitar mi cotización
              </button>
              <a
                href="https://co.optimice-international.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="op-btn ghost-light"
                style={{ padding: "12px 28px", fontSize: 14.5, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
              >
                Conocer Optimice
              </a>
            </div>
          </div>
        </div>
      )}

      {view === "landing" && (
        <div className="op-landing">
          <h1>¿Qué información necesitamos de tu empresa?</h1>
          <p>Elige el servicio para el que necesitas la propuesta y completa el formulario. Con esta información preparamos tu cotización.</p>
          <div className="op-choice-grid">
            <button className="op-choice" onClick={() => startNew("revisoria")}>
              <div className="eyebrow">Servicio 1</div>
              <h3>Revisoría Fiscal</h3>
              <p>Datos generales, cuentas y transacciones, situación fiscal, personal e información financiera.</p>
            </button>
            <button className="op-choice" onClick={() => startNew("pt")}>
              <div className="eyebrow">Servicio 2</div>
              <h3>Precios de Transferencia</h3>
              <p>Información general, consideraciones sobre vinculados y transacciones con partes relacionadas.</p>
            </button>
            <button className="op-choice" onClick={() => startNew("outsourcing")}>
              <div className="eyebrow">Servicio 3</div>
              <h3>Outsourcing Contable</h3>
              <p>Tamaño y operación, situación contable y tributaria, y documentos de la empresa.</p>
            </button>
          </div>
        </div>
      )}

      {view === "form" && tipo && (
        <div className="op-layout">
          <div>
            <ContactoForm data={currentData.contacto} setData={setContacto} />
            {tipo === "revisoria" && <RevisoriaForm data={revisoria} setData={setRevisoria} />}
            {tipo === "pt" && <PTForm data={pt} setData={setPT} />}
            {tipo === "outsourcing" && <OutsourcingForm data={outsourcing} setData={setOutsourcing} />}
          </div>

          <div className="op-summary">
            <div className="op-summary-eyebrow">
              {tipo === "revisoria" ? "REVISORÍA FISCAL" : tipo === "pt" ? "PRECIOS DE TRANSFERENCIA" : "OUTSOURCING CONTABLE"}
            </div>
            <div className="op-summary-name">{empresaNombre || "Tu empresa"}</div>
            <div className="op-progress-total">{overallPct}% completado</div>
            <div className="op-progress-bar-track"><div className="op-progress-bar-fill" style={{ width: `${overallPct}%` }} /></div>

            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 18, fontSize: 11.5, lineHeight: 1.5, color: "rgba(245,245,243,.85)" }}>
              <input
                type="checkbox"
                checked={autorizado}
                onChange={(e) => setAutorizado(e.target.checked)}
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <span>
                Declaro que he leído y autorizo a OPTIMICE COLOMBIA S.A.S. para recolectar, almacenar, consultar y utilizar los datos suministrados en este formulario con el propósito de analizar mi solicitud, contactarme y elaborar y enviar la cotización correspondiente, de conformidad con la{" "}
                <a href="/politica-datos" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", fontWeight: 600 }}>
                  Política de Tratamiento y Protección de Datos Personales
                </a>.
              </span>
            </label>

            <button
              className="op-btn green"
              style={{ width: "100%", marginTop: 14 }}
              onClick={enviar}
              disabled={sending || !empresaNombre || !contactoCompleto || !autorizado}
            >
              {sending ? "Enviando…" : "Enviar información"}
            </button>
            {(!empresaNombre || !contactoCompleto) && (
              <div style={{ fontSize: 11.5, color: "rgba(245,245,243,.7)", marginTop: 8 }}>
                Completa razón social, correo y teléfono para poder enviar.
              </div>
            )}
            {empresaNombre && contactoCompleto && !autorizado && (
              <div style={{ fontSize: 11.5, color: "rgba(245,245,243,.7)", marginTop: 8 }}>
                Debes autorizar el tratamiento de datos para poder enviar.
              </div>
            )}
          </div>
        </div>
      )}

      {view === "thanks" && (
        <div className="op-thanks">
          <div className="icon">✓</div>
          <h1>¡Gracias! Recibimos tu información</h1>
          <p>Nuestro equipo la va a revisar y se pondrá en contacto contigo con la propuesta.</p>
        </div>
      )}
      <Footer />
    </div>
  );
}
