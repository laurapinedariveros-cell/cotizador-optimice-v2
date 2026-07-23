export const INGRESOS_LABELS = [
  "Menos de $2.000M",
  "$2.000M – $10.000M",
  "$10.000M – $50.000M",
  "Más de $50.000M",
];

export const TAMANO_LABELS = { pequena: "Pequeña", mediana: "Mediana", grande: "Grande" };
export const COMPLEJIDAD_LABELS = { baja: "Baja", media: "Media", alta: "Alta" };

export const ALCANCE_LABELS = [
  "Documentación Local",
  "Local + Informe Maestro",
  "Estudio completo (Local + Maestro + Benchmarking internacional)",
];

export const OPS_LABELS = [
  "1 a 3 operaciones con vinculados",
  "4 a 8 operaciones con vinculados",
  "Más de 8 operaciones con vinculados",
];

export const VOLUMEN_LABELS = [
  "Hasta 10 empleados / 100 transacciones mes",
  "11 a 30 empleados / 300 transacciones mes",
  "31 a 100 empleados / 800 transacciones mes",
  "Más de 100 empleados / 800+ transacciones mes",
];

export const TRANSACCIONES_PT = [
  "Comercio de suministros, materias primas, mercaderías, productos en proceso, terminados o bienes",
  "Comercio de activos fijos",
  "Servicios del giro principal de la empresa",
  "Servicios de consultoría, legales, contables, administrativos, técnicos o informáticos",
  "Otros servicios secundarios (diferentes al giro principal de la empresa)",
  "Regalías",
  "Intereses por préstamos",
  "Arrendamiento y/o subarrendamiento",
  "Enajenación de acciones",
  "Transmisión de intangibles",
  "Operaciones con commodities",
  "Otros (detallar)",
];

export const CONTRATOS_OPTIONS = Array.from({ length: 100 }, (_, i) => i + 1);

export const CIUDADES_COLOMBIA = [
  "Bogotá D.C.", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga",
  "Pereira", "Manizales", "Santa Marta", "Cúcuta", "Ibagué", "Villavicencio",
  "Pasto", "Montería", "Neiva", "Armenia", "Popayán", "Sincelejo", "Valledupar",
  "Tunja", "Riohacha", "Quibdó", "Yopal", "Florencia", "Arauca", "San Andrés",
  "Leticia", "Mocoa", "Puerto Carreño", "Inírida", "Otra",
];

export const MEDIO_CONTACTO_OPTIONS = ["Correo electrónico", "Llamada", "WhatsApp", "Videollamada"];

export function emptyContacto() {
  return {
    nombreSolicitante: "",
    cargo: "",
    correo: "",
    telefono: "",
    medioPreferido: "",
    razonSocial: "",
    nit: "",
    ciudad: "",
    ciudadOtra: "",
    presupuesto: "",
  };
}

export function emptyRevisoria() {
  return {
    contacto: emptyContacto(),
    generales: {
      giro: "",
      principalesServicios: "",
      fechaInicioOperaciones: "",
      numSucursales: "",
      subsidiarias: "",
      grupoNiif: "",
    },
    cuentas: { numClientesCxC: "", facturasVentaMensuales: "", notas: "" },
    fiscal: {
      retencionFuenteMes: "", retencionFuenteAnio: "",
      rentaMes: "", rentaAnio: "",
      ivaMes: "", ivaAnio: "",
      icaMes: "", icaAnio: "",
      otrosRevisiones: "",
      granContribuyente: null,
      recursosDian: null,
      aplazamientoDeudas: null,
      perdidasTributarias: null,
      perdidasDetalle: "",
      operacionesGravadasNoGravadas: null,
    },
    personal: {
      empleados: "", obreros: "", planillaConfidencial: "", profesionalesIndependientes: "",
      noDomiciliados: "", otrosCantidad: "", otrosDetalle: "", equipoContable: "", notasEquipoContable: "",
    },
    financiera: {
      moneda: "pesos",
      ventasLocalesProyectado: "", ventasExportProyectado: "",
      ventasLocalesAnterior: "", ventasExportAnterior: "",
      resultadoActual: "", resultadoAnterior: "",
      activoFijoCantidad: "",
      notas: "",
    },
    notasGenerales: "",
    documentos: {
      camaraComercioUrl: "",
      camaraComercioNombre: "",
      estadosFinancierosUrl: "",
      estadosFinancierosNombre: "",
    },
  };
}

