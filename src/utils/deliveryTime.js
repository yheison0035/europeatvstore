// Origen fijo: Itagüí, Antioquia

export const DELIVERY_RANGES = {
  // Área metropolitana (despacho rápido)
  medellin: { min: 1, max: 2 },
  itagui: { min: 1, max: 2 },
  envigado: { min: 1, max: 2 },
  sabaneta: { min: 1, max: 2 },
  bello: { min: 1, max: 2 },
  laestrella: { min: 1, max: 2 },
  copacabana: { min: 1, max: 2 },

  // Ciudades principales
  bogota: { min: 2, max: 4 },
  cali: { min: 2, max: 4 },
  barranquilla: { min: 3, max: 5 },
  cartagena: { min: 3, max: 5 },
  bucaramanga: { min: 2, max: 4 },
  cucuta: { min: 3, max: 5 },

  // Ciudades intermedias
  pereira: { min: 2, max: 4 },
  manizales: { min: 2, max: 4 },
  armenia: { min: 2, max: 4 },
  ibague: { min: 3, max: 5 },
  neiva: { min: 3, max: 5 },
  pasto: { min: 4, max: 6 },
  villavicencio: { min: 3, max: 5 },

  // Resto del país
  default: { min: 4, max: 7 },
};

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(date) {
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getEstimatedDelivery(city) {
  if (!city) return null;

  const key = city.toLowerCase();
  const range = DELIVERY_RANGES[key] || DELIVERY_RANGES.default;

  const today = new Date();
  const from = addDays(today, range.min);
  const to = addDays(today, range.max);

  return {
    from: formatDate(from),
    to: formatDate(to),
    minDays: range.min,
    maxDays: range.max,
    origin: "Itagüí, Antioquia",
  };
}
