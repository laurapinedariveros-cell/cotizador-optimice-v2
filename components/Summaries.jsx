"use client";
import { fmtDate, yn } from "../lib/model";

export function Row({ q, a }) {
  const empty = a === "" || a === null || a === undefined || a === "N/D";
  return (
    <div className="op-doc-row">
      <span className="q">{q}</span>
      <span className={`a ${empty ? "empty" : ""}`}>{empty ? "Sin diligenciar" : String(a)}</span>
    </div>
  );
}

export function ContactoSummary({ data }) {
  return (
    <div className="op-doc-section">
      <h4>Información de contacto</h4>
      <Row q="Solicitante" a={data.nombreSolicitante} />
      <Row q="Cargo" a={data.cargo} />
      <Row q="Correo" a={data.correo} />
      <Row q="Teléfono / WhatsApp" a={data.telefono} />
      <Row q="Medio de contacto preferido" a={data.medioPreferido} />
      <Row q="Razón social" a={data.razonSocial} />
      <Row q="NIT" a={data.nit} />
      <Row q="Ciudad" a={data.ciudad === "Otra" ? data.ciudadOtra : data.ciudad} />
      <Row q="Presupuesto estimado" a={data.presupuesto} />
    </div>
  );
}

export function DocumentosSummary({ data }) {
  return (
    <div className="op-doc-section">
      <h4>Documentos adjuntos</h4>
      <div className="op-doc-row">
        <span className="q">Cámara de Comercio</span>
        {data.camaraComercioUrl ? (
          <a href={data.camaraComercioUrl} target="_blank" rel="noopener noreferrer" className="a" style={{ color: "var(--green-dark)" }}>Ver archivo</a>
        ) : (
          <span className="a empty">Sin diligenciar</span>
        )}
      </div>
      <div className="op-doc-row">
        <span className="q">Últimos estados financieros</span>
        {data.estadosFinancierosUrl ? (
          <a href={data.estadosFinancierosUrl} target="_blank" rel="noopener noreferrer" className="a" style={{ color: "var(--green-dark)" }}>Ver archivo</a>
        ) : (
          <span className="a empty">Sin diligenciar</span>
        )}
      </div>
    </div>
  );
}

export function RevisoriaSummary({ data }) {
  const g = data.generales, c = data.cuentas, f = data.fiscal, p = data.personal, fin = data.financiera;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>1. Datos generales</h4>
        <Row q="Giro / industria" a={g.giro} />
        <Row q="Principales servicios o productos" a={g.principalesServicios} />
        <Row q="Fecha de inicio de operaciones" a={g.fechaInicioOperaciones && fmtDate(g.fechaInicioOperaciones)} />
        <Row q="Número de sucursales" a={g.numSucursales} />
        <Row q="Subsidiarias o afiliadas" a={g.subsidiarias} />
        <Row q="Grupo de NIIF" a={g.grupoNiif && `Grupo ${g.grupoNiif}`} />
      </div>
      <div className="op-doc-section">
        <h4>2. Volumen de cuentas y transacciones</h4>
        <Row q="Número de clientes" a={c.numClientesCxC} />
        <Row q="Facturas de venta mensuales (promedio)" a={c.facturasVentaMensuales} />
        <Row q="Notas" a={c.notas} />
      </div>
      <div className="op-doc-section">
        <h4>3. Situación fiscal</h4>
        <Row q="Retención en la fuente revisada" a={f.retencionFuenteMes && `${f.retencionFuenteMes} ${f.retencionFuenteAnio}`} />
        <Row q="Impuesto a la renta revisado — año" a={f.rentaAnio} />
        <Row q="IVA revisado" a={f.ivaPeriodicidad && `${f.ivaPeriodicidad} ${f.ivaAnio}`} />
        <Row q="ICA revisado" a={f.icaPeriodicidad && `${f.icaPeriodicidad} ${f.icaAnio}`} />
        <Row q="Gran contribuyente" a={yn(f.granContribuyente)} />
        <Row q="Recursos de reclamación/apelación ante la DIAN" a={yn(f.recursosDian)} />
        <Row q="Aplazamiento/fraccionamiento de deudas tributarias" a={yn(f.aplazamientoDeudas)} />
        <Row q="Pérdidas tributarias arrastrables" a={f.perdidasTributarias ? `Sí — ${f.perdidasDetalle || "sin detalle"}` : yn(f.perdidasTributarias)} />
        <Row q="Operaciones gravadas y no gravadas por IVA" a={yn(f.operacionesGravadasNoGravadas)} />
      </div>
      <div className="op-doc-section">
        <h4>4. Personal</h4>
        <Row q="Empleados contratados directamente" a={p.empleadosDirectos} />
        <Row q="Profesionales o contratistas indirectos" a={p.contratistasIndirectos} />
        <Row q="Personas en el equipo contable" a={p.equipoContable} />
        <Row q="Notas del equipo contable" a={p.notasEquipoContable} />
      </div>
      <div className="op-doc-section">
        <h4>5. Información administrativa y financiera</h4>
        <Row q="Moneda" a={fin.moneda === "pesos" ? "Pesos" : "Dólares"} />
        <Row q="Ventas año actual" a={fin.ventasAnioActual} />
        <Row q="Ventas año anterior" a={fin.ventasAnioAnterior} />
        <Row q="Resultado contable — año actual" a={fin.resultadoActual} />
        <Row q="Resultado contable — año anterior" a={fin.resultadoAnterior} />
        <Row q="Activo fijo (cantidad de ítems)" a={fin.activoFijoCantidad} />
        <Row q="Notas financieras" a={fin.notas} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones adicionales</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} />
    </>
  );
}

