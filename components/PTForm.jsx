"use client";
import { useMemo } from "react";
import { Field, YesNo, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import { CONTRATOS_OPTIONS, sectionCompleteness } from "../lib/model";

export default function PTForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setTx = (id, patch) => setData((d) => ({ ...d, transacciones: d.transacciones.map((t) => (t.id === id ? { ...t, ...patch } : t)) }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const txCompleteness = useMemo(() => {
    const marked = data.transacciones.filter((t) => t.valorIngresos || t.valorEgresos).length;
    return data.transacciones.length ? Math.round((marked / data.transacciones.length) * 100) : 0;
  }, [data.transacciones]);

  return (
    <>
      <Card title="Información general" eyebrow="Sección 1" pct={sectionCompleteness(data.general)}>
        <div className="op-grid2">
          <Field label="Compañía o entidad (tipo)"><input className="op-input" value={data.general.tipoEntidad} onChange={(e) => set("general", { tipoEntidad: e.target.value })} /></Field>
          <Field label="Actividad económica principal"><input className="op-input" value={data.general.actividadEconomica} onChange={(e) => set("general", { actividadEconomica: e.target.value })} /></Field>
          <Field label="Período o año a evaluar"><input className="op-input" value={data.general.periodoEvaluar} onChange={(e) => set("general", { periodoEvaluar: e.target.value })} /></Field>
        </div>
      </Card>

      <Card title="Consideraciones generales" eyebrow="Sección 2" pct={sectionCompleteness(data.consideraciones)}>
        <Field label="¿Con cuántas partes vinculadas realizó transacciones? (dato aproximado)">
          <input type="number" className="op-input" value={data.consideraciones.numPartesVinculadas} onChange={(e) => set("consideraciones", { numPartesVinculadas: e.target.value })} />
        </Field>
        <YesNo label="¿Ha realizado operaciones con partes vinculadas domiciliadas?" value={data.consideraciones.opDomiciliadas} onChange={(v) => set("consideraciones", { opDomiciliadas: v })} />
        <YesNo label="¿Ha realizado operaciones con partes vinculadas no domiciliadas?" value={data.consideraciones.opNoDomiciliadas} onChange={(v) => set("consideraciones", { opNoDomiciliadas: v })} />
        <YesNo label="¿Ha realizado operaciones con paraísos fiscales?" value={data.consideraciones.opParaisosFiscales} onChange={(v) => set("consideraciones", { opParaisosFiscales: v })} />
        <YesNo label="¿La empresa consolida estados financieros o es parte de una consolidación?" value={data.consideraciones.consolidaEEFF} onChange={(v) => set("consideraciones", { consolidaEEFF: v })} />
        <YesNo label="¿La empresa ha desarrollado la evaluación del test de beneficio?" value={data.consideraciones.testBeneficio} onChange={(v) => set("consideraciones", { testBeneficio: v })} />
      </Card>

      <Card title="Transacciones con vinculados" eyebrow="Sección 3" pct={txCompleteness}>
        <p className="op-card-sub">Indica el valor de ingresos y/o egresos según corresponda, y el número de contratos u operaciones.</p>
        <table className="op-tx-table">
          <thead>
            <tr>
              <th>Tipo de transacción</th>
              <th>Valor ingresos</th>
              <th>No. de contratos</th>
              <th>Valor egresos</th>
              <th>No. de contratos</th>
            </tr>
          </thead>
          <tbody>
            {data.transacciones.map((t) => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td><input type="number" className="op-input" value={t.valorIngresos} onChange={(e) => setTx(t.id, { valorIngresos: e.target.value })} placeholder="$" /></td>
                <td>
                  <select className="op-select" value={t.contratosIngresos} onChange={(e) => setTx(t.id, { contratosIngresos: e.target.value })}>
                    <option value="">—</option>
                    {CONTRATOS_OPTIONS.map((n) => (
                      <option value={n} key={n}>{n}</option>
                    ))}
                  </select>
                </td>
                <td><input type="number" className="op-input" value={t.valorEgresos} onChange={(e) => setTx(t.id, { valorEgresos: e.target.value })} placeholder="$" /></td>
                <td>
                  <select className="op-select" value={t.contratosEgresos} onChange={(e) => setTx(t.id, { contratosEgresos: e.target.value })}>
                    <option value="">—</option>
                    {CONTRATOS_OPTIONS.map((n) => (
                      <option value={n} key={n}>{n}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Field label="Detalle de 'Otros' u observaciones sobre las transacciones">
          <textarea className="op-input" rows={2} value={data.otrosDetalle} onChange={(e) => setData((d) => ({ ...d, otrosDetalle: e.target.value }))} />
        </Field>
      </Card>

      <DocumentosForm data={data.documentos} setData={setDocumentos} />

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
