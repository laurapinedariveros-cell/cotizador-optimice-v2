"use client";
import { Field, YesNo, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import {
  INGRESOS_OUTSOURCING_LABELS, FACTURAS_LABELS, CUENTAS_BANCARIAS_LABELS,
  EMPLEADOS_OUTSOURCING_LABELS, SOFTWARE_CONTABLE_OPTIONS, OBLIGACIONES_OPTIONS,
  MUNICIPIOS_ICA_LABELS, FRECUENCIA_EF_LABELS, sectionCompleteness,
} from "../lib/model";

export default function OutsourcingForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const toggleObligacion = (item) => {
    setData((d) => {
      const has = d.contable.obligaciones.includes(item);
      const obligaciones = has ? d.contable.obligaciones.filter((o) => o !== item) : [...d.contable.obligaciones, item];
      return { ...d, contable: { ...d.contable, obligaciones } };
    });
  };

  return (
    <>
      <Card title="Tamaño y operación" eyebrow="Sección 1" pct={sectionCompleteness(data.operacion)}>
        <div className="op-grid2">
          <Field label="Ingresos anuales aproximados">
            <select className="op-select" value={data.operacion.ingresosAnuales} onChange={(e) => set("operacion", { ingresosAnuales: e.target.value })}>
              <option value="">Seleccionar…</option>
              {INGRESOS_OUTSOURCING_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Número aproximado de facturas de venta al mes">
            <select className="op-select" value={data.operacion.facturasVenta} onChange={(e) => set("operacion", { facturasVenta: e.target.value })}>
              <option value="">Seleccionar…</option>
              {FACTURAS_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Número aproximado de facturas de compra al mes">
            <select className="op-select" value={data.operacion.facturasCompra} onChange={(e) => set("operacion", { facturasCompra: e.target.value })}>
              <option value="">Seleccionar…</option>
              {FACTURAS_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Número de cuentas bancarias">
            <select className="op-select" value={data.operacion.cuentasBancarias} onChange={(e) => set("operacion", { cuentasBancarias: e.target.value })}>
              <option value="">Seleccionar…</option>
              {CUENTAS_BANCARIAS_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Número de empleados">
            <select className="op-select" value={data.operacion.numEmpleados} onChange={(e) => set("operacion", { numEmpleados: e.target.value })}>
              <option value="">Seleccionar…</option>
              {EMPLEADOS_OUTSOURCING_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
        </div>
        <YesNo label="¿La empresa maneja inventarios?" value={data.operacion.manejaInventarios} onChange={(v) => set("operacion", { manejaInventarios: v })} />
        <YesNo label="¿La empresa realiza importaciones o exportaciones?" value={data.operacion.comercioExterior} onChange={(v) => set("operacion", { comercioExterior: v })} />
      </Card>

      <Card title="Situación contable y tributaria" eyebrow="Sección 2" pct={sectionCompleteness(data.contable)}>
        <Field label="¿La contabilidad se encuentra actualizada?">
          <div className="op-chip-row">
            {["Sí", "Parcialmente", "No"].map((op) => (
              <button
                key={op}
                type="button"
                className={`op-chip ${data.contable.contabilidadActualizada === op ? "active-yes" : ""}`}
                onClick={() => set("contable", { contabilidadActualizada: op })}
              >
                {op}
              </button>
            ))}
          </div>
        </Field>
        <Field label="¿Hasta qué fecha se encuentra actualizada?">
          <div style={{ display: "flex", gap: 8 }}>
            <input className="op-input" placeholder="Mes" value={data.contable.fechaActualizadaMes} onChange={(e) => set("contable", { fechaActualizadaMes: e.target.value })} />
            <input className="op-input" placeholder="Año" value={data.contable.fechaActualizadaAnio} onChange={(e) => set("contable", { fechaActualizadaAnio: e.target.value })} />
          </div>
        </Field>
        <Field label="Software contable utilizado">
          <select className="op-select" value={data.contable.softwareContable} onChange={(e) => set("contable", { softwareContable: e.target.value })}>
            <option value="">Seleccionar…</option>
            {SOFTWARE_CONTABLE_OPTIONS.map((l) => <option value={l} key={l}>{l}</option>)}
          </select>
        </Field>
        {data.contable.softwareContable === "Otro" && (
          <Field label="¿Cuál software?">
            <input className="op-input" value={data.contable.softwareOtroDetalle} onChange={(e) => set("contable", { softwareOtroDetalle: e.target.value })} />
          </Field>
        )}

        <Field label="Seleccione las obligaciones que maneja la empresa">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {OBLIGACIONES_OPTIONS.map((op) => (
              <button
                key={op}
                type="button"
                className={`op-chip ${data.contable.obligaciones.includes(op) ? "active-yes" : ""}`}
                onClick={() => toggleObligacion(op)}
              >
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.contable.obligaciones.includes("Otras") && (
          <Field label="¿Cuáles otras obligaciones?">
            <input className="op-input" value={data.contable.obligacionesOtrasDetalle} onChange={(e) => set("contable", { obligacionesOtrasDetalle: e.target.value })} />
          </Field>
        )}

        <div className="op-grid2">
          <Field label="¿En cuántos municipios presenta ICA?">
            <select className="op-select" value={data.contable.municipiosICA} onChange={(e) => set("contable", { municipiosICA: e.target.value })}>
              <option value="">Seleccionar…</option>
              {MUNICIPIOS_ICA_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="¿Con qué frecuencia requiere estados financieros?">
            <select className="op-select" value={data.contable.frecuenciaEF} onChange={(e) => set("contable", { frecuenciaEF: e.target.value })}>
              <option value="">Seleccionar…</option>
              {FRECUENCIA_EF_LABELS.map((l) => <option value={l} key={l}>{l}</option>)}
            </select>
          </Field>
        </div>

        <Field label="¿El servicio puede prestarse de forma remota?">
          <div className="op-chip-row">
            {["Sí", "No", "Requiero algunas visitas presenciales"].map((op) => (
              <button
                key={op}
                type="button"
                className={`op-chip ${data.contable.servicioRemoto === op ? "active-yes" : ""}`}
                onClick={() => set("contable", { servicioRemoto: op })}
              >
                {op}
              </button>
            ))}
          </div>
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