export const INGRESOS_OUTSOURCING_LABELS = [
  "Menos de $500 millones",
  "Entre $500 millones y $1.000 millones",
  "Entre $1.000 millones y $5.000 millones",
  "Entre $5.000 millones y $15.000 millones",
  "Más de $15.000 millones",
];

export const FACTURAS_LABELS = ["Menos de 20", "Entre 20 y 50", "Entre 51 y 150", "Entre 151 y 500", "Más de 500"];

export const CUENTAS_BANCARIAS_LABELS = ["Una", "Dos", "Entre tres y cinco", "Más de cinco"];

export const EMPLEADOS_OUTSOURCING_LABELS = ["Ninguno", "Entre 1 y 5", "Entre 6 y 20", "Entre 21 y 50", "Más de 50"];

export const SOFTWARE_CONTABLE_OPTIONS = ["Siigo", "World Office", "Helisa", "Alegra", "SAP", "Excel", "Otro", "No cuenta con software"];

export const OBLIGACIONES_OPTIONS = [
  "IVA", "Retención en la fuente", "ICA", "Información exógena",
  "Nómina electrónica", "Documento soporte", "Declaración de renta", "Otras",
];

export const MUNICIPIOS_ICA_LABELS = ["Uno", "Entre dos y cinco", "Más de cinco", "No estoy seguro"];

export const FRECUENCIA_EF_LABELS = ["Mensualmente", "Trimestralmente", "Semestralmente", "Anualmente"];

export function emptyOutsourcing() {
  return {
    contacto: emptyContacto(),
    operacion: {
      ingresosAnuales: "",
      facturasVenta: "",
      facturasCompra: "",
      cuentasBancarias: "",
      numEmpleados: "",
      manejaInventarios: null,
      comercioExterior: null,
    },
    contable: {
      contabilidadActualizada: "",
      fechaActualizadaMes: "",
      fechaActualizadaAnio: "",
      softwareContable: "",
      softwareOtroDetalle: "",
      obligaciones: [],
      obligacionesOtrasDetalle: "",
      municipiosICA: "",
      frecuenciaEF: "",
      servicioRemoto: "",
    },
    documentos: {
      camaraComercioUrl: "",
      camaraComercioNombre: "",
      estadosFinancierosUrl: "",
      estadosFinancierosNombre: "",
    },
    notasGenerales: "",
  };
}

export function emptyPT() {
  return {
    contacto: emptyContacto(),
    general: { tipoEntidad: "", actividadEconomica: "", periodoEvaluar: "" },
    consideraciones: {
      numPartesVinculadas: "",
      opDomiciliadas: null,
      opNoDomiciliadas: null,
      opParaisosFiscales: null,
      consolidaEEFF: null,
      testBeneficio: null,
    },
    transacciones: TRANSACCIONES_PT.map((nombre, i) => ({
      id: i,
      nombre,
      valorIngresos: "",
      contratosIngresos: "",
      valorEgresos: "",
      contratosEgresos: "",
    })),
    otrosDetalle: "",
    notasGenerales: "",
    documentos: {
      camaraComercioUrl: "",
      camaraComercioNombre: "",
      estadosFinancierosUrl: "",
      estadosFinancierosNombre: "",
    },
  };
}

export function isFilled(v) {
  if (v === null || v === undefined) return false;
  if (typeof v === "boolean") return true;
  if (typeof v === "string") return v.trim() !== "";
  return true;
}

export function sectionCompleteness(obj) {
  const leaves = [];
  const walk = (o) => {
    Object.values(o).forEach((v) => {
      if (v !== null && typeof v === "object" && !Array.isArray(v)) walk(v);
      else leaves.push(v);
    });
  };
  walk(obj);
  const filled = leaves.filter(isFilled).length;
  return leaves.length ? Math.round((filled / leaves.length) * 100) : 100;
}

export function fmtDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("es-CO", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function yn(v) {
  return v === true ? "Sí" : v === false ? "No" : "";
}
