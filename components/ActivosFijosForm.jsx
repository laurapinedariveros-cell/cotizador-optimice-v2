"use client";
import { Field, YesNo, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import {
  OBJETIVO_ACTIVOS_OPTIONS, CANTIDAD_ACTIVOS_OPTIONS, TIPOS_ACTIVOS_OPTIONS, NUM_SEDES_OPTIONS,
  BASE_ACTIVOS_OPTIONS, IDENTIFICADOS_OPTIONS, PLACAS_OPTIONS, TRI_SI_NO_INSEGURO,
  DOC_FIELDS_ACTIVOS_FIJOS, sectionCompleteness,
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

export default function ActivosFijosForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const toggleTipoActivo = (item) => {
    setData((d) => {
      const has = d.servicio.tiposActivos.includes(item);
      const tiposActivos = has ? d.servicio.tiposActivos.filter((o) => o !== item) : [...d.servicio.tiposActivos, item];
      return { ...d, servicio: { ...d.servicio, tiposActivos } };
    });
  };

  return (
    <>
      <Card title="Información del servicio" eyebrow="Inventario de Activos Fijos" pct={sectionCompleteness(data.servicio)}>
        <Field label="¿Cuál es el objetivo principal del servicio?">
          <select className="op-select" value={data.servicio.objetivo} onChange={(e) => set("servicio", { objetivo: e.target.value })}>
            <option value="">Seleccionar…</option>
            {OBJETIVO_ACTIVOS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        {data.servicio.objetivo === "Otro" && (
          <Field label="¿Cuál?"><input className="op-input" value={data.servicio.objetivoOtro} onChange={(e) => set("servicio", { objetivoOtro: e.target.value })} /></Field>
        )}

        <Field label="¿Cuántos activos fijos deben inventariarse aproximadamente?">
          <select className="op-select" value={data.servicio.cantidadActivos} onChange={(e) => set("servicio", { cantidadActivos: e.target.value })}>
            <option value="">Seleccionar…</option>
            {CANTIDAD_ACTIVOS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <Field label="¿Qué tipo de activos posee la empresa?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TIPOS_ACTIVOS_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.servicio.tiposActivos.includes(op) ? "active-yes" : ""}`} onClick={() => toggleTipoActivo(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.servicio.tiposActivos.includes("Otros") && (
          <Field label="¿Cuáles otros activos?"><input className="op-input" value={data.servicio.tiposActivosOtro} onChange={(e) => set("servicio", { tiposActivosOtro: e.target.value })} /></Field>
        )}

        <div className="op-grid2">
          <ChipSelect label="¿En cuántas sedes o ubicaciones se encuentran los activos?" options={NUM_SEDES_OPTIONS} value={data.servicio.numSedes} onChange={(v) => set("servicio", { numSedes: v })} />
          <Field label="Ciudades o ubicaciones donde se realizará el inventario">
            <input className="op-input" value={data.servicio.ciudadesUbicaciones} onChange={(e) => set("servicio", { ciudadesUbicaciones: e.target.value })} />
          </Field>
        </div>

        <Field label="¿La empresa cuenta con una base de activos fijos?">
          <select className="op-select" value={data.servicio.tieneBaseActivos} onChange={(e) => set("servicio", { tieneBaseActivos: e.target.value })}>
            <option value="">Seleccionar…</option>
            {BASE_ACTIVOS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <ChipSelect label="¿Los activos se encuentran identificados con placas o etiquetas?" options={IDENTIFICADOS_OPTIONS} value={data.servicio.activosIdentificados} onChange={(v) => set("servicio", { activosIdentificados: v })} />

        <Field label="¿Requiere el suministro e instalación de placas o etiquetas?">
          <select className="op-select" value={data.servicio.requierePlacas} onChange={(e) => set("servicio", { requierePlacas: e.target.value })}>
            <option value="">Seleccionar…</option>
            {PLACAS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <ChipSelect label="¿Requiere conciliación del inventario físico con la contabilidad?" options={TRI_SI_NO_INSEGURO} value={data.servicio.requiereConciliacion} onChange={(v) => set("servicio", { requiereConciliacion: v })} />

        <YesNo label="¿Requiere registro fotográfico de los activos?" value={data.servicio.requiereFotografico} onChange={(v) => set("servicio", { requiereFotografico: v })} />

        <Field label="¿Para qué fecha necesita realizar el inventario?">
          <input type="date" className="op-input" value={data.servicio.fechaInventario} onChange={(e) => set("servicio", { fechaInventario: e.target.value })} />
        </Field>
      </Card>

      <DocumentosForm data={data.documentos} setData={setDocumentos} fields={DOC_FIELDS_ACTIVOS_FIJOS} />

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales sobre el servicio</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
