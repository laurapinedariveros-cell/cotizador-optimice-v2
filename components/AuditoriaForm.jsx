"use client";
import { Field, YesNo, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import {
  TIPO_SERVICIO_AUDITORIA_OPTIONS, INGRESOS_AUDITORIA_OPTIONS, ACTIVOS_TOTALES_OPTIONS,
  EMPLEADOS_AUDITORIA_OPTIONS, CONTABILIDAD_ACTUALIZADA_TRI, SITUACIONES_ESPECIALES_OPTIONS,
  DOC_FIELDS_AUDITORIA, sectionCompleteness,
} from "../lib/model";

function ChipSelect({ label, options, value, onChange }) {
  return (
    <Field label={label}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {options.map((op) => (
          <button key={op} type="button" className={`op-chip ${value === op ? "active-yes" : ""}`} onClick={() => onChange(op)}>
            {op}
          </button>
        ))}
      </div>
    </Field>
  );
}

export default function AuditoriaForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const toggleSituacion = (item) => {
    setData((d) => {
      const has = d.servicio.situacionesEspeciales.includes(item);
      const situacionesEspeciales = has
        ? d.servicio.situacionesEspeciales.filter((o) => o !== item)
        : [...d.servicio.situacionesEspeciales, item];
      return { ...d, servicio: { ...d.servicio, situacionesEspeciales } };
    });
  };

  return (
    <>
      <Card title="Información del servicio" eyebrow="Auditoría Financiera" pct={sectionCompleteness(data.servicio)}>
        <Field label="¿Qué servicio requiere?">
          <select className="op-select" value={data.servicio.tipoServicio} onChange={(e) => set("servicio", { tipoServicio: e.target.value })}>
            <option value="">Seleccionar…</option>
            {TIPO_SERVICIO_AUDITORIA_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        {data.servicio.tipoServicio === "Otro" && (
          <Field label="¿Cuál?"><input className="op-input" value={data.servicio.tipoServicioOtro} onChange={(e) => set("servicio", { tipoServicioOtro: e.target.value })} /></Field>
        )}

        <Field label="¿Qué período requiere auditar?">
          <input className="op-input" value={data.servicio.periodoAuditar} onChange={(e) => set("servicio", { periodoAuditar: e.target.value })} placeholder="Ej: año 2025, primer semestre 2026…" />
        </Field>

        <Field label="Ingresos anuales aproximados">
          <select className="op-select" value={data.servicio.ingresosAnuales} onChange={(e) => set("servicio", { ingresosAnuales: e.target.value })}>
            <option value="">Seleccionar…</option>
            {INGRESOS_AUDITORIA_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <Field label="Activos totales aproximados">
          <select className="op-select" value={data.servicio.activosTotales} onChange={(e) => set("servicio", { activosTotales: e.target.value })}>
            <option value="">Seleccionar…</option>
            {ACTIVOS_TOTALES_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <Field label="Número de empleados">
          <select className="op-select" value={data.servicio.numEmpleados} onChange={(e) => set("servicio", { numEmpleados: e.target.value })}>
            <option value="">Seleccionar…</option>
            {EMPLEADOS_AUDITORIA_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <ChipSelect label="¿La contabilidad se encuentra actualizada y conciliada?" options={CONTABILIDAD_ACTUALIZADA_TRI} value={data.servicio.contabilidadActualizada} onChange={(v) => set("servicio", { contabilidadActualizada: v })} />

        <YesNo label="¿La empresa ha sido auditada anteriormente?" value={data.servicio.auditadaAnteriormente} onChange={(v) => set("servicio", { auditadaAnteriormente: v })} />

        <Field label="¿Existe alguna situación especial que debamos conocer?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SITUACIONES_ESPECIALES_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.servicio.situacionesEspeciales.includes(op) ? "active-yes" : ""}`} onClick={() => toggleSituacion(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.servicio.situacionesEspeciales.includes("Otra") && (
          <Field label="¿Cuál otra situación?"><input className="op-input" value={data.servicio.situacionesEspecialesOtra} onChange={(e) => set("servicio", { situacionesEspecialesOtra: e.target.value })} /></Field>
        )}

        <Field label="¿Para qué fecha requiere el informe?">
          <input type="date" className="op-input" value={data.servicio.fechaInforme} onChange={(e) => set("servicio", { fechaInforme: e.target.value })} />
        </Field>
      </Card>

      <DocumentosForm data={data.documentos} setData={setDocumentos} fields={DOC_FIELDS_AUDITORIA} />

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
