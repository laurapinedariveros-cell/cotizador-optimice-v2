"use client";
import { Field, Card } from "./Brand";
import DocumentosForm from "./DocumentosForm";
import {
  TIPOS_INVENTARIO_OPTIONS, REFERENCIAS_OPTIONS, UNIDADES_OPTIONS, NUM_SEDES_OPTIONS,
  SISTEMA_CONTROL_OPTIONS, IDENTIFICADOS_OPTIONS, ALCANCE_EXISTENCIAS_OPTIONS,
  TRI_SI_NO_INSEGURO, PERSONAL_DISPONIBLE_OPTIONS, DOC_FIELDS_EXISTENCIAS, sectionCompleteness,
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

export default function ExistenciasForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));
  const setDocumentos = (updater) => setData((d) => ({ ...d, documentos: typeof updater === "function" ? updater(d.documentos) : updater }));

  const toggleTipoInventario = (item) => {
    setData((d) => {
      const has = d.servicio.tiposInventario.includes(item);
      const tiposInventario = has ? d.servicio.tiposInventario.filter((o) => o !== item) : [...d.servicio.tiposInventario, item];
      return { ...d, servicio: { ...d.servicio, tiposInventario } };
    });
  };

  const toggleAlcance = (item) => {
    setData((d) => {
      const has = d.servicio.alcance.includes(item);
      const alcance = has ? d.servicio.alcance.filter((o) => o !== item) : [...d.servicio.alcance, item];
      return { ...d, servicio: { ...d.servicio, alcance } };
    });
  };

  return (
    <>
      <Card title="Información del servicio" eyebrow="Inventario de Existencias" pct={sectionCompleteness(data.servicio)}>
        <Field label="¿Qué tipo de inventarios maneja la empresa?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TIPOS_INVENTARIO_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.servicio.tiposInventario.includes(op) ? "active-yes" : ""}`} onClick={() => toggleTipoInventario(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.servicio.tiposInventario.includes("Otros") && (
          <Field label="¿Cuáles otros inventarios?"><input className="op-input" value={data.servicio.tiposInventarioOtro} onChange={(e) => set("servicio", { tiposInventarioOtro: e.target.value })} /></Field>
        )}

        <div className="op-grid2">
          <Field label="¿Cuántas referencias o códigos de productos maneja aproximadamente?">
            <select className="op-select" value={data.servicio.numReferencias} onChange={(e) => set("servicio", { numReferencias: e.target.value })}>
              <option value="">Seleccionar…</option>
              {REFERENCIAS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="¿Cuántas unidades físicas existen aproximadamente?">
            <select className="op-select" value={data.servicio.numUnidades} onChange={(e) => set("servicio", { numUnidades: e.target.value })}>
              <option value="">Seleccionar…</option>
              {UNIDADES_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <div className="op-grid2">
          <ChipSelect label="¿En cuántas bodegas, sedes o puntos de venta se encuentra el inventario?" options={NUM_SEDES_OPTIONS} value={data.servicio.numUbicaciones} onChange={(v) => set("servicio", { numUbicaciones: v })} />
          <Field label="Ciudades o ubicaciones del inventario">
            <input className="op-input" value={data.servicio.ciudadesUbicaciones} onChange={(e) => set("servicio", { ciudadesUbicaciones: e.target.value })} />
          </Field>
        </div>

        <Field label="¿La empresa cuenta con un sistema para controlar el inventario?">
          <select className="op-select" value={data.servicio.sistemaControl} onChange={(e) => set("servicio", { sistemaControl: e.target.value })}>
            <option value="">Seleccionar…</option>
            {SISTEMA_CONTROL_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>

        <ChipSelect label="¿Los productos cuentan con códigos de barras, referencias o etiquetas?" options={IDENTIFICADOS_OPTIONS} value={data.servicio.productosIdentificados} onChange={(v) => set("servicio", { productosIdentificados: v })} />

        <Field label="¿Qué alcance necesita?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ALCANCE_EXISTENCIAS_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${data.servicio.alcance.includes(op) ? "active-yes" : ""}`} onClick={() => toggleAlcance(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>
        {data.servicio.alcance.includes("Otro") && (
          <Field label="¿Cuál otro alcance?"><input className="op-input" value={data.servicio.alcanceOtro} onChange={(e) => set("servicio", { alcanceOtro: e.target.value })} /></Field>
        )}

        <ChipSelect label="¿El inventario debe realizarse con la operación suspendida?" options={TRI_SI_NO_INSEGURO} value={data.servicio.operacionSuspendida} onChange={(v) => set("servicio", { operacionSuspendida: v })} />
        <ChipSelect label="¿La empresa proporcionará personal para organizar, movilizar o contar los productos?" options={PERSONAL_DISPONIBLE_OPTIONS} value={data.servicio.personalDisponible} onChange={(v) => set("servicio", { personalDisponible: v })} />

        <Field label="¿Para qué fecha necesita realizar el inventario?">
          <input type="date" className="op-input" value={data.servicio.fechaInventario} onChange={(e) => set("servicio", { fechaInventario: e.target.value })} />
        </Field>
      </Card>

      <DocumentosForm data={data.documentos} setData={setDocumentos} fields={DOC_FIELDS_EXISTENCIAS} />

      <div className="op-card">
        <div className="op-card-title">Observaciones sobre el tipo de producto o las condiciones de almacenamiento</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
