"use client";
import { Field, YesNo, Card } from "./Brand";
import { TAMANO_LABELS, COMPLEJIDAD_LABELS, sectionCompleteness } from "../lib/model";

export default function RevisoriaForm({ data, setData }) {
  const set = (section, patch) => setData((d) => ({ ...d, [section]: { ...d[section], ...patch } }));

  return (
    <>
      <Card title="Datos generales" eyebrow="Sección 1" pct={sectionCompleteness(data.generales)}>
        <div className="op-grid2">
          <Field label="Giro / industria"><input className="op-input" value={data.generales.giro} onChange={(e) => set("generales", { giro: e.target.value })} /></Field>
          <Field label="Principales servicios o productos"><input className="op-input" value={data.generales.principalesServicios} onChange={(e) => set("generales", { principalesServicios: e.target.value })} /></Field>
          <Field label="Fecha de inicio de operaciones"><input type="date" className="op-input" value={data.generales.fechaInicioOperaciones} onChange={(e) => set("generales", { fechaInicioOperaciones: e.target.value })} /></Field>
          <Field label="Número de sucursales"><input type="number" className="op-input" value={data.generales.numSucursales} onChange={(e) => set("generales", { numSucursales: e.target.value })} /></Field>
          <Field label="Subsidiarias o afiliadas"><input className="op-input" value={data.generales.subsidiarias} onChange={(e) => set("generales", { subsidiarias: e.target.value })} /></Field>
          <Field label="Grupo de NIIF al que pertenece">
            <select className="op-select" value={data.generales.grupoNiif} onChange={(e) => set("generales", { grupoNiif: e.target.value })}>
              <option value="">Seleccionar…</option>
              <option value="1">Grupo 1</option>
              <option value="2">Grupo 2 (Pymes)</option>
              <option value="3">Grupo 3 (Microempresas)</option>
            </select>
          </Field>
        </div>
      </Card>

      <Card title="Volumen de cuentas y transacciones" eyebrow="Sección 2" pct={sectionCompleteness(data.cuentas)}>
        <div className="op-grid2">
          <Field label="Cuentas por cobrar comerciales — número de clientes"><input type="number" className="op-input" value={data.cuentas.numClientesCxC} onChange={(e) => set("cuentas", { numClientesCxC: e.target.value })} /></Field>
          <Field label="Facturas de venta emitidas por mes (promedio)"><input type="number" className="op-input" value={data.cuentas.facturasVentaMensuales} onChange={(e) => set("cuentas", { facturasVentaMensuales: e.target.value })} /></Field>
        </div>
        <Field label="Notas sobre volumen de transacciones">
          <textarea className="op-input" rows={2} value={data.cuentas.notas} onChange={(e) => set("cuentas", { notas: e.target.value })} placeholder="Ej: cuentas por pagar, inventarios, nómina detallada, activos fijos…" />
        </Field>
      </Card>

      <Card title="Situación fiscal" eyebrow="Sección 3" pct={sectionCompleteness(data.fiscal)}>
        <p className="op-card-sub">Últimos períodos revisados por auditores fiscales</p>
        <div className="op-grid2">
          <Field label="Retención en la fuente — mes / año">
            <div style={{ display: "flex", gap: 8 }}>
              <input className="op-input" placeholder="Mes" value={data.fiscal.retencionFuenteMes} onChange={(e) => set("fiscal", { retencionFuenteMes: e.target.value })} />
              <input className="op-input" placeholder="Año" value={data.fiscal.retencionFuenteAnio} onChange={(e) => set("fiscal", { retencionFuenteAnio: e.target.value })} />
            </div>
          </Field>
          <Field label="Impuesto a la renta — mes / año">
            <div style={{ display: "flex", gap: 8 }}>
              <input className="op-input" placeholder="Mes" value={data.fiscal.rentaMes} onChange={(e) => set("fiscal", { rentaMes: e.target.value })} />
              <input className="op-input" placeholder="Año" value={data.fiscal.rentaAnio} onChange={(e) => set("fiscal", { rentaAnio: e.target.value })} />
            </div>
          </Field>
          <Field label="IVA — mes / año">
            <div style={{ display: "flex", gap: 8 }}>
              <input className="op-input" placeholder="Mes" value={data.fiscal.ivaMes} onChange={(e) => set("fiscal", { ivaMes: e.target.value })} />
              <input className="op-input" placeholder="Año" value={data.fiscal.ivaAnio} onChange={(e) => set("fiscal", { ivaAnio: e.target.value })} />
            </div>
          </Field>
          <Field label="Retenciones de ICA — mes / año">
            <div style={{ display: "flex", gap: 8 }}>
              <input className="op-input" placeholder="Mes" value={data.fiscal.icaMes} onChange={(e) => set("fiscal", { icaMes: e.target.value })} />
              <input className="op-input" placeholder="Año" value={data.fiscal.icaAnio} onChange={(e) => set("fiscal", { icaAnio: e.target.value })} />
            </div>
          </Field>
        </div>
        <Field label="Otros períodos / observaciones">
          <input className="op-input" value={data.fiscal.otrosRevisiones} onChange={(e) => set("fiscal", { otrosRevisiones: e.target.value })} />
        </Field>

        <p className="op-card-sub" style={{ marginTop: 10 }}>Resultado de revisiones fiscales</p>
        <YesNo label="¿Está calificada como gran contribuyente?" value={data.fiscal.granContribuyente} onChange={(v) => set("fiscal", { granContribuyente: v })} />
        <YesNo label="¿Se han presentado recursos de reclamación y/o apelación ante la DIAN?" value={data.fiscal.recursosDian} onChange={(v) => set("fiscal", { recursosDian: v })} />
        <YesNo label="¿Se ha solicitado aplazamiento y/o fraccionamiento de deudas tributarias?" value={data.fiscal.aplazamientoDeudas} onChange={(v) => set("fiscal", { aplazamientoDeudas: v })} />
        <YesNo label="¿Existen pérdidas tributarias arrastrables?" value={data.fiscal.perdidasTributarias} onChange={(v) => set("fiscal", { perdidasTributarias: v })} />
        {data.fiscal.perdidasTributarias && (
          <Field label="¿En qué? (renta, IVA, etc.)"><input className="op-input" value={data.fiscal.perdidasDetalle} onChange={(e) => set("fiscal", { perdidasDetalle: e.target.value })} /></Field>
        )}
        <YesNo label="¿Realiza operaciones gravadas y no gravadas por IVA?" value={data.fiscal.operacionesGravadasNoGravadas} onChange={(v) => set("fiscal", { operacionesGravadasNoGravadas: v })} />
      </Card>

      <Card title="Personal" eyebrow="Sección 4" pct={sectionCompleteness(data.personal)}>
        <div className="op-grid2">
          <Field label="Empleados"><input type="number" className="op-input" value={data.personal.empleados} onChange={(e) => set("personal", { empleados: e.target.value })} /></Field>
          <Field label="Obreros"><input type="number" className="op-input" value={data.personal.obreros} onChange={(e) => set("personal", { obreros: e.target.value })} /></Field>
          <Field label="Planilla confidencial"><input type="number" className="op-input" value={data.personal.planillaConfidencial} onChange={(e) => set("personal", { planillaConfidencial: e.target.value })} /></Field>
          <Field label="Profesionales independientes"><input type="number" className="op-input" value={data.personal.profesionalesIndependientes} onChange={(e) => set("personal", { profesionalesIndependientes: e.target.value })} /></Field>
          <Field label="No domiciliados"><input type="number" className="op-input" value={data.personal.noDomiciliados} onChange={(e) => set("personal", { noDomiciliados: e.target.value })} /></Field>
          <Field label="Otros (cantidad)"><input type="number" className="op-input" value={data.personal.otrosCantidad} onChange={(e) => set("personal", { otrosCantidad: e.target.value })} /></Field>
          <Field label="Otros (detalle)"><input className="op-input" value={data.personal.otrosDetalle} onChange={(e) => set("personal", { otrosDetalle: e.target.value })} /></Field>
          <Field label="Personal en el equipo contable"><input type="number" className="op-input" value={data.personal.equipoContable} onChange={(e) => set("personal", { equipoContable: e.target.value })} /></Field>
        </div>
        <Field label="Notas sobre el equipo contable">
          <textarea className="op-input" rows={2} value={data.personal.notasEquipoContable} onChange={(e) => set("personal", { notasEquipoContable: e.target.value })} />
        </Field>
      </Card>

      <Card title="Información administrativa y financiera" eyebrow="Sección 5" pct={sectionCompleteness(data.financiera)}>
        <Field label="Moneda en la que informa">
          <div className="op-chip-row">
            <button type="button" className={`op-chip ${data.financiera.moneda === "pesos" ? "active-yes" : ""}`} onClick={() => set("financiera", { moneda: "pesos" })}>Pesos</button>
            <button type="button" className={`op-chip ${data.financiera.moneda === "dolares" ? "active-yes" : ""}`} onClick={() => set("financiera", { moneda: "dolares" })}>Dólares</button>
          </div>
        </Field>
        <p className="op-card-sub">Ventas anuales</p>
        <div className="op-grid2">
          <Field label="Locales — proyectado año actual"><input type="number" className="op-input" value={data.financiera.ventasLocalesProyectado} onChange={(e) => set("financiera", { ventasLocalesProyectado: e.target.value })} /></Field>
          <Field label="Exportaciones — proyectado año actual"><input type="number" className="op-input" value={data.financiera.ventasExportProyectado} onChange={(e) => set("financiera", { ventasExportProyectado: e.target.value })} /></Field>
          <Field label="Locales — año anterior"><input type="number" className="op-input" value={data.financiera.ventasLocalesAnterior} onChange={(e) => set("financiera", { ventasLocalesAnterior: e.target.value })} /></Field>
          <Field label="Exportaciones — año anterior"><input type="number" className="op-input" value={data.financiera.ventasExportAnterior} onChange={(e) => set("financiera", { ventasExportAnterior: e.target.value })} /></Field>
        </div>
        <p className="op-card-sub">Resultado contable del ejercicio (utilidad / pérdida)</p>
        <div className="op-grid2">
          <Field label="Año actual"><input type="number" className="op-input" value={data.financiera.resultadoActual} onChange={(e) => set("financiera", { resultadoActual: e.target.value })} /></Field>
          <Field label="Año anterior"><input type="number" className="op-input" value={data.financiera.resultadoAnterior} onChange={(e) => set("financiera", { resultadoAnterior: e.target.value })} /></Field>
          <Field label="Activo fijo (cantidad de ítems)"><input type="number" className="op-input" value={data.financiera.activoFijoCantidad} onChange={(e) => set("financiera", { activoFijoCantidad: e.target.value })} /></Field>
        </div>
        <Field label="Notas financieras adicionales">
          <textarea className="op-input" rows={2} value={data.financiera.notas} onChange={(e) => set("financiera", { notas: e.target.value })} />
        </Field>
      </Card>

      <div className="op-card">
        <div className="op-card-title">Observaciones adicionales</div>
        <textarea className="op-input" rows={3} value={data.notasGenerales} onChange={(e) => setData((d) => ({ ...d, notasGenerales: e.target.value }))} />
      </div>
    </>
  );
}
