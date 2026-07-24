import * as XLSX from "xlsx";
import { yn } from "./model";

function contactoRows(c) {
  return [
    ["INFORMACIÓN DE CONTACTO", ""],
    ["Solicitante", c.nombreSolicitante],
    ["Cargo", c.cargo],
    ["Correo", c.correo],
    ["Teléfono / WhatsApp", c.telefono],
    ["Medio de contacto preferido", c.medioPreferido],
    ["Razón social", c.razonSocial],
    ["NIT", c.nit],
    ["Ciudad", c.ciudad === "Otra" ? c.ciudadOtra : c.ciudad],
    ["Presupuesto estimado", c.presupuesto],
    ["", ""],
  ];
}

function revisoriaRows(data) {
  const g = data.generales, f = data.fiscal, p = data.personal, fin = data.financiera;
  return [
    ...contactoRows(data.contacto),
    ["1. DATOS GENERALES", ""],
    ["Giro / industria", g.giro],
    ["Principales servicios o productos", g.principalesServicios],
    ["Fecha de inicio de operaciones", g.fechaInicioOperaciones],
    ["Número de sucursales", g.numSucursales],
    ["Subsidiarias o afiliadas", g.subsidiarias],
    ["Grupo de NIIF", g.grupoNiif && `Grupo ${g.grupoNiif}`],
    ["", ""],
    ["2. SITUACIÓN FISCAL", ""],
    ["Retención en la fuente revisada", f.retencionFuenteMes && `${f.retencionFuenteMes} ${f.retencionFuenteAnio}`],
    ["Impuesto a la renta revisado — año", f.rentaAnio],
    ["IVA revisado", f.ivaPeriodicidad && `${f.ivaPeriodicidad} ${f.ivaAnio}`],
    ["ICA revisado", f.icaPeriodicidad && `${f.icaPeriodicidad} ${f.icaAnio}`],
    ["Gran contribuyente", yn(f.granContribuyente)],
    ["Recursos de reclamación/apelación ante la DIAN", yn(f.recursosDian)],
    ["Aplazamiento/fraccionamiento de deudas tributarias", yn(f.aplazamientoDeudas)],
    ["Pérdidas tributarias arrastrables", f.perdidasTributarias ? `Sí — ${f.perdidasDetalle || "sin detalle"}` : yn(f.perdidasTributarias)],
    ["Operaciones gravadas y no gravadas por IVA", yn(f.operacionesGravadasNoGravadas)],
    ["", ""],
    ["3. PERSONAL", ""],
    ["Empleados contratados directamente", p.empleadosDirectos],
    ["Profesionales o contratistas indirectos", p.contratistasIndirectos],
    ["Personas en el equipo contable", p.equipoContable],
    ["Notas del equipo contable", p.notasEquipoContable],
    ["", ""],
    ["4. INFORMACIÓN ADMINISTRATIVA Y FINANCIERA", ""],
    ["Moneda", fin.moneda === "pesos" ? "Pesos" : "Dólares"],
    ["Ventas año actual", fin.ventasAnioActual],
    ["Ventas año anterior", fin.ventasAnioAnterior],
    ["Resultado contable — año actual", fin.resultadoActual],
    ["Resultado contable — año anterior", fin.resultadoAnterior],
    ["Activo fijo (cantidad de ítems)", fin.activoFijoCantidad],
    ["Notas financieras", fin.notas],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Cámara de Comercio", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["Últimos estados financieros", data.documentos?.estadosFinancierosUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function ptRows(data) {
  const g = data.general, c = data.consideraciones;
  const activas = data.transacciones.filter((t) => t.valorIngresos || t.valorEgresos);
  const txRows = activas.length
    ? activas.map((t) => [
        t.nombre,
        [
          t.valorIngresos ? `Ingresos: ${t.valorIngresos}${t.contratosIngresos ? ` (${t.contratosIngresos} contratos)` : ""}` : "",
          t.valorEgresos ? `Egresos: ${t.valorEgresos}${t.contratosEgresos ? ` (${t.contratosEgresos} contratos)` : ""}` : "",
        ]
          .filter(Boolean)
          .join(" · "),
      ])
    : [["(sin transacciones registradas)", ""]];

  return [
    ...contactoRows(data.contacto),
    ["1. INFORMACIÓN GENERAL", ""],
    ["Actividad económica principal", g.actividadEconomica],
    ["Período a evaluar", g.periodoEvaluar],
    ["Ingresos del periodo", g.ingresosPeriodo],
    ["Utilidad del periodo", g.utilidadPeriodo],
    ["Valor de activos", g.valorActivos],
    ["", ""],
    ["2. CONSIDERACIONES GENERALES", ""],
    ["Partes vinculadas (aprox.)", c.numPartesVinculadas],
    ["Operaciones con vinculadas domiciliadas", yn(c.opDomiciliadas)],
    ["Operaciones con vinculadas no domiciliadas", yn(c.opNoDomiciliadas)],
    ["Operaciones con paraísos fiscales", yn(c.opParaisosFiscales)],
    ["Consolida estados financieros", yn(c.consolidaEEFF)],
    ["Evaluación del test de beneficio realizada", yn(c.testBeneficio)],
    ["", ""],
    ["3. TRANSACCIONES CON VINCULADOS", ""],
    ...txRows,
    ["Detalle de 'Otros' / observaciones", data.otrosDetalle],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Cámara de Comercio", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["Últimos estados financieros", data.documentos?.estadosFinancierosUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function outsourcingRows(data) {
  const o = data.operacion, c = data.contable, doc = data.documentos;
  return [
    ...contactoRows(data.contacto),
    ["1. TAMAÑO Y OPERACIÓN", ""],
    ["Ingresos anuales aproximados", o.ingresosAnuales],
    ["Facturas de venta al mes", o.facturasVenta],
    ["Facturas de compra al mes", o.facturasCompra],
    ["Número de cuentas bancarias", o.cuentasBancarias],
    ["Número de empleados", o.numEmpleados],
    ["Maneja inventarios", yn(o.manejaInventarios)],
    ["Importaciones o exportaciones", yn(o.comercioExterior)],
    ["Origen de los ingresos", o.origenIngresos],
    ["", ""],
    ["2. SITUACIÓN CONTABLE Y TRIBUTARIA", ""],
    ["Contabilidad actualizada", c.contabilidadActualizada],
    ["Actualizada hasta", c.fechaActualizadaMes && `${c.fechaActualizadaMes} ${c.fechaActualizadaAnio}`],
    ["Software contable", c.softwareContable === "Otro" ? `Otro — ${c.softwareOtroDetalle}` : c.softwareContable],
    ["Obligaciones", c.obligaciones.length ? c.obligaciones.join(", ") + (c.obligaciones.includes("Otras") ? ` (${c.obligacionesOtrasDetalle})` : "") : ""],
    ["Municipios donde presenta ICA", c.municipiosICA],
    ["Frecuencia de estados financieros", c.frecuenciaEF],
    ["¿Servicio remoto?", c.servicioRemoto],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Cámara de Comercio", doc.camaraComercioUrl || "(no adjuntado)"],
    ["Últimos estados financieros", doc.estadosFinancierosUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function activosFijosRows(data) {
  const s = data.servicio;
  return [
    ...contactoRows(data.contacto),
    ["INFORMACIÓN DEL SERVICIO", ""],
    ["Objetivo principal", s.objetivo === "Otro" ? `Otro — ${s.objetivoOtro}` : s.objetivo],
    ["Cantidad de activos a inventariar", s.cantidadActivos],
    ["Tipos de activos", s.tiposActivos.length ? s.tiposActivos.join(", ") + (s.tiposActivos.includes("Otros") ? ` (${s.tiposActivosOtro})` : "") : ""],
    ["Número de sedes/ubicaciones", s.numSedes],
    ["Ciudades o ubicaciones", s.ciudadesUbicaciones],
    ["Cuenta con base de activos", s.tieneBaseActivos],
    ["Activos identificados con placas/etiquetas", s.activosIdentificados],
    ["Requiere placas o etiquetas", s.requierePlacas],
    ["Requiere conciliación físico-contable", s.requiereConciliacion],
    ["Requiere registro fotográfico", yn(s.requiereFotografico)],
    ["Fecha requerida del inventario", s.fechaInventario],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Base actual de activos fijos en Excel", data.documentos?.baseActivosUrl || "(no adjuntado)"],
    ["Cámara de Comercio", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function existenciasRows(data) {
  const s = data.servicio;
  return [
    ...contactoRows(data.contacto),
    ["INFORMACIÓN DEL SERVICIO", ""],
    ["Tipos de inventario", s.tiposInventario.length ? s.tiposInventario.join(", ") + (s.tiposInventario.includes("Otros") ? ` (${s.tiposInventarioOtro})` : "") : ""],
    ["Referencias o códigos aproximados", s.numReferencias],
    ["Unidades físicas aproximadas", s.numUnidades],
    ["Bodegas/sedes/puntos de venta", s.numUbicaciones],
    ["Ciudades o ubicaciones", s.ciudadesUbicaciones],
    ["Sistema de control de inventario", s.sistemaControl],
    ["Productos identificados (códigos/etiquetas)", s.productosIdentificados],
    ["Alcance requerido", s.alcance.length ? s.alcance.join(", ") + (s.alcance.includes("Otro") ? ` (${s.alcanceOtro})` : "") : ""],
    ["¿Operación suspendida?", s.operacionSuspendida],
    ["Personal disponible para el conteo", s.personalDisponible],
    ["Fecha requerida del inventario", s.fechaInventario],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Base actual de inventarios en Excel", data.documentos?.baseInventariosUrl || "(no adjuntado)"],
    ["Cámara de Comercio", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function auditoriaRows(data) {
  const s = data.servicio;
  return [
    ...contactoRows(data.contacto),
    ["INFORMACIÓN DEL SERVICIO", ""],
    ["Servicio requerido", s.tipoServicio === "Otro" ? `Otro — ${s.tipoServicioOtro}` : s.tipoServicio],
    ["Período a auditar", s.periodoAuditar],
    ["Ingresos anuales aproximados", s.ingresosAnuales],
    ["Activos totales aproximados", s.activosTotales],
    ["Número de empleados", s.numEmpleados],
    ["Contabilidad actualizada y conciliada", s.contabilidadActualizada],
    ["¿Auditada anteriormente?", yn(s.auditadaAnteriormente)],
    ["Situaciones especiales", s.situacionesEspeciales.length ? s.situacionesEspeciales.join(", ") + (s.situacionesEspeciales.includes("Otra") ? ` (${s.situacionesEspecialesOtra})` : "") : ""],
    ["Fecha requerida del informe", s.fechaInforme],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Últimos estados financieros", data.documentos?.estadosFinancierosUrl || "(no adjuntado)"],
    ["Certificado de Cámara de Comercio", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function constitucionRows(data) {
  const e = data.empresa, s = data.socios, c = data.capital, o = data.operativa, sa = data.serviciosAdicionales;
  return [
    ...contactoRows(data.contacto),
    ["INFORMACIÓN DE LA EMPRESA", ""],
    ["Nombre propuesto", e.nombrePropuesto],
    ["Ciudad de constitución", e.ciudad],
    ["Actividad de la empresa", e.actividadDescripcion],
    ["¿Actividades adicionales?", e.actividadesAdicionales === "Sí" ? `Sí — ${e.actividadesAdicionalesDetalle}` : e.actividadesAdicionales],
    ["", ""],
    ["SOCIOS Y ADMINISTRACIÓN", ""],
    ["Número de socios", s.numSocios],
    ["Tipo de socios", s.tipoSocios],
    ["Participación definida", s.participacionDefinida],
    ["Representante legal", s.representanteLegal],
    ["Representante legal suplente", s.representanteSuplente],
    ["", ""],
    ["CAPITAL DE LA EMPRESA", ""],
    ["Capital aproximado", c.capitalAproximado],
    ["Tipo de aportes", c.tipoAportes],
    ["¿Capital pagado completamente?", c.capitalPagadoCompleto],
    ["", ""],
    ["INFORMACIÓN OPERATIVA", ""],
    ["¿Empleados desde el inicio?", o.tendraEmpleados],
    ["¿Importaciones o exportaciones?", o.importaExporta],
    ["¿Inversión extranjera?", o.inversionExtranjera],
    ["¿Operaciones con el exterior?", o.operacionesExterior],
    ["", ""],
    ["SERVICIOS ADICIONALES", ""],
    ["Servicios seleccionados", sa.seleccion.length ? sa.seleccion.join(", ") : ""],
    ["Duración representación legal", sa.duracionRepresentacion],
    ["Duración domicilio fiscal", sa.duracionDomicilio],
    ["Inicio del servicio contable", sa.inicioContable],
    ["", ""],
    ["Fecha esperada de constitución", data.fechaEstimada],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function dueDiligenceRows(data) {
  const e = data.empresa, m = data.motivo, al = data.alcance, fin = data.financiera, asp = data.aspectos;
  return [
    ...contactoRows(data.contacto),
    ["INFORMACIÓN DE LA EMPRESA", ""],
    ["Razón social", e.razonSocial],
    ["NIT", e.nit],
    ["Ciudad principal de operación", e.ciudad],
    ["Actividad económica principal", e.actividadEconomica],
    ["Descripción de la empresa", e.descripcion],
    ["", ""],
    ["TIPO DE DUE DILIGENCE", ""],
    ["Tipo de revisión", data.tipoRevision],
    ["", ""],
    ["MOTIVO DE LA REVISIÓN", ""],
    ["Propósito", m.proposito === "Otro" ? `Otro — ${m.propositoOtro}` : m.proposito],
    ["¿Operación en negociación?", m.operacionEnNegociacion],
    ["¿Fecha prevista de cierre?", m.fechaCierrePrevista === "Sí" ? `Sí — ${m.fechaCierreEstimada}` : m.fechaCierrePrevista],
    ["", ""],
    ["ALCANCE DE LA REVISIÓN", ""],
    ["Periodos a revisar", al.periodos],
    ["¿Incluye periodo actual?", al.incluyePeriodoActual],
    ["Una empresa o grupo empresarial", al.unaOvarias === "Varias empresas del mismo grupo" ? `${al.unaOvarias} — ${al.cantidadEmpresas || "?"} empresas` : al.unaOvarias],
    ["", ""],
    ["INFORMACIÓN FINANCIERA GENERAL", ""],
    ["Ingresos anuales aproximados", fin.ingresosAnuales],
    ["Activos totales aproximados", fin.activosTotales],
    ["Número aproximado de empleados", fin.numEmpleados],
    ["¿Estados financieros recientes?", fin.estadosFinancierosRecientes],
    ["Contabilidad actualizada y conciliada", fin.contabilidadActualizada],
    ["", ""],
    ["ASPECTOS RELEVANTES", ""],
    ["Conceptos que maneja la empresa", asp.conceptos.length ? asp.conceptos.join(", ") : ""],
    ["Situaciones especiales", asp.situacionesEspeciales.length ? asp.situacionesEspeciales.join(", ") + (asp.situacionesEspeciales.includes("Otra") ? ` (${asp.situacionesEspecialesOtra})` : "") : ""],
    ["", ""],
    ["DOCUMENTOS ADJUNTOS", ""],
    ["Últimos estados financieros", data.documentos?.estadosFinancierosUrl || "(no adjuntado)"],
    ["Certificado de Cámara de Comercio vigente", data.documentos?.camaraComercioUrl || "(no adjuntado)"],
    ["", ""],
    ["Observaciones adicionales", data.notasGenerales],
  ];
}

function tipoLabel(tipo) {
  const labels = {
    revisoria: "Revisoria Fiscal",
    pt: "Precios de Transferencia",
    outsourcing: "Outsourcing Contable",
    activosFijos: "Inventario Activos Fijos",
    existencias: "Inventario Existencias",
    auditoria: "Auditoria Financiera",
    constitucion: "Constitucion de Empresa",
    dueDiligence: "Due Diligence",
  };
  return labels[tipo] || tipo;
}

export function exportRecordToExcel(record) {
  const rowsByTipo = {
    revisoria: revisoriaRows, pt: ptRows, outsourcing: outsourcingRows,
    activosFijos: activosFijosRows, existencias: existenciasRows, auditoria: auditoriaRows,
    constitucion: constitucionRows, dueDiligence: dueDiligenceRows,
  };
  const rows = rowsByTipo[record.tipo](record.data).map(([pregunta, respuesta]) => [
    pregunta || "",
    respuesta === null || respuesta === undefined || respuesta === "" ? "" : String(respuesta),
  ]);

  const sheetData = [["Pregunta", "Respuesta"], ...rows];
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  ws["!cols"] = [{ wch: 42 }, { wch: 50 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resumen");

  const safeName = (record.empresa || "cliente").replace(/[^a-zA-Z0-9-_ ]/g, "").trim().slice(0, 40);
  const fileName = `${tipoLabel(record.tipo)} - ${safeName} - ${record.fecha}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
