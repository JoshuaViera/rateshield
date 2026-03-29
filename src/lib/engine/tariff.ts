import { TariffMap } from "../types/tariff";

/**
 * Con Edison SC1 (EL1) Residential Tariff — Calibrated January 2026
 *
 * CALIBRATED AGAINST REAL CON EDISON BILL:
 *   Billing period: Dec 22, 2025 – Jan 23, 2026 (32 days)
 *   Usage: 197 kWh, Total: $88.44
 *   Supply total: $25.84, Delivery total: $62.60
 *
 * Con Edison bills show two main buckets:
 *   Supply charges: energy + merchant function charge + supply taxes
 *   Delivery charges: basic service + delivery per kWh + SBC + delivery taxes
 *
 * RateShield decomposes further to show WHERE the delivery costs go:
 *   - Distribution (local wires, transformers, substations)
 *   - Capacity (guaranteeing enough generation exists)
 *   - Transmission (high-voltage lines into NYC)
 *   - Clean Energy (CLCPA compliance, SBC, RECs)
 *
 * Source: NY PSC Case 25-E-0072, approved Jan 22, 2026
 */
export const SC1_TARIFF: TariffMap = {
  serviceClass: "SC1",
  effectiveDate: "2026-01-01",
  source: "NY PSC Case 25-E-0072, approved Jan 22, 2026; Con Edison SC1 (EL1) Rate Schedule",
  components: {
    energySupply: {
      name: "Energy Supply",
      // 11.883¢/kWh supply rate + ~0.375¢/kWh merchant function charge
      ratePerKwh: 0.1226,
      description:
        "Wholesale electricity purchased on NYISO markets, plus the merchant function charge for procurement costs. This is the only component that changes based on how much electricity you use. Your Con Edison bill shows a supply rate of 11.883¢/kWh.",
      usageDriven: true,
      source:
        "Con Edison SC1 supply rate 11.883¢/kWh + MFC; NYISO Zone J Day-Ahead LBMP, 2025 avg $74.40/MWh (NYISO White Paper, Feb 2026)",
    },
    capacity: {
      name: "Capacity & Demand",
      // Estimated portion of the 17.096¢/kWh delivery rate
      // attributable to ICAP capacity charges — ~4.5¢/kWh
      ratePerKwh: 0.0450,
      description:
        "Pays for guaranteeing enough power plants exist to meet NYC peak demand. Set by NYISO's capacity auction and allocated across all Con Edison customers. You pay this regardless of your personal usage.",
      usageDriven: false,
      source: "NYISO ICAP auction results; Con Edison Rider Q; estimated from delivery rate decomposition",
    },
    transmission: {
      name: "Transmission",
      // Estimated portion of delivery rate for bulk transmission — ~1.5¢/kWh
      ratePerKwh: 0.0150,
      description:
        "Moving bulk power from upstate generators and Canadian imports into NYC over high-voltage transmission lines. Part of your delivery charge.",
      usageDriven: false,
      source: "Con Edison SC1 Rate Schedule, Rider T; estimated from delivery rate decomposition",
    },
    distribution: {
      name: "Distribution & Delivery",
      // Remainder of the 17.096¢/kWh delivery rate after capacity (~4.5¢) and transmission (~1.5¢)
      // = ~11.1¢/kWh, plus $22.61/month basic service charge
      ratePerKwh: 0.1110,
      fixedCharge: 22.61,
      description:
        "Maintaining local wires, transformers, and substations that deliver power to your building. Includes the $22.61/month basic service charge — you pay this even with zero usage. Your Con Edison bill shows a delivery rate of 17.096¢/kWh on top of the basic charge.",
      usageDriven: false,
      source:
        "Con Edison SC1 Rate Schedule; basic service charge $22.61; delivery rate 17.096¢/kWh; 3.5% increase effective Jan 2026 (NY PSC Case 25-E-0072)",
    },
    cleanEnergy: {
      name: "Clean Energy Mandates",
      // System Benefit Charge: 0.442¢/kWh (from actual bill)
      // Plus estimated CLCPA/REC costs: ~0.5¢/kWh
      ratePerKwh: 0.0094,
      description:
        "System Benefits Charge (0.442¢/kWh on your bill) plus costs funding New York's transition to 70% renewable electricity by 2030 under the Climate Act. Includes Renewable Energy Credit procurement.",
      usageDriven: false,
      source: "Con Edison SBC rate 0.442¢/kWh; NY CLCPA compliance costs; Clean Energy Standard surcharges",
    },
    taxes: {
      name: "Taxes & Surcharges",
      // Actual from bill: $7.13 total tax on $81.31 pre-tax = 8.77%
      rate: 0.0877,
      description:
        "NYC sales tax (4.5%), Gross Receipts Tax (GRT), and other surcharges. Applied separately to both supply and delivery charges on your Con Edison bill.",
      usageDriven: false,
      source: "NYC sales tax 4.5%; NY PSC Gross Receipts Tax passthrough; computed effective rate ~8.77%",
    },
  },
};

/**
 * Con Edison SC9 Large Commercial/Institutional Tariff — Simplified
 * For future B2B tier (schools, hospitals, etc.)
 */
export const SC9_TARIFF: TariffMap = {
  serviceClass: "SC9",
  effectiveDate: "2026-01-01",
  source: "NY PSC Case 25-E-0072; Con Edison SC9 Rate Schedule",
  components: {
    energySupply: {
      name: "Energy Supply",
      ratePerKwh: 0.1050,
      description: "Wholesale electricity at large commercial rates, including procurement costs.",
      usageDriven: true,
      source: "NYISO Zone J LBMP; Con Edison SC9 supply rate",
    },
    capacity: {
      name: "Capacity & Demand",
      ratePerKwh: 0.0480,
      description: "Capacity reservation charges for large commercial accounts.",
      usageDriven: false,
      source: "NYISO ICAP; Con Edison SC9 capacity allocation",
    },
    transmission: {
      name: "Transmission",
      ratePerKwh: 0.0140,
      description: "Bulk transmission charges for commercial service.",
      usageDriven: false,
      source: "Con Edison SC9 Rate Schedule",
    },
    distribution: {
      name: "Distribution & Delivery",
      ratePerKwh: 0.0900,
      fixedCharge: 45.0,
      description: "Delivery infrastructure and monthly customer charge for large accounts.",
      usageDriven: false,
      source: "Con Edison SC9 Rate Schedule",
    },
    cleanEnergy: {
      name: "Clean Energy Mandates",
      ratePerKwh: 0.0088,
      description: "CLCPA compliance charges for commercial accounts.",
      usageDriven: false,
      source: "NY CLCPA; SBC",
    },
    taxes: {
      name: "Taxes & Surcharges",
      rate: 0.0877,
      description: "NYC/NYS sales tax, GRT, and surcharges.",
      usageDriven: false,
      source: "NYC/NYS tax rates; GRT passthrough",
    },
  },
};

export function getTariffForServiceClass(serviceClass: string): TariffMap {
  switch (serviceClass) {
    case "SC9":
      return SC9_TARIFF;
    case "SC1":
    default:
      return SC1_TARIFF;
  }
}
