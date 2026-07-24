"use client";
import { useState } from "react";
import { Field } from "./Brand";
import { uploadFile } from "../lib/data";

const DEFAULT_FIELDS = [
  { key: "camaraComercio", label: "Cámara de Comercio" },
  { key: "estadosFinancieros", label: "Últimos estados financieros" },
];

function FileInput({ label, url, nombre, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const res = await uploadFile(file, "adjuntos");
    setUploading(false);
    if (res.ok) onUploaded({ url: res.url, nombre: res.nombre });
    else setError("No se pudo subir el archivo. Puedes continuar sin adjuntarlo.");
  };

  return (
    <Field label={label}>
      <input type="file" accept="application/pdf,image/*" className="op-input" onChange={handleChange} disabled={uploading} />
      {uploading && <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 4 }}>Subiendo…</div>}
      {!uploading && url && <div style={{ fontSize: 11.5, color: "var(--green-dark)", marginTop: 4 }}>✓ {nombre || "Archivo adjuntado"}</div>}
      {error && <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: 4 }}>{error}</div>}
    </Field>
  );
}

export default function DocumentosForm({ data, setData, fields = DEFAULT_FIELDS }) {
  const set = (patch) => setData((d) => ({ ...d, ...patch }));

  return (
    <div className="op-card">
      <div className="op-card-title">Documentos</div>
      <p className="op-card-sub">Adjunta los siguientes documentos si los tienes a la mano (opcional, pero nos ayuda a preparar tu propuesta más rápido).</p>
      {fields.map((f) => (
        <FileInput
          key={f.key}
          label={f.label}
          url={data[`${f.key}Url`]}
          nombre={data[`${f.key}Nombre`]}
          onUploaded={({ url, nombre }) => set({ [`${f.key}Url`]: url, [`${f.key}Nombre`]: nombre })}
        />
      ))}
    </div>
  );
}

export { DEFAULT_FIELDS };
