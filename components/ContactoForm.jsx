"use client";
import { Field, Card } from "./Brand";
import { CIUDADES_COLOMBIA, MEDIO_CONTACTO_OPTIONS, sectionCompleteness } from "../lib/model";

export default function ContactoForm({ data, setData }) {
  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  return (
    <Card title="Información de contacto" eyebrow="Antes de empezar" pct={sectionCompleteness(data)}>
      <div className="op-grid2">
        <Field label="Nombre de la persona que solicita la cotización">
          <input className="op-input" value={data.nombreSolicitante} onChange={(e) => set({ nombreSolicitante: e.target.value })} />
        </Field>
        <Field label="Cargo">
          <input className="op-input" value={data.cargo} onChange={(e) => set({ cargo: e.target.value })} />
        </Field>
        <Field label="Correo electrónico *">
          <input type="email" required className="op-input" value={data.correo} onChange={(e) => set({ correo: e.target.value })} />
        </Field>
        <Field label="Número de teléfono o WhatsApp *">
          <input type="tel" required className="op-input" value={data.telefono} onChange={(e) => set({ telefono: e.target.value })} />
        </Field>
        <Field label="Medio de contacto de su preferencia">
          <select className="op-select" value={data.medioPreferido} onChange={(e) => set({ medioPreferido: e.target.value })}>
            <option value="">Seleccionar…</option>
            {MEDIO_CONTACTO_OPTIONS.map((m) => <option value={m} key={m}>{m}</option>)}
          </select>
        </Field>
        <Field label="Razón social de la empresa">
          <input className="op-input" value={data.razonSocial} onChange={(e) => set({ razonSocial: e.target.value })} />
        </Field>
        <Field label="Número de identificación tributaria (NIT)">
          <input className="op-input" value={data.nit} onChange={(e) => set({ nit: e.target.value })} />
        </Field>
        <Field label="Ciudad principal de operación">
          <select className="op-select" value={data.ciudad} onChange={(e) => set({ ciudad: e.target.value })}>
            <option value="">Seleccionar…</option>
            {CIUDADES_COLOMBIA.map((c) => <option value={c} key={c}>{c}</option>)}
          </select>
        </Field>
        {data.ciudad === "Otra" && (
          <Field label="¿Cuál ciudad?">
            <input className="op-input" value={data.ciudadOtra} onChange={(e) => set({ ciudadOtra: e.target.value })} />
          </Field>
        )}
      </div>
    </Card>
  );
}
