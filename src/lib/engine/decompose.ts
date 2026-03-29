import { BillInput, BillComponent, BillBreakdown } from "../types/bill";
import { getTariffForServiceClass } from "./tariff";
import { daysBetween } from "../utils/format";

/**
 * Decomposes a Con Edison electricity bill into its real cost components.
 *
 * How it works:
 * 1. Loads the tariff map for the user's service class
 * 2. Calculates each component using the tariff rates × kWh usage
 * 3. Computes a scale factor to reconcile the calculated total with the actual bill
 *    (accounts for monthly adjustment clauses, riders, and seasonal variations
 *     that aren't captured in the simplified tariff rates)
 * 4. Classifies each component as controllable (usage-driven) or uncontrollable (system-driven)
 * 5. Returns the full breakdown with dollar amounts, percentages, and source citations
 */
export function decomposeBill(input: BillInput): BillBreakdown {
  const tariff = getTariffForServiceClass(input.serviceClass);
  const t = tariff.components;
  const days = daysBetween(input.billingPeriodStart, input.billingPeriodEnd);

  // Calculate raw component amounts from tariff rates
  const energySupply = input.kwhUsage * (t.energySupply.ratePerKwh || 0);
  const capacity = input.kwhUsage * (t.capacity.ratePerKwh || 0);
  const transmission = input.kwhUsage * (t.transmission.ratePerKwh || 0);
  const distribution =
    input.kwhUsage * (t.distribution.ratePerKwh || 0) +
    (t.distribution.fixedCharge || 0);
  const cleanEnergy = input.kwhUsage * (t.cleanEnergy.ratePerKwh || 0);

  const subtotal = energySupply + capacity + transmission + distribution + cleanEnergy;
  const taxes = subtotal * (t.taxes.rate || 0);
  const calculatedTotal = subtotal + taxes;

  // Scale factor reconciles our simplified tariff model with the actual bill
  // This is necessary because Con Edison's full tariff includes monthly adjustment
  // clauses, seasonal riders, and other variable charges that shift month to month
  const scaleFactor = input.totalAmount / calculatedTotal;

  // Build component array with colors for the pie chart
  const componentColors = {
    energySupply: "#2563eb", // blue — the controllable one
    capacity: "#dc2626", // red
    transmission: "#ea580c", // orange
    distribution: "#d97706", // amber
    cleanEnergy: "#059669", // emerald
    taxes: "#7c3aed", // violet
  };

  const rawComponents = [
    { key: "energySupply", raw: energySupply, canControl: true },
    { key: "capacity", raw: capacity, canControl: false },
    { key: "transmission", raw: transmission, canControl: false },
    { key: "distribution", raw: distribution, canControl: false },
    { key: "cleanEnergy", raw: cleanEnergy, canControl: false },
    { key: "taxes", raw: taxes, canControl: false },
  ];

  const components: BillComponent[] = rawComponents.map((rc) => {
    const def = t[rc.key as keyof typeof t];
    return {
      name: def.name,
      amount: rc.raw * scaleFactor,
      percent: (rc.raw / calculatedTotal) * 100,
      usageDriven: def.usageDriven,
      canControl: rc.canControl,
      description: def.description,
      source: def.source,
      color: componentColors[rc.key as keyof typeof componentColors],
    };
  });

  const controllable = components.filter((c) => c.canControl);
  const uncontrollable = components.filter((c) => !c.canControl);
  const controllableTotal = controllable.reduce((sum, c) => sum + c.amount, 0);
  const uncontrollableTotal = uncontrollable.reduce((sum, c) => sum + c.amount, 0);

  return {
    components,
    controllable,
    uncontrollable,
    controllableTotal,
    uncontrollableTotal,
    controllablePercent: (controllableTotal / input.totalAmount) * 100,
    uncontrollablePercent: (uncontrollableTotal / input.totalAmount) * 100,
    effectiveRate: input.totalAmount / input.kwhUsage,
    days,
    scaleFactor,
  };
}