export function OutsourcingSummary({ data }) {
  const o = data.operacion, c = data.contable, doc = data.documentos;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>1. Tamaño y operación</h4>
        <Row q="Ingresos anuales aproximados" a={o.ingresosAnuales} />
        <Row q="Facturas de venta al mes" a={o.facturasVenta} />
        <Row q="Facturas de compra al mes" a={o.facturasCompra} />
        <Row q="Número de cuentas bancarias" a={o.cuentasBancarias} />
        <Row q="Número de empleados" a={o.numEmpleados} />
        <Row q="Maneja inventarios" a={yn(o.manejaInventarios)} />
        <Row q="Importaciones o exportaciones" a={yn(o.comercioExterior)} />
      </div>
      <div className="op-doc-section">
        <h4>2. Situación contable y tributaria</h4>
        <Row q="Contabilidad actualizada" a={c.contabilidadActualizada} />
        <Row q="Actualizada hasta" a={c.fechaActualizadaMes && `${c.fechaActualizadaMes} ${c.fechaActualizadaAnio}`} />
        <Row q="Software contable" a={c.softwareContable === "Otro" ? `Otro — ${c.softwareOtroDetalle}` : c.softwareContable} />
        <Row q="Obligaciones" a={c.obligaciones.length ? c.obligaciones.join(", ") + (c.obligaciones.includes("Otras") ? ` (${c.obligacionesOtrasDetalle})` : "") : ""} />
        <Row q="Municipios donde presenta ICA" a={c.municipiosICA} />
        <Row q="Frecuencia de estados financieros" a={c.frecuenciaEF} />
        <Row q="¿Servicio remoto?" a={c.servicioRemoto} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones adicionales</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={doc} />
    </>
  );
}

export function PTSummary({ data }) {
  const g = data.general, c = data.consideraciones;
  const activas = data.transacciones.filter((t) => t.valorIngresos || t.valorEgresos);
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>1. Información general</h4>
        <Row q="Tipo de entidad" a={g.tipoEntidad} />
        <Row q="Actividad económica principal" a={g.actividadEconomica} />
        <Row q="Período a evaluar" a={g.periodoEvaluar} />
      </div>
      <div className="op-doc-section">
        <h4>2. Consideraciones generales</h4>
        <Row q="Partes vinculadas (aprox.)" a={c.numPartesVinculadas} />
        <Row q="Operaciones con vinculadas domiciliadas" a={yn(c.opDomiciliadas)} />
        <Row q="Operaciones con vinculadas no domiciliadas" a={yn(c.opNoDomiciliadas)} />
        <Row q="Operaciones con paraísos fiscales" a={yn(c.opParaisosFiscales)} />
        <Row q="Consolida estados financieros" a={yn(c.consolidaEEFF)} />
        <Row q="Evaluación del test de beneficio realizada" a={yn(c.testBeneficio)} />
      </div>
      <div className="op-doc-section">
        <h4>3. Transacciones con vinculados</h4>
        {activas.length === 0 ? (
          <p style={{ fontSize: 12.5, color: "var(--slate)" }}>Sin diligenciar</p>
        ) : (
          activas.map((t) => (
            <Row
              key={t.id}
              q={t.nombre}
              a={[
                t.valorIngresos ? `Ingresos: ${t.valorIngresos}${t.contratosIngresos ? ` (${t.contratosIngresos} contratos)` : ""}` : "",
                t.valorEgresos ? `Egresos: ${t.valorEgresos}${t.contratosEgresos ? ` (${t.contratosEgresos} contratos)` : ""}` : "",
              ]
                .filter(Boolean)
                .join(" · ")}
            />
          ))
        )}
        {data.otrosDetalle && <Row q="Detalle de 'Otros' / observaciones" a={data.otrosDetalle} />}
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones adicionales</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} />
    </>
  );
}
