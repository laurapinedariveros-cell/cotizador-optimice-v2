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
    fiscal: {
      retencionFuenteMes: "", retencionFuenteAnio: "",
      rentaAnio: "",
      ivaPeriodicidad: "", ivaAnio: "",
      icaPeriodicidad: "", icaAnio: "",
      otrosRevisiones: "",
      granContribuyente: null,
      recursosDian: null,
      aplazamientoDeudas: null,
      perdidasTributarias: null,
      perdidasDetalle: "",
      operacionesGravadasNoGravadas: null,
    },
    personal: {
      empleadosDirectos: "",
      contratistasIndirectos: "",
      equipoContable: "",
      notasEquipoContable: "",
    },
    financiera: {
      moneda: "pesos",
      ventasAnioActual: "",
      ventasAnioAnterior: "",
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
      origenIngresos: "",
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

/* --------------------- Inventario de Activos Fijos --------------------- */

export const OBJETIVO_ACTIVOS_OPTIONS = [
  "Toma física de activos",
  "Levantamiento y creación de la base de activos",
  "Conciliación física y contable",
  "Plaqueo o etiquetado",
  "Actualización de una base existente",
  "Identificación del estado de conservación",
  "Otro",
];

export const CANTIDAD_ACTIVOS_OPTIONS = ["Menos de 100", "Entre 100 y 500", "Entre 501 y 1.000", "Entre 1.001 y 5.000", "Más de 5.000", "No se conoce la cantidad"];

export const TIPOS_ACTIVOS_OPTIONS = ["Equipos de cómputo", "Muebles y enseres", "Maquinaria y equipo", "Equipos médicos o especializados", "Vehículos", "Construcciones y edificaciones", "Otros"];

export const NUM_SEDES_OPTIONS = ["Una", "Entre dos y cinco", "Entre seis y diez", "Más de diez"];

export const BASE_ACTIVOS_OPTIONS = ["Sí, en el software contable", "Sí, en Excel", "Sí, pero está desactualizada", "No cuenta con una base"];

export const IDENTIFICADOS_OPTIONS = ["Sí, todos", "Sí, parcialmente", "No"];

export const PLACAS_OPTIONS = ["Sí, etiquetas adhesivas", "Sí, placas de aluminio", "Sí, códigos QR", "No", "Requiero recomendación"];

export const TRI_SI_NO_INSEGURO = ["Sí", "No", "No estoy seguro"];

export function emptyActivosFijos() {
  return {
    contacto: emptyContacto(),
    servicio: {
      objetivo: "",
      objetivoOtro: "",
      cantidadActivos: "",
      tiposActivos: [],
      tiposActivosOtro: "",
      numSedes: "",
      ciudadesUbicaciones: "",
      tieneBaseActivos: "",
      activosIdentificados: "",
      requierePlacas: "",
      requiereConciliacion: "",
      requiereFotografico: null,
      fechaInventario: "",
    },
    documentos: { baseActivosUrl: "", baseActivosNombre: "", camaraComercioUrl: "", camaraComercioNombre: "" },
    notasGenerales: "",
  };
}

export const DOC_FIELDS_ACTIVOS_FIJOS = [
  { key: "baseActivos", label: "Base actual de activos fijos en Excel" },
  { key: "camaraComercio", label: "Cámara de Comercio" },
];

/* ----------------------- Inventario de Existencias ---------------------- */

export const TIPOS_INVENTARIO_OPTIONS = ["Mercancías para la venta", "Materias primas", "Productos en proceso", "Productos terminados", "Repuestos", "Suministros", "Medicamentos", "Alimentos", "Otros"];

export const REFERENCIAS_OPTIONS = ["Menos de 100", "Entre 100 y 500", "Entre 501 y 2.000", "Entre 2.001 y 10.000", "Más de 10.000", "No se conoce la cantidad"];

export const UNIDADES_OPTIONS = ["Menos de 1.000", "Entre 1.000 y 5.000", "Entre 5.001 y 20.000", "Más de 20.000", "No se conoce la cantidad"];

export const SISTEMA_CONTROL_OPTIONS = ["Sí, integrado al sistema contable", "Sí, mediante otro software", "Sí, en Excel", "No"];

export const ALCANCE_EXISTENCIAS_OPTIONS = [
  "Conteo total del inventario",
  "Conteo por muestreo",
  "Conciliación entre inventario físico y sistema",
  "Identificación de productos vencidos",
  "Identificación de productos averiados u obsoletos",
  "Etiquetado o codificación",
  "Otro",
];

export const PERSONAL_DISPONIBLE_OPTIONS = ["Sí", "No", "Parcialmente"];

export function emptyExistencias() {
  return {
    contacto: emptyContacto(),
    servicio: {
      tiposInventario: [],
      tiposInventarioOtro: "",
      numReferencias: "",
      numUnidades: "",
      numUbicaciones: "",
      ciudadesUbicaciones: "",
      sistemaControl: "",
      productosIdentificados: "",
      alcance: [],
      alcanceOtro: "",
      operacionSuspendida: "",
      personalDisponible: "",
      fechaInventario: "",
    },
    documentos: { baseInventariosUrl: "", baseInventariosNombre: "", camaraComercioUrl: "", camaraComercioNombre: "" },
    notasGenerales: "",
  };
}

export const DOC_FIELDS_EXISTENCIAS = [
  { key: "baseInventarios", label: "Base actual de inventarios en Excel" },
  { key: "camaraComercio", label: "Cámara de Comercio" },
];

/* ---------------------------- Auditoría Financiera ---------------------------- */

export const TIPO_SERVICIO_AUDITORIA_OPTIONS = ["Auditoría de estados financieros", "Revisión de información financiera", "Auditoría de una cuenta o rubro específico", "Otro"];

export const INGRESOS_AUDITORIA_OPTIONS = ["Sin ingresos", "Menos de $1.000 millones", "Entre $1.000 y $5.000 millones", "Entre $5.001 y $20.000 millones", "Más de $20.000 millones"];

export const ACTIVOS_TOTALES_OPTIONS = ["Menos de $1.000 millones", "Entre $1.000 y $5.000 millones", "Entre $5.001 y $20.000 millones", "Más de $20.000 millones"];

export const EMPLEADOS_AUDITORIA_OPTIONS = ["Ninguno", "Entre 1 y 10", "Entre 11 y 50", "Entre 51 y 200", "Más de 200"];

export const CONTABILIDAD_ACTUALIZADA_TRI = ["Sí", "Parcialmente", "No", "No estoy seguro"];

export const SITUACIONES_ESPECIALES_OPTIONS = ["Contabilidad atrasada", "Requerimientos de la DIAN", "Litigios o procesos legales", "Pérdidas recurrentes", "Sospecha de fraude", "Ninguna", "Otra"];

export function emptyAuditoria() {
  return {
    contacto: emptyContacto(),
    servicio: {
      tipoServicio: "",
      tipoServicioOtro: "",
      periodoAuditar: "",
      ingresosAnuales: "",
      activosTotales: "",
      numEmpleados: "",
      contabilidadActualizada: "",
      auditadaAnteriormente: null,
      situacionesEspeciales: [],
      situacionesEspecialesOtra: "",
      fechaInforme: "",
    },
    documentos: { estadosFinancierosUrl: "", estadosFinancierosNombre: "", camaraComercioUrl: "", camaraComercioNombre: "" },
    notasGenerales: "",
  };
}

export const DOC_FIELDS_AUDITORIA = [
  { key: "estadosFinancieros", label: "Últimos estados financieros" },
  { key: "camaraComercio", label: "Certificado de Cámara de Comercio" },
];

/* --------------------------- Constitución de Empresa --------------------------- */

export const TRI_AUN_NO_DEFINIDO = ["Sí", "No", "Aún no está definido"];

export const NUM_SOCIOS_OPTIONS = ["Un socio", "Dos socios", "Entre tres y cinco socios", "Más de cinco socios"];

export const TIPO_SOCIOS_OPTIONS = ["Personas naturales colombianas", "Personas naturales extranjeras", "Empresas colombianas", "Empresas extranjeras", "Una combinación de las anteriores"];

export const REPRESENTANTE_LEGAL_OPTIONS = ["Uno de los socios", "Una persona diferente a los socios", "Requiero el servicio de representación legal", "Aún no se ha definido"];

export const CAPITAL_APROX_OPTIONS = ["Menos de $10 millones", "Entre $10 y $50 millones", "Entre $51 y $200 millones", "Más de $200 millones", "Aún no está definido"];

export const TIPO_APORTES_OPTIONS = ["Dinero", "Bienes o activos", "Dinero y bienes", "Aún no está definido"];

export const SERVICIOS_ADICIONALES_OPTIONS = ["Representación legal", "Domicilio fiscal", "Outsourcing contable", "Ninguno"];

export const DURACION_SERVICIO_OPTIONS = ["Entre uno y tres meses", "Entre cuatro y seis meses", "Entre siete y doce meses", "De manera permanente", "Aún no está definido"];

export const INICIO_CONTABLE_OPTIONS = ["Desde la constitución de la empresa", "Desde el inicio de operaciones", "En una fecha posterior", "Aún no está definido"];

export const FECHA_ESTIMADA_CONSTITUCION_OPTIONS = ["Lo antes posible", "Durante los próximos 15 días", "Durante el próximo mes", "En los próximos tres meses", "Aún no está definido"];

export const SERVICIO_INCLUIDO_ITEMS = [
  "Validación inicial del nombre propuesto",
  "Elaboración de estatutos",
  "Elaboración de documentos de constitución",
  "Registro ante la Cámara de Comercio",
  "Inscripción en el RUT",
  "Obtención del NIT",
  "Definición inicial de responsabilidades tributarias",
  "Acompañamiento durante el proceso de constitución",
];

export function emptyConstitucion() {
  return {
    contacto: emptyContacto(),
    empresa: {
      nombrePropuesto: "",
      ciudad: "",
      actividadDescripcion: "",
      actividadesAdicionales: "",
      actividadesAdicionalesDetalle: "",
    },
    socios: {
      numSocios: "",
      tipoSocios: "",
      participacionDefinida: "",
      representanteLegal: "",
      representanteSuplente: "",
    },
    capital: {
      capitalAproximado: "",
      tipoAportes: "",
      capitalPagadoCompleto: "",
    },
    operativa: {
      tendraEmpleados: "",
      importaExporta: "",
      inversionExtranjera: "",
      operacionesExterior: "",
    },
    serviciosAdicionales: {
      seleccion: [],
      duracionRepresentacion: "",
      duracionDomicilio: "",
      inicioContable: "",
    },
    fechaEstimada: "",
    notasGenerales: "",
  };
}

/* ------------------------------- Due Diligence --------------------------------- */

export const TIPO_REVISION_DD_OPTIONS = ["Due Diligence financiero", "Due Diligence tributario", "Due Diligence financiero y tributario"];

export const PROPOSITO_DD_OPTIONS = [
  "Compra de una empresa", "Venta de una empresa", "Ingreso de un nuevo socio o inversionista",
  "Fusión o reorganización empresarial", "Solicitud de financiación", "Evaluación interna", "Otro",
];

export const OPERACION_NEGOCIACION_OPTIONS = ["Sí", "No", "Está en etapa inicial"];

export const FECHA_CIERRE_PREVISTA_OPTIONS = ["Sí", "No", "Aún no está definida"];

export const PERIODOS_DD_OPTIONS = ["Último año", "Últimos dos años", "Últimos tres años", "Más de tres años", "Aún no está definido"];

export const UNA_O_VARIAS_OPTIONS = ["Una empresa", "Varias empresas del mismo grupo", "Aún no está definido"];

export const INGRESOS_DD_OPTIONS = [
  "Sin ingresos", "Menos de $1.000 millones", "Entre $1.000 y $5.000 millones",
  "Entre $5.001 y $20.000 millones", "Entre $20.001 y $50.000 millones", "Más de $50.000 millones",
];

export const ACTIVOS_DD_OPTIONS = [
  "Menos de $1.000 millones", "Entre $1.000 y $5.000 millones",
  "Entre $5.001 y $20.000 millones", "Entre $20.001 y $50.000 millones", "Más de $50.000 millones",
];

export const EF_RECIENTES_OPTIONS = ["Sí", "No", "Parcialmente"];

export const CONCEPTOS_DD_OPTIONS = [
  "Inventarios", "Activos fijos significativos", "Operaciones en moneda extranjera", "Importaciones o exportaciones",
  "Créditos o leasing", "Inversiones", "Operaciones con vinculados económicos", "Contratos de largo plazo",
  "Varias sedes o sucursales", "Ninguno de los anteriores",
];

export const SITUACIONES_DD_OPTIONS = [
  "Procesos ante la DIAN", "Requerimientos de autoridades tributarias", "Litigios o procesos legales",
  "Deudas vencidas", "Pérdidas recurrentes", "Contabilidad atrasada", "Diferencias entre contabilidad e impuestos",
  "Sospecha de fraude", "Ninguna", "Otra",
];

export const DOC_FIELDS_DUE_DILIGENCE = [
  { key: "estadosFinancieros", label: "Últimos estados financieros (PDF o Excel)" },
  { key: "camaraComercio", label: "Certificado de Cámara de Comercio vigente (PDF)" },
];

export function emptyDueDiligence() {
  return {
    contacto: emptyContacto(),
    empresa: {
      razonSocial: "",
      nit: "",
      ciudad: "",
      actividadEconomica: "",
      descripcion: "",
    },
    tipoRevision: "",
    motivo: {
      proposito: "",
      propositoOtro: "",
      operacionEnNegociacion: "",
      fechaCierrePrevista: "",
      fechaCierreEstimada: "",
    },
    alcance: {
      periodos: "",
      incluyePeriodoActual: "",
      unaOvarias: "",
      cantidadEmpresas: "",
    },
    financiera: {
      ingresosAnuales: "",
      activosTotales: "",
      numEmpleados: "",
      estadosFinancierosRecientes: "",
      contabilidadActualizada: "",
    },
    aspectos: {
      conceptos: [],
      situacionesEspeciales: [],
      situacionesEspecialesOtra: "",
    },
    documentos: { estadosFinancierosUrl: "", estadosFinancierosNombre: "", camaraComercioUrl: "", camaraComercioNombre: "" },
    notasGenerales: "",
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
