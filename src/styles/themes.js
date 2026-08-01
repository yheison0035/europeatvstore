/**
 * Temas de la tienda.
 *
 * Cada empresa elige uno desde el CRM y, encima, puede sobrescribir sus
 * colores. Los valores son los mismos tokens CSS que usa toda la tienda
 * (ver theme.css), así que cambiar de tema repinta la web entera.
 */

export const THEMES = {
  clasico: {
    label: "Clásico",
    description: "Elegante y sobrio: azul marino con dorado.",
    tokens: {
      "--brand-primary": "#0b1e3b",
      "--brand-secondary": "#123a63",
      "--brand-accent": "#d4af37",

      "--bg-page": "#ffffff",
      "--bg-soft": "#f8fafc",
      "--bg-muted": "#f1f5f9",
      "--bg-dark": "#020617",

      "--text-primary": "#0b1e3b",
      "--text-secondary": "#334155",
      "--text-muted": "#64748b",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#d72638",

      "--border-soft": "#e5e7eb",
      "--border-strong": "#cbd5e1",

      "--radius-sm": "6px",
      "--radius-md": "10px",
      "--radius-lg": "16px",
      "--radius-xl": "22px",
    },
  },

  moderno: {
    label: "Moderno",
    description: "Limpio y minimalista, con acentos en azul.",
    tokens: {
      "--brand-primary": "#111827",
      "--brand-secondary": "#1f2937",
      "--brand-accent": "#2563eb",

      "--bg-page": "#ffffff",
      "--bg-soft": "#f9fafb",
      "--bg-muted": "#f3f4f6",
      "--bg-dark": "#111827",

      "--text-primary": "#111827",
      "--text-secondary": "#374151",
      "--text-muted": "#6b7280",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#2563eb",

      "--border-soft": "#e5e7eb",
      "--border-strong": "#d1d5db",

      "--radius-sm": "8px",
      "--radius-md": "14px",
      "--radius-lg": "20px",
      "--radius-xl": "28px",
    },
  },

  vibrante: {
    label: "Vibrante",
    description: "Enérgico y comercial: naranja sobre fondo oscuro.",
    tokens: {
      "--brand-primary": "#18181b",
      "--brand-secondary": "#27272a",
      "--brand-accent": "#f97316",

      "--bg-page": "#ffffff",
      "--bg-soft": "#fafaf9",
      "--bg-muted": "#f5f5f4",
      "--bg-dark": "#18181b",

      "--text-primary": "#18181b",
      "--text-secondary": "#3f3f46",
      "--text-muted": "#71717a",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#ea580c",

      "--border-soft": "#e7e5e4",
      "--border-strong": "#d6d3d1",

      "--radius-sm": "6px",
      "--radius-md": "12px",
      "--radius-lg": "18px",
      "--radius-xl": "24px",
    },
  },

  esmeralda: {
    label: "Esmeralda",
    description: "Fresco y natural: verdes con acento esmeralda.",
    tokens: {
      "--brand-primary": "#064e3b",
      "--brand-secondary": "#065f46",
      "--brand-accent": "#10b981",

      "--bg-page": "#ffffff",
      "--bg-soft": "#f0fdf4",
      "--bg-muted": "#ecfdf5",
      "--bg-dark": "#022c22",

      "--text-primary": "#064e3b",
      "--text-secondary": "#334155",
      "--text-muted": "#64748b",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#059669",

      "--border-soft": "#d1fae5",
      "--border-strong": "#a7f3d0",

      "--radius-sm": "6px",
      "--radius-md": "12px",
      "--radius-lg": "18px",
      "--radius-xl": "24px",
    },
  },

  purpura: {
    label: "Púrpura",
    description: "Elegante y premium: morados profundos.",
    tokens: {
      "--brand-primary": "#2e1065",
      "--brand-secondary": "#4c1d95",
      "--brand-accent": "#8b5cf6",

      "--bg-page": "#ffffff",
      "--bg-soft": "#faf5ff",
      "--bg-muted": "#f5f3ff",
      "--bg-dark": "#1e1b4b",

      "--text-primary": "#2e1065",
      "--text-secondary": "#3f3f46",
      "--text-muted": "#71717a",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#7c3aed",

      "--border-soft": "#ede9fe",
      "--border-strong": "#ddd6fe",

      "--radius-sm": "8px",
      "--radius-md": "14px",
      "--radius-lg": "20px",
      "--radius-xl": "28px",
    },
  },

  boutique: {
    label: "Boutique",
    description: "Moderno y femenino: rosa fucsia sobre blanco.",
    tokens: {
      "--brand-primary": "#500724",
      "--brand-secondary": "#831843",
      "--brand-accent": "#ec4899",

      "--bg-page": "#ffffff",
      "--bg-soft": "#fdf2f8",
      "--bg-muted": "#fce7f3",
      "--bg-dark": "#500724",

      "--text-primary": "#500724",
      "--text-secondary": "#3f3f46",
      "--text-muted": "#71717a",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#db2777",

      "--border-soft": "#fce7f3",
      "--border-strong": "#fbcfe8",

      "--radius-sm": "8px",
      "--radius-md": "16px",
      "--radius-lg": "22px",
      "--radius-xl": "30px",
    },
  },

  oceano: {
    label: "Océano",
    description: "Limpio y confiable: turquesa y azul océano.",
    tokens: {
      "--brand-primary": "#083344",
      "--brand-secondary": "#155e75",
      "--brand-accent": "#06b6d4",

      "--bg-page": "#ffffff",
      "--bg-soft": "#ecfeff",
      "--bg-muted": "#cffafe",
      "--bg-dark": "#083344",

      "--text-primary": "#083344",
      "--text-secondary": "#334155",
      "--text-muted": "#64748b",
      "--text-inverted": "#ffffff",

      "--cta-primary": "#0891b2",

      "--border-soft": "#cffafe",
      "--border-strong": "#a5f3fc",

      "--radius-sm": "6px",
      "--radius-md": "12px",
      "--radius-lg": "18px",
      "--radius-xl": "24px",
    },
  },
};

