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

const DEFAULT_DOC_FIELDS = [
  { key: "camaraComercio", label: "Cámara de Comercio" },
  { key: "estadosFinancieros", label: "Últimos estados financieros" },
];

export function DocumentosSummary({ data, fields = DEFAULT_DOC_FIELDS }) {
  return (
    <div className="op-doc-section">
      <h4>Documentos adjuntos</h4>
      {fields.map((f) => (
        <div className="op-doc-row" key={f.key}>
          <span className="q">{f.label}</span>
          {data[`${f.key}Url`] ? (
            <a href={data[`${f.key}Url`]} target="_blank" rel="noopener noreferrer" className="a" style={{ color: "var(--green-dark)" }}>Ver archivo</a>
          ) : (
            <span className="a empty">Sin diligenciar</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function ActivosFijosSummary({ data }) {
  const s = data.servicio;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>Información del servicio</h4>
        <Row q="Objetivo principal" a={s.objetivo === "Otro" ? `Otro — ${s.objetivoOtro}` : s.objetivo} />
        <Row q="Cantidad de activos a inventariar" a={s.cantidadActivos} />
        <Row q="Tipos de activos" a={s.tiposActivos.length ? s.tiposActivos.join(", ") + (s.tiposActivos.includes("Otros") ? ` (${s.tiposActivosOtro})` : "") : ""} />
        <Row q="Número de sedes/ubicaciones" a={s.numSedes} />
        <Row q="Ciudades o ubicaciones" a={s.ciudadesUbicaciones} />
        <Row q="Cuenta con base de activos" a={s.tieneBaseActivos} />
        <Row q="Activos identificados con placas/etiquetas" a={s.activosIdentificados} />
        <Row q="Requiere placas o etiquetas" a={s.requierePlacas} />
        <Row q="Requiere conciliación físico-contable" a={s.requiereConciliacion} />
        <Row q="Requiere registro fotográfico" a={yn(s.requiereFotografico)} />
        <Row q="Fecha requerida del inventario" a={s.fechaInventario && fmtDate(s.fechaInventario)} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} fields={[{ key: "baseActivos", label: "Base actual de activos fijos en Excel" }, { key: "camaraComercio", label: "Cámara de Comercio" }]} />
    </>
  );
}

export function ExistenciasSummary({ data }) {
  const s = data.servicio;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>Información del servicio</h4>
        <Row q="Tipos de inventario" a={s.tiposInventario.length ? s.tiposInventario.join(", ") + (s.tiposInventario.includes("Otros") ? ` (${s.tiposInventarioOtro})` : "") : ""} />
        <Row q="Referencias o códigos aproximados" a={s.numReferencias} />
        <Row q="Unidades físicas aproximadas" a={s.numUnidades} />
        <Row q="Bodegas/sedes/puntos de venta" a={s.numUbicaciones} />
        <Row q="Ciudades o ubicaciones" a={s.ciudadesUbicaciones} />
        <Row q="Sistema de control de inventario" a={s.sistemaControl} />
        <Row q="Productos identificados (códigos/etiquetas)" a={s.productosIdentificados} />
        <Row q="Alcance requerido" a={s.alcance.length ? s.alcance.join(", ") + (s.alcance.includes("Otro") ? ` (${s.alcanceOtro})` : "") : ""} />
        <Row q="¿Operación suspendida?" a={s.operacionSuspendida} />
        <Row q="Personal disponible para el conteo" a={s.personalDisponible} />
        <Row q="Fecha requerida del inventario" a={s.fechaInventario && fmtDate(s.fechaInventario)} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} fields={[{ key: "baseInventarios", label: "Base actual de inventarios en Excel" }, { key: "camaraComercio", label: "Cámara de Comercio" }]} />
    </>
  );
}

export function AuditoriaSummary({ data }) {
  const s = data.servicio;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>Información del servicio</h4>
        <Row q="Servicio requerido" a={s.tipoServicio === "Otro" ? `Otro — ${s.tipoServicioOtro}` : s.tipoServicio} />
        <Row q="Período a auditar" a={s.periodoAuditar} />
        <Row q="Ingresos anuales aproximados" a={s.ingresosAnuales} />
        <Row q="Activos totales aproximados" a={s.activosTotales} />
        <Row q="Número de empleados" a={s.numEmpleados} />
        <Row q="Contabilidad actualizada y conciliada" a={s.contabilidadActualizada} />
        <Row q="¿Auditada anteriormente?" a={yn(s.auditadaAnteriormente)} />
        <Row q="Situaciones especiales" a={s.situacionesEspeciales.length ? s.situacionesEspeciales.join(", ") + (s.situacionesEspeciales.includes("Otra") ? ` (${s.situacionesEspecialesOtra})` : "") : ""} />
        <Row q="Fecha requerida del informe" a={s.fechaInforme && fmtDate(s.fechaInforme)} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} fields={[{ key: "estadosFinancieros", label: "Últimos estados financieros" }, { key: "camaraComercio", label: "Certificado de Cámara de Comercio" }]} />
    </>
  );
}

export function ConstitucionSummary({ data }) {
  const e = data.empresa, s = data.socios, c = data.capital, o = data.operativa, sa = data.serviciosAdicionales;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>Información de la empresa</h4>
        <Row q="Nombre propuesto" a={e.nombrePropuesto} />
        <Row q="Ciudad de constitución" a={e.ciudad} />
        <Row q="Actividad de la empresa" a={e.actividadDescripcion} />
        <Row q="¿Actividades adicionales?" a={e.actividadesAdicionales === "Sí" ? `Sí — ${e.actividadesAdicionalesDetalle}` : e.actividadesAdicionales} />
      </div>
      <div className="op-doc-section">
        <h4>Socios y administración</h4>
        <Row q="Número de socios" a={s.numSocios} />
        <Row q="Tipo de socios" a={s.tipoSocios} />
        <Row q="Participación definida" a={s.participacionDefinida} />
        <Row q="Representante legal" a={s.representanteLegal} />
        <Row q="Representante legal suplente" a={s.representanteSuplente} />
      </div>
      <div className="op-doc-section">
        <h4>Capital de la empresa</h4>
        <Row q="Capital aproximado" a={c.capitalAproximado} />
        <Row q="Tipo de aportes" a={c.tipoAportes} />
        <Row q="¿Capital pagado completamente?" a={c.capitalPagadoCompleto} />
      </div>
      <div className="op-doc-section">
        <h4>Información operativa</h4>
        <Row q="¿Empleados desde el inicio?" a={o.tendraEmpleados} />
        <Row q="¿Importaciones o exportaciones?" a={o.importaExporta} />
        <Row q="¿Inversión extranjera?" a={o.inversionExtranjera} />
        <Row q="¿Operaciones con el exterior?" a={o.operacionesExterior} />
      </div>
      <div className="op-doc-section">
        <h4>Servicios adicionales</h4>
        <Row q="Servicios seleccionados" a={sa.seleccion.length ? sa.seleccion.join(", ") : ""} />
        {sa.seleccion.includes("Representación legal") && <Row q="Duración representación legal" a={sa.duracionRepresentacion} />}
        {sa.seleccion.includes("Domicilio fiscal") && <Row q="Duración domicilio fiscal" a={sa.duracionDomicilio} />}
        {sa.seleccion.includes("Outsourcing contable") && <Row q="Inicio del servicio contable" a={sa.inicioContable} />}
      </div>
      <div className="op-doc-section">
        <h4>Fecha estimada</h4>
        <Row q="Fecha esperada de constitución" a={data.fechaEstimada} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
    </>
  );
}

