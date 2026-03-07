import { BillInput, DecomposedBill, BillBreakdown, BillAttribution } from "../types/bill";
import { loadTariffMap } from "./tariff";
import { TariffComponent } from "../types/tariff";

// NYC tax constants (Con Edison tariff + NY Tax Law)
const GRT_SUPPLY_RATE = 0.024;   // Gross Receipts Tax on supply charges
const GRT_DELIVERY_RATE = 0.057; // GRT + revenue tax on delivery charges (NYC)
const SALES_TAX_RATE = 0.045;    // NYC + NY State combined sales tax

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function calcComponent(comp: TariffComponent, kwh: number): number {
  if (comp.ratePerKwh !== undefined) return comp.ratePerKwh * kwh;
  if (comp.fixedCharge !== undefined) return comp.fixedCharge;
  return 0;
}

function buildAttributions(
  components: TariffComponent[],
  kwh: number,
  usagePct: number,
  systemPct: number
): BillAttribution[] {
  const attributions: BillAttribution[] = [];

  for (const comp of components) {
    const amount = calcComponent(comp, kwh);
    if (amount === 0) continue;

    let explanation = "";
    if (comp.name === "Energy Supply") {
      explanation =
        `Your wholesale electricity cost is $${round2(amount).toFixed(2)} this month. ` +
        `This reflects NYISO Zone J Day-Ahead Market prices. NYC wholesale rates nearly doubled in 2025 ` +
        `($41.81 → $74.40/MWh) due to natural gas price volatility and surging data center demand.`;
    } else if (comp.name === "Merchant Function Charge") {
      explanation =
        `A $${round2(amount).toFixed(2)} fee charged by Con Edison for managing your supply contract, ` +
        `meter reading, and billing administration.`;
    } else if (comp.name === "Basic Service Charge") {
      explanation =
        `A fixed $${round2(amount).toFixed(2)}/month charge to maintain your connection to the grid. ` +
        `This applies whether you use 1 kWh or 1,000 kWh. It was increased 3.5% in the 2026 rate case.`;
    } else if (comp.name === "Delivery") {
      explanation =
        `$${round2(amount).toFixed(2)} to physically deliver electricity through Con Edison's wires ` +
        `to your home. This covers infrastructure maintenance, capital improvements, and embedded property ` +
        `taxes. NY PSC approved a 3.5% delivery increase for 2026 (Rate Case 25-E-0072).`;
    } else if (comp.name === "System Benefit Charge") {
      explanation =
        `$${round2(amount).toFixed(2)} funding NY's Clean Energy Fund — solar programs, ` +
        `efficiency incentives, and low-income energy assistance. Mandated by the Climate Leadership ` +
        `and Community Protection Act (CLCPA).`;
    } else {
      explanation = comp.description;
    }

    attributions.push({
      component: comp.name,
      explanation,
      sourceCitation:
        comp.name === "Energy Supply"
          ? "NYISO Zone J Day-Ahead Market, mis.nyiso.com"
          : "Con Edison SC1 Tariff, NY PSC Rate Case 25-E-0072",
      canControl: comp.usageDriven,
    });
  }

  // Taxes & surcharges attribution (combined)
  attributions.push({
    component: "Taxes & Surcharges",
    explanation:
      `NYC and NY State taxes including Gross Receipts Tax (2.4–5.7%) and NYC Sales Tax (4.5%). ` +
      `Con Edison customers collectively pay over $3.2 billion in embedded infrastructure taxes annually. ` +
      `These are set by law and cannot be reduced.`,
    sourceCitation: "Con Edison Tariff, NY Tax Law §186",
    canControl: false,
  });

  return attributions;
}