export const DEFAULT_THEME = "clasico";

export function getTheme(name) {
  return THEMES[name] || THEMES[DEFAULT_THEME];
}

/**
 * Construye el CSS de :root con el tema elegido y los colores propios de la
 * empresa por encima. Lo que la empresa no configure queda con el tema.
 */
export function buildThemeCss(company) {
  const theme = getTheme(company?.theme);

  const tokens = { ...theme.tokens };

  if (company?.primaryColor) tokens["--brand-primary"] = company.primaryColor;
  if (company?.secondaryColor)
    tokens["--brand-secondary"] = company.secondaryColor;
  if (company?.accentColor) tokens["--brand-accent"] = company.accentColor;
  if (company?.ctaColor) tokens["--cta-primary"] = company.ctaColor;

  // Derivados: se recalculan siempre para que no queden colgados del tema base.
  tokens["--bg-brand"] = tokens["--brand-primary"];

  // Las zonas oscuras (footer y aviso de cookies) toman el color principal,
  // el mismo del menú, para que la tienda se vea de una sola pieza cuando la
  // empresa cambia su color.
  tokens["--bg-dark"] = tokens["--brand-primary"];

  tokens["--text-accent"] = tokens["--brand-accent"];
  tokens["--cta-secondary"] = tokens["--brand-accent"];
  tokens["--cta-primary-hover"] =
    `color-mix(in srgb, ${tokens["--cta-primary"]} 85%, #000)`;
  tokens["--cta-secondary-hover"] =
    `color-mix(in srgb, ${tokens["--brand-accent"]} 85%, #000)`;

  tokens["--category-icon-bg"] =
    `color-mix(in srgb, ${tokens["--brand-primary"]} 8%, transparent)`;
  tokens["--category-icon-bg-hover"] =
    `color-mix(in srgb, ${tokens["--brand-accent"]} 20%, transparent)`;
  tokens["--category-icon-color"] = tokens["--brand-primary"];
  tokens["--category-icon-color-hover"] = tokens["--brand-accent"];
  tokens["--category-title-color"] = tokens["--text-primary"];
  tokens["--category-link-color"] = tokens["--brand-accent"];

  const declarations = Object.entries(tokens)
    .map(([key, value]) => `${key}:${value};`)
    .join("");

  // `:root:root` sube la especificidad para ganarle siempre a theme.css,
  // sin depender del orden en que Next inyecte los estilos.
  return `:root:root{${declarations}}`;
}
