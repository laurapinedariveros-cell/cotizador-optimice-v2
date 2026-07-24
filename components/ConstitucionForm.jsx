"use client";
import { Field, Card } from "./Brand";
import {
  TRI_AUN_NO_DEFINIDO, NUM_SOCIOS_OPTIONS, TIPO_SOCIOS_OPTIONS, REPRESENTANTE_LEGAL_OPTIONS,
  CAPITAL_APROX_OPTIONS, TIPO_APORTES_OPTIONS, SERVICIOS_ADICIONALES_OPTIONS, DURACION_SERVICIO_OPTIONS,
  INICIO_CONTABLE_OPTIONS, FECHA_ESTIMADA_CONSTITUCION_OPTIONS, SERVICIO_INCLUIDO_ITEMS, sectionCompleteness,
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

export default function ConstitucionForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));

  const toggleServicioAdicional = (item) => {
    setData((d) => {
      const has = d.serviciosAdicionales.seleccion.includes(item);
      const seleccion = has ? d.serviciosAdicionales.seleccion.filter((o) => o !== item) : [...d.serviciosAdicionales.seleccion, item];
      return { ...d, serviciosAdicionales: { ...d.serviciosAdicionales, seleccion } };
    });
  };

  const sel = data.serviciosAdicionales.seleccion;

  return (
    <>
      <Card title="Información de la empresa" eyebrow="Sección 2" pct={sectionCompleteness(data.empresa)}>
        <div className="op-grid2">
          <Field label="Nombre propuesto para la empresa">
            <input className="op-input" value={data.empresa.nombrePropuesto} onChange={(e) => set("empresa", { nombrePropuesto: e.target.value })} />
          </Field>
          <Field label="Ciudad donde se constituirá la empresa">
            <input className="op-input" value={data.empresa.ciudad} onChange={(e) => set("empresa", { ciudad: e.target.value })} />
          </Field>
        </div>
        <Field label="Describa brevemente la actividad que realizará la empresa">
          <textarea className="op-input" rows={2} value={data.empresa.actividadDescripcion} onChange={(e) => set("empresa", { actividadDescripcion: e.target.value })} />
        </Field>
        <ChipSelect label="¿La empresa realizará actividades adicionales?" options={TRI_AUN_NO_DEFINIDO} value={data.empresa.actividadesAdicionales} onChange={(v) => set("empresa", { actividadesAdicionales: v })} />
        {data.empresa.actividadesAdicionales === "Sí" && (
          <Field label="Indique cuáles actividades adicionales realizará">
            <input className="op-input" value={data.empresa.actividadesAdicionalesDetalle} onChange={(e) => set("empresa", { actividadesAdicionalesDetalle: e.target.value })} />
          </Field>
        )}
      </Card>

      <Card title="Socios y administración" eyebrow="Sección 3" pct={sectionCompleteness(data.socios)}>
        <ChipSelect label="¿Cuántos socios tendrá la empresa?" options={NUM_SOCIOS_OPTIONS} value={data.socios.numSocios} onChange={(v) => set("socios", { numSocios: v })} />
        <Field label="Los socios serán">
          <select className="op-select" value={data.socios.tipoSocios} onChange={(e) => set("socios", { tipoSocios: e.target.value })}>
            <option value="">Seleccionar…</option>
            {TIPO_SOCIOS_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <ChipSelect label="¿Ya está definido el porcentaje de participación de cada socio?" options={["Sí", "No", "Aún se encuentra en definición"]} value={data.socios.participacionDefinida} onChange={(v) => set("socios", { participacionDefinida: v })} />
        <Field label="¿Quién será el representante legal?">
          <select className="op-select" value={data.socios.representanteLegal} onChange={(e) => set("socios", { representanteLegal: e.target.value })}>
            <option value="">Seleccionar…</option>
            {REPRESENTANTE_LEGAL_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <ChipSelect label="¿La empresa tendrá representante legal suplente?" options={TRI_AUN_NO_DEFINIDO} value={data.socios.representanteSuplente} onChange={(v) => set("socios", { representanteSuplente: v })} />
      </Card>

      <Card title="Capital de la empresa" eyebrow="Sección 4" pct={sectionCompleteness(data.capital)}>
        <Field label="Capital aproximado con el que se constituirá la empresa">
          <select className="op-select" value={data.capital.capitalAproximado} onChange={(e) => set("capital", { capitalAproximado: e.target.value })}>
            <option value="">Seleccionar…</option>
            {CAPITAL_APROX_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Los aportes de los socios se realizarán en">
          <select className="op-select" value={data.capital.tipoAportes} onChange={(e) => set("capital", { tipoAportes: e.target.value })}>
            <option value="">Seleccionar…</option>
            {TIPO_APORTES_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
        <ChipSelect label="¿El capital será pagado completamente al momento de la constitución?" options={TRI_AUN_NO_DEFINIDO} value={data.capital.capitalPagadoCompleto} onChange={(v) => set("capital", { capitalPagadoCompleto: v })} />
      </Card>

      <Card title="Información operativa" eyebrow="Sección 5" pct={sectionCompleteness(data.operativa)}>
        <ChipSelect label="¿La empresa tendrá empleados desde el inicio?" options={TRI_AUN_NO_DEFINIDO} value={data.operativa.tendraEmpleados} onChange={(v) => set("operativa", { tendraEmpleados: v })} />
        <ChipSelect label="¿La empresa realizará importaciones o exportaciones?" options={TRI_AUN_NO_DEFINIDO} value={data.operativa.importaExporta} onChange={(v) => set("operativa", { importaExporta: v })} />
        <ChipSelect label="¿La empresa recibirá inversión extranjera?" options={TRI_AUN_NO_DEFINIDO} value={data.operativa.inversionExtranjera} onChange={(v) => set("operativa", { inversionExtranjera: v })} />
        <ChipSelect label="¿La empresa tendrá operaciones con socios, clientes o proveedores ubicados en el exterior?" options={TRI_AUN_NO_DEFINIDO} value={data.operativa.operacionesExterior} onChange={(v) => set("operativa", { operacionesExterior: v })} />
      </Card>

      <Card title="Servicio incluido" eyebrow="Sección 6">
        <p className="op-card-sub">La cotización comprende el proceso completo de creación de la empresa, incluyendo:</p>
        <ul style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
          {SERVICIO_INCLUIDO_ITEMS.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>

      <Card title="Servicios adicionales" eyebrow="Sección 7" pct={sectionCompleteness(data.serviciosAdicionales)}>
        <Field label="¿Requiere alguno de los siguientes servicios adicionales? (puede elegir más de uno)">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {SERVICIOS_ADICIONALES_OPTIONS.map((op) => (
              <button key={op} type="button" className={`op-chip ${sel.includes(op) ? "active-yes" : ""}`} onClick={() => toggleServicioAdicional(op)}>
                {op}
              </button>
            ))}
          </div>
        </Field>

        {sel.includes("Representación legal") && (
          <Field label="¿Durante cuánto tiempo requiere el servicio de representación legal?">
            <select className="op-select" value={data.serviciosAdicionales.duracionRepresentacion} onChange={(e) => set("serviciosAdicionales", { duracionRepresentacion: e.target.value })}>
              <option value="">Seleccionar…</option>
              {DURACION_SERVICIO_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
            </select>
          </Field>
        )}

        {sel.includes("Domicilio fiscal") && (
          <Field label="¿Durante cuánto tiempo requiere el servicio de domicilio fiscal?">
            <select className="op-select" value={data.serviciosAdicionales.duracionDomicilio} onChange={(e) => set("serviciosAdicionales", { duracionDomicilio: e.target.value })}>
              <option value="">Seleccionar…</option>
              {DURACION_SERVICIO_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
            </select>
          </Field>
        )}

        {sel.includes("Outsourcing contable") && (
          <Field label="¿Desde qué momento requiere iniciar el servicio contable?">
            <select className="op-select" value={data.serviciosAdicionales.inicioContable} onChange={(e) => set("serviciosAdicionales", { inicioContable: e.target.value })}>
              <option value="">Seleccionar…</option>
              {INICIO_CONTABLE_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
            </select>
          </Field>
        )}
      </Card>

      <Card title="Fecha estimada" eyebrow="Sección 8">
        <Field label="¿Para qué fecha espera tener constituida la empresa?">
          <select className="op-select" value={data.fechaEstimada} onChange={(e) => setData((d) => ({ ...d, fechaEstimada: e.target.value }))}>
            <option value="">Seleccionar…</option>
            {FECHA_ESTIMADA_CONSTITUCION_OPTIONS.map((o) => <option value={o} key={o}>{o}</option>)}
          </select>
        </Field>
      </Card>

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