function buildRecommendations(usagePct: number, systemPct: number): string[] {
  const recs: string[] = [];

  if (usagePct > 0.3) {
    recs.push(
      "Your usage-driven charges are above average. Shopping for an alternative energy supplier (ESCO) via PowerYourWay.com may lower your supply rate."
    );
  }

  recs.push(
    "Shift heavy appliances (dishwasher, laundry, EV charging) to off-peak hours (before 8 AM or after 10 PM) to reduce demand charges."
  );

  if (systemPct > 0.65) {
    recs.push(
      `${Math.round(systemPct * 100)}% of your bill is driven by system charges you can't directly reduce. ` +
        "Support S9144 (Data Center Grid Cost Allocation Act) to stop large tech companies from raising your rates."
    );
  }

  recs.push(
    "If you have a past-due balance, Con Edison's EnergyShare program and Deferred Payment Agreement can help — call 1-800-752-6633."
  );

  return recs;
}

export async function decomposeBill(input: BillInput): Promise<DecomposedBill> {
  const { totalAmount, kwhUsage, billingPeriodStart, serviceClass } = input;
  const tariff = await loadTariffMap(serviceClass, billingPeriodStart);

  // ── Calculate each tariff component ──────────────────────────────────────
  let supplySubtotal = 0;   // sum of usage-driven components
  let deliverySubtotal = 0; // sum of system-driven components
  let energySupplyAmt = 0;
  let distributionAmt = 0;

  for (const comp of tariff.components) {
    const amt = calcComponent(comp, kwhUsage);
    if (comp.usageDriven) {
      supplySubtotal += amt;
      if (comp.name === "Energy Supply" || comp.name === "Merchant Function Charge") {
        energySupplyAmt += amt;
      }
    } else {
      deliverySubtotal += amt;
      if (comp.name === "Basic Service Charge" || comp.name === "Delivery") {
        distributionAmt += amt;
      }
    }
  }

  // ── GRT surcharges ───────────────────────────────────────────────────────
  const grtSupply = supplySubtotal * GRT_SUPPLY_RATE;
  const grtDelivery = deliverySubtotal * GRT_DELIVERY_RATE;

  // ── Sales tax on (subtotal + GRT) for each side ──────────────────────────
  const supplyBeforeTax = supplySubtotal + grtSupply;
  const deliveryBeforeTax = deliverySubtotal + grtDelivery;

  const salesTaxSupply = supplyBeforeTax * SALES_TAX_RATE;
  const salesTaxDelivery = deliveryBeforeTax * SALES_TAX_RATE;

  const taxesSurchargesAmt = grtSupply + grtDelivery + salesTaxSupply + salesTaxDelivery;

  // ── Theoretical totals from tariff math ─────────────────────────────────
  const theoreticalUsage = supplyBeforeTax + salesTaxSupply;
  const theoreticalSystem = deliveryBeforeTax + salesTaxDelivery;
  const theoreticalTotal = theoreticalUsage + theoreticalSystem;

  // ── Scale to user's actual bill total ───────────────────────────────────
  // The tariff-calculated total may differ from the user's actual bill
  // (credits, adjustments, demand charges, etc.). We preserve the % split
  // while matching the amount the user actually paid.
  const usagePct = theoreticalUsage / theoreticalTotal;
  const systemPct = 1 - usagePct;

  const usageDrivenTotal = round2(totalAmount * usagePct);
  const systemDrivenTotal = round2(totalAmount - usageDrivenTotal);

  const breakdown: BillBreakdown = {
    energySupply: round2(energySupplyAmt),
    capacity: 0,       // Phase 2: populated from NYISO ICAP data
    transmission: 0,   // Phase 2: populated from NYISO LBMP breakdown
    distribution: round2(distributionAmt),
    taxesSurcharges: round2(taxesSurchargesAmt),
    usageDrivenTotal,
    systemDrivenTotal,
    usageDrivenPercent: Math.round(usagePct * 100),
    systemDrivenPercent: Math.round(systemPct * 100),
  };

  const attributions = buildAttributions(tariff.components, kwhUsage, usagePct, systemPct);
  const recommendations = buildRecommendations(usagePct, systemPct);

  return { input, breakdown, attributions, recommendations };
}
