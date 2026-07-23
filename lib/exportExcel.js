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
    ["", ""],
  ];
}

function revisoriaRows(data) {
  const g = data.generales, c = data.cuentas, f = data.fiscal, p = data.personal, fin = data.financiera;
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
    ["2. VOLUMEN DE CUENTAS Y TRANSACCIONES", ""],
    ["Cuentas por cobrar — número de clientes", c.numClientesCxC],
    ["Facturas de venta mensuales (promedio)", c.facturasVentaMensuales],
    ["Notas", c.notas],
    ["", ""],
    ["3. SITUACIÓN FISCAL", ""],
    ["Retención en la fuente revisada", f.retencionFuenteMes && `${f.retencionFuenteMes} ${f.retencionFuenteAnio}`],
    ["Impuesto a la renta revisado", f.rentaMes && `${f.rentaMes} ${f.rentaAnio}`],
    ["IVA revisado", f.ivaMes && `${f.ivaMes} ${f.ivaAnio}`],
    ["ICA revisado", f.icaMes && `${f.icaMes} ${f.icaAnio}`],
    ["Gran contribuyente", yn(f.granContribuyente)],
    ["Recursos de reclamación/apelación ante la DIAN", yn(f.recursosDian)],
    ["Aplazamiento/fraccionamiento de deudas tributarias", yn(f.aplazamientoDeudas)],
    ["Pérdidas tributarias arrastrables", f.perdidasTributarias ? `Sí — ${f.perdidasDetalle || "sin detalle"}` : yn(f.perdidasTributarias)],
    ["Operaciones gravadas y no gravadas por IVA", yn(f.operacionesGravadasNoGravadas)],
    ["", ""],
    ["4. PERSONAL", ""],
    ["Empleados", p.empleados],
    ["Obreros", p.obreros],
    ["Planilla confidencial", p.planillaConfidencial],
    ["Profesionales independientes", p.profesionalesIndependientes],
    ["No domiciliados", p.noDomiciliados],
    ["Otros", p.otrosCantidad && `${p.otrosCantidad} — ${p.otrosDetalle || ""}`],
    ["Personal en el equipo contable", p.equipoContable],
    ["Notas del equipo contable", p.notasEquipoContable],
    ["", ""],
    ["5. INFORMACIÓN ADMINISTRATIVA Y FINANCIERA", ""],
    ["Moneda", fin.moneda === "pesos" ? "Pesos" : "Dólares"],
    ["Ventas locales — proyectado", fin.ventasLocalesProyectado],
    ["Ventas exportación — proyectado", fin.ventasExportProyectado],
    ["Ventas locales — año anterior", fin.ventasLocalesAnterior],
    ["Ventas exportación — año anterior", fin.ventasExportAnterior],
    ["Resultado contable — año actual", fin.resultadoActual],
    ["Resultado contable — año anterior", fin.resultadoAnterior],
    ["Activo fijo (cantidad de ítems)", fin.activoFijoCantidad],
    ["Notas financieras", fin.notas],
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
    ["Tipo de entidad", g.tipoEntidad],
    ["Actividad económica principal", g.actividadEconomica],
    ["Período a evaluar", g.periodoEvaluar],
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

function tipoLabel(tipo) {
  if (tipo === "revisoria") return "Revisoria Fiscal";
  if (tipo === "pt") return "Precios de Transferencia";
  return "Outsourcing Contable";
}

export function exportRecordToExcel(record) {
  const rowsByTipo = { revisoria: revisoriaRows, pt: ptRows, outsourcing: outsourcingRows };
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
