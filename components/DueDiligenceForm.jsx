"use client";
import { Field, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import {
  TIPO_REVISION_DD_OPTIONS, PROPOSITO_DD_OPTIONS, OPERACION_NEGOCIACION_OPTIONS, FECHA_CIERRE_PREVISTA_OPTIONS,
  PERIODOS_DD_OPTIONS, UNA_O_VARIAS_OPTIONS, INGRESOS_DD_OPTIONS, ACTIVOS_DD_OPTIONS, EMPLEADOS_AUDITORIA_OPTIONS,
  EF_RECIENTES_OPTIONS, CONTABILIDAD_ACTUALIZADA_TRI, CONCEPTOS_DD_OPTIONS, SITUACIONES_DD_OPTIONS,
  DOC_FIELDS_DUE_DILIGENCE, sectionCompleteness,
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

export default function DueDiligenceForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const toggleConcepto = (item) => {
    setData((d) => {
      const has = d.aspectos.conceptos.includes(item);
      const conceptos = has ? d.aspectos.conceptos.filter((o) => o !== item) : [...d.aspectos.conceptos, item];
      return { ...d, aspectos: { ...d.aspectos, conceptos } };
    });
  };

  const toggleSituacion = (item) => {
    setData((d) => {
      const has = d.aspectos.situacionesEspeciales.includes(item);
      const situacionesEspeciales = has
        ? d.aspectos.situacionesEspeciales.filter((o) => o !== item)
        : [...d.aspectos.situacionesEspeciales, item];
      return { ...d, aspectos: { ...d.aspectos, situacionesEspeciales } };
    });
  };

  return (
    <>
      <Card title="Información de la empresa" eyebrow="Sección 2" pct={sectionCompleteness(data.empresa)}>
        <div className="op-grid2">
          <Field label="Razón social de la empresa objeto de revisión">
            <input className="op-input" value={data.empresa.razonSocial} onChange={(e) => set("empresa", { razonSocial: e.target.value })} />
          </Field>
          <Field label="NIT">
            <input className="op-input" value={data.empresa.nit} onChange={(e) => set("empresa", { nit: e.target.value })} />
          </Field>
          <Field label="Ciudad principal de operación">
            <input className="op-input" value={data.empresa.ciudad} onChange={(e) => set("empresa", { ciudad: e.target.value })} />
          </Field>
          <Field label="Actividad económica principal">
            <input className="op-input" value={data.empresa.actividadEconomica} onChange={(e) => set("empresa", { actividadEconomica: e.target.value })} />
          </Field>
        </div>
        <Field label="Describa brevemente a qué se dedica la empresa">
          <textarea className="op-input" rows={2} value={data.empresa.descripcion} onChange={(e) => set("empresa", { descripcion: e.target.value })} />
        </Field>
      </Card>

      <Card title="Tipo de Due Diligence" eyebrow="Sección 3">
        <Field label="¿Qué tipo de revisión requiere?">
          <select className="op-select" value={data.tipoRevision} onChange={(e) => setData((d) => ({ ...d, tipoRevision: e.target.value }))}>
            <option value="">Seleccionar…</option>
            {TIPO_REVISION_DD_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
      </Card>

      <Card title="Motivo de la revisión" eyebrow="Sección 4" pct={sectionCompleteness(data.motivo)}>
        <Field label="¿Cuál es el propósito principal del Due Diligence?">
          <select className="op-select" value={data.motivo.proposito} onChange={(e) => set("motivo", { proposito: e.target.value })}>
            <option value="">Seleccionar…</option>
            {PROPOSITO_DD_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        {data.motivo.proposito === "Otro" && (
          <Field label="¿Cuál?"><input className="op-input" value={data.motivo.propositoOtro} onChange={(e) => set("motivo", { propositoOtro: e.target.value })} /></Field>
        )}
        <ChipSelect label="¿La operación ya se encuentra en negociación?" options={OPERACION_NEGOCIACION_OPTIONS} value={data.motivo.operacionEnNegociacion} onChange={(v) => set("motivo", { operacionEnNegociacion: v })} />
        <ChipSelect label="¿Existe una fecha prevista para cerrar la operación?" options={FECHA_CIERRE_PREVISTA_OPTIONS} value={data.motivo.fechaCierrePrevista} onChange={(v) => set("motivo", { fechaCierrePrevista: v })} />
        {data.motivo.fechaCierrePrevista === "Sí" && (
          <Field label="Indique la fecha estimada de cierre">
            <input type="date" className="op-input" value={data.motivo.fechaCierreEstimada} onChange={(e) => set("motivo", { fechaCierreEstimada: e.target.value })} />
          </Field>
        )}
      </Card>

      <Card title="Alcance de la revisión" eyebrow="Sección 5" pct={sectionCompleteness(data.alcance)}>
        <Field label="¿Qué periodos requiere revisar?">
          <select className="op-select" value={data.alcance.periodos} onChange={(e) => set("alcance", { periodos: e.target.value })}>
            <option value="">Seleccionar…</option>
            {PERIODOS_DD_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <ChipSelect label="¿La revisión debe incluir el periodo actual en curso?" options={["Sí", "No", "Aún no está definido"]} value={data.alcance.incluyePeriodoActual} onChange={(v) => set("alcance", { incluyePeriodoActual: v })} />
        <Field label="¿Requiere revisión de una sola empresa o de un grupo empresarial?">
          <select className="op-select" value={data.alcance.unaOvarias} onChange={(e) => set("alcance", { unaOvarias: e.target.value })}>
            <option value="">Seleccionar…</option>
            {UNA_O_VARIAS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        {data.alcance.unaOvarias === "Varias empresas del mismo grupo" && (
          <Field label="Indique cuántas empresas deben revisarse">
            <input type="number" className="op-input" value={data.alcance.cantidadEmpresas} onChange={(e) => set("alcance", { cantidadEmpresas: e.target.value })} />
          </Field>
        )}
      </Card>

      <Card title="Información financiera general" eyebrow="Sección 6" pct={sectionCompleteness(data.financiera)}>
        <Field label="Ingresos anuales aproximados">
          <select className="op-select" value={data.financiera.ingresosAnuales} onChange={(e) => set("financiera", { ingresosAnuales: e.target.value })}>
            <option value="">Seleccionar…</option>
            {INGRESOS_DD_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Activos totales aproximados">
          <select className="op-select" value={data.financiera.activosTotales} onChange={(e) => set("financiera", { activosTotales: e.target.value })}>
            <option value="">Seleccionar…</option>
            {ACTIVOS_DD_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Número aproximado de empleados">
          <select className="op-select" value={data.financiera.numEmpleados} onChange={(e) => set("financiera", { numEmpleados: e.target.value })}>
            <option value="">Seleccionar…</option>
            {EMPLEADOS_AUDITORIA_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <ChipSelect label="¿La empresa cuenta con estados financieros recientes?" options={EF_RECIENTES_OPTIONS} value={data.financiera.estadosFinancierosRecientes} onChange={(v) => set("financiera", { estadosFinancierosRecientes: v })} />
        <ChipSelect label="¿La contabilidad se encuentra actualizada y conciliada?" options={CONTABILIDAD_ACTUALIZADA_TRI} value={data.financiera.contabilidadActualizada} onChange={(v) => set("financiera", { contabilidadActualizada: v })} />
      </Card>

      <Card title="Aspectos relevantes" eyebrow="Sección 7" pct={sectionCompleteness(data.aspectos)}>
        <Field label="¿La empresa maneja alguno de los siguientes conceptos?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CONCEPTOS_DD_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.aspectos.conceptos.includes(op) ? "active-yes" : ""}`} onClick={() => toggleConcepto(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>

        <Field label="¿Existe alguna situación especial que debamos conocer?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SITUACIONES_DD_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.aspectos.situacionesEspeciales.includes(op) ? "active-yes" : ""}`} onClick={() => toggleSituacion(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.aspectos.situacionesEspeciales.includes("Otra") && (
          <Field label="¿Cuál otra situación?"><input className="op-input" value={data.aspectos.situacionesEspecialesOtra} onChange={(e) => set("aspectos", { situacionesEspecialesOtra: e.target.value })} /></Field>
        )}
      </Card>

      <DocumentosForm data={data.documentos} setData={setDocumentos} fields={DOC_FIELDS_DUE_DILIGENCE} />

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