export function DueDiligenceSummary({ data }) {
  const e = data.empresa, m = data.motivo, al = data.alcance, fin = data.financiera, asp = data.aspectos;
  return (
    <>
      <ContactoSummary data={data.contacto} />
      <div className="op-doc-section">
        <h4>Información de la empresa</h4>
        <Row q="Razón social" a={e.razonSocial} />
        <Row q="NIT" a={e.nit} />
        <Row q="Ciudad principal de operación" a={e.ciudad} />
        <Row q="Actividad económica principal" a={e.actividadEconomica} />
        <Row q="Descripción de la empresa" a={e.descripcion} />
      </div>
      <div className="op-doc-section">
        <h4>Tipo de Due Diligence</h4>
        <Row q="Tipo de revisión" a={data.tipoRevision} />
      </div>
      <div className="op-doc-section">
        <h4>Motivo de la revisión</h4>
        <Row q="Propósito" a={m.proposito === "Otro" ? `Otro — ${m.propositoOtro}` : m.proposito} />
        <Row q="¿Operación en negociación?" a={m.operacionEnNegociacion} />
        <Row q="¿Fecha prevista de cierre?" a={m.fechaCierrePrevista === "Sí" ? `Sí — ${m.fechaCierreEstimada && fmtDate(m.fechaCierreEstimada)}` : m.fechaCierrePrevista} />
      </div>
      <div className="op-doc-section">
        <h4>Alcance de la revisión</h4>
        <Row q="Periodos a revisar" a={al.periodos} />
        <Row q="¿Incluye periodo actual?" a={al.incluyePeriodoActual} />
        <Row q="Una empresa o grupo empresarial" a={al.unaOvarias === "Varias empresas del mismo grupo" ? `${al.unaOvarias} — ${al.cantidadEmpresas || "?"} empresas` : al.unaOvarias} />
      </div>
      <div className="op-doc-section">
        <h4>Información financiera general</h4>
        <Row q="Ingresos anuales aproximados" a={fin.ingresosAnuales} />
        <Row q="Activos totales aproximados" a={fin.activosTotales} />
        <Row q="Número aproximado de empleados" a={fin.numEmpleados} />
        <Row q="¿Estados financieros recientes?" a={fin.estadosFinancierosRecientes} />
        <Row q="Contabilidad actualizada y conciliada" a={fin.contabilidadActualizada} />
      </div>
      <div className="op-doc-section">
        <h4>Aspectos relevantes</h4>
        <Row q="Conceptos que maneja la empresa" a={asp.conceptos.length ? asp.conceptos.join(", ") : ""} />
        <Row q="Situaciones especiales" a={asp.situacionesEspeciales.length ? asp.situacionesEspeciales.join(", ") + (asp.situacionesEspeciales.includes("Otra") ? ` (${asp.situacionesEspecialesOtra})` : "") : ""} />
      </div>
      {data.notasGenerales && (
        <div className="op-doc-section">
          <h4>Observaciones</h4>
          <p style={{ fontSize: 13 }}>{data.notasGenerales}</p>
        </div>
      )}
      <DocumentosSummary data={data.documentos} fields={[{ key: "estadosFinancieros", label: "Últimos estados financieros" }, { key: "camaraComercio", label: "Certificado de Cámara de Comercio vigente" }]} />
    </>
  );
}

export function RevisoriaSummary({ data }) {
  const g = data.generales, f = data.fiscal, p = data.personal, fin = data.financiera;
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
        <h4>2. Situación fiscal</h4>
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
        <h4>3. Personal</h4>
        <Row q="Empleados contratados directamente" a={p.empleadosDirectos} />
        <Row q="Profesionales o contratistas indirectos" a={p.contratistasIndirectos} />
        <Row q="Personas en el equipo contable" a={p.equipoContable} />
        <Row q="Notas del equipo contable" a={p.notasEquipoContable} />
      </div>
      <div className="op-doc-section">
        <h4>4. Información administrativa y financiera</h4>
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
        <Row q="Origen de los ingresos" a={o.origenIngresos} />
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
