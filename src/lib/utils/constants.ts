export const NYISO_ZONE_J = "ZONE_J";
export const SERVICE_CLASSES = ["SC1", "SC2", "SC9"] as const;
export const DEFAULT_SERVICE_CLASS = "SC1";
export const APP_NAME = "RateShield";

export const CON_EDISON_PHONE = "1-800-752-6633";

// Key data points cited throughout the app — all verified against public sources
export const KEY_STATS = {
  wholesalePrice2025: 74.40, // $/MWh — NYISO 2025 average
  wholesalePrice2024: 41.81, // $/MWh — NYISO 2024 average
  wholesalePriceIncrease: "78%",
  gasPrice2025: 4.64, // $/MMBtu Transco Zone 6 avg
  gasPrice2024: 2.10, // $/MMBtu Transco Zone 6 avg
  gasPriceIncrease: "120%",
  rateIncrease2026: "3.5%",
  rateIncrease2027: "3.2%",
  rateIncrease2028: "3.1%",
  disconnectionsH12025: 88000,
  customersInArrears: 564520,
  arrearsTotal: "$1.49 billion",
  reliabilityShortfall: "410–650 MW",
  conEdCustomers: "3.4 million",
  typicalControllablePercent: 24,
  typicalUncontrollablePercent: 76,
} as const;
