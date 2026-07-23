"use client";
import { useState, useEffect } from "react";
import { Styles, Logo } from "../../components/Brand";
import { RevisoriaSummary, PTSummary, OutsourcingSummary } from "../../components/Summaries";
import { fmtDate } from "../../lib/model";
import { loadSaved, deleteSaved } from "../../lib/data";
import { exportRecordToExcel } from "../../lib/exportExcel";

function tipoLabel(tipo) {
  if (tipo === "revisoria") return "Revisoría Fiscal";
  if (tipo === "pt") return "Precios de Transferencia";
  return "Outsourcing Contable";
}

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError(false);
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.ok) {
        sessionStorage.setItem("admin-ok", "1");
        onUnlock();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
    setChecking(false);
  };

  return (
    <div className="op-gate">
      <h1>Acceso de administrador</h1>
      <form onSubmit={submit}>
        <input
          type="password"
          className="op-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        <button className="op-btn green" style={{ width: "100%" }} type="submit" disabled={checking}>
          {checking ? "Verificando…" : "Entrar"}
        </button>
        {error && <div className="error">Contraseña incorrecta.</div>}
      </form>
    </div>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checkedSession, setCheckedSession] = useState(false);
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("admin-ok") === "1") setUnlocked(true);
    setCheckedSession(true);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    (async () => {
      const list = await loadSaved();
      setSaved(list);
      setLoading(false);
    })();
  }, [unlocked]);

  const eliminar = async (id) => {
    setSaved((prev) => prev.filter((r) => r.id !== id));
    if (selected?.id === id) setSelected(null);
    await deleteSaved(id);
  };

  if (!checkedSession) return null;

  if (!unlocked) {
    return (
      <div className="op-root">
        <Styles />
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="op-root">
      <Styles />
      <div className="op-topbar op-no-print">
        <Logo subtitle="Panel interno — cuestionarios recibidos" />
        {selected && (
          <div style={{ display: "flex", gap: 8 }}>
            <button className="op-btn ghost" onClick={() => setSelected(null)}>Volver a la lista</button>
            <button className="op-btn ghost" onClick={() => exportRecordToExcel(selected)}>Descargar Excel</button>
            <button className="op-btn green" onClick={() => window.print()}>Imprimir / Guardar como PDF</button>
          </div>
        )}
      </div>

      {!selected && (
        <div className="op-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="op-card">
            <div className="op-card-title">Cuestionarios recibidos</div>
            {loading ? (
              <div className="op-empty">Cargando…</div>
            ) : saved.length === 0 ? (
              <div className="op-empty">Todavía no ha llegado ningún cuestionario.</div>
            ) : (
              <table className="op-list-table">
                <thead><tr><th>Cliente</th><th>Tipo</th><th>Fecha</th><th></th></tr></thead>
                <tbody>
                  {saved.map((r) => (
                    <tr key={r.id}>
                      <td>{r.empresa}</td>
                      <td>{tipoLabel(r.tipo)}</td>
                      <td>{fmtDate(r.fecha)}</td>
                      <td style={{ display: "flex", gap: 6 }}>
                        <button className="op-btn ghost" onClick={() => setSelected(r)}>Ver resumen</button>
                        <button className="op-btn ghost" onClick={() => exportRecordToExcel(r)}>Excel</button>
                        <button className="op-btn danger" onClick={() => eliminar(r.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {selected && (
        <div className="op-doc-wrap">
          <div className="op-doc">
            <div className="op-doc-header">
              <div>
                <p className="op-doc-title">Resumen de levantamiento de información</p>
                <p className="op-doc-sub">{tipoLabel(selected.tipo)} · {selected.empresa}</p>
              </div>
              <div className="op-stamp">
                <div className="t1">USO INTERNO</div>
                <div className="t2">No enviar al cliente</div>
              </div>
            </div>
            {selected.tipo === "revisoria" && <RevisoriaSummary data={selected.data} />}
            {selected.tipo === "pt" && <PTSummary data={selected.data} />}
            {selected.tipo === "outsourcing" && <OutsourcingSummary data={selected.data} />}
          </div>
        </div>
      )}
    </div>
  );
}
