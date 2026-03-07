import { TariffMap, TariffComponent } from "../types/tariff";

// Hardcoded fallback tariff rates (Con Edison 2025, NY PSC Rate Case 25-E-0072)
// Used when Supabase is not configured or seed data hasn't been run yet.
const FALLBACK_TARIFFS: Record<string, TariffComponent[]> = {
  SC1: [
    { name: "Energy Supply", ratePerKwh: 0.11649, description: "Wholesale electricity commodity cost (NYISO Zone J market rate)", usageDriven: true },
    { name: "Merchant Function Charge", ratePerKwh: 0.00196, description: "Con Edison supply procurement fee", usageDriven: true },
    { name: "Basic Service Charge", fixedCharge: 20.91, description: "Fixed monthly charge for maintaining grid connection", usageDriven: false },
    { name: "Delivery", ratePerKwh: 0.17917, description: "Regulated charge for transmitting electricity to your home", usageDriven: false },
    { name: "System Benefit Charge", ratePerKwh: 0.00678, description: "NY State Clean Energy Fund", usageDriven: false },
  ],
  SC2: [
    { name: "Energy Supply", ratePerKwh: 0.11649, description: "Wholesale electricity commodity cost (NYISO Zone J market rate)", usageDriven: true },
    { name: "Merchant Function Charge", ratePerKwh: 0.00196, description: "Con Edison supply procurement fee", usageDriven: true },
    { name: "Basic Service Charge", fixedCharge: 35.00, description: "Fixed monthly charge for small commercial service", usageDriven: false },
    { name: "Delivery", ratePerKwh: 0.16450, description: "Regulated charge for transmitting electricity to your business", usageDriven: false },
    { name: "System Benefit Charge", ratePerKwh: 0.00678, description: "NY State Clean Energy Fund", usageDriven: false },
  ],
  SC9: [
    { name: "Energy Supply", ratePerKwh: 0.11649, description: "Wholesale electricity commodity cost (NYISO Zone J market rate)", usageDriven: true },
    { name: "Merchant Function Charge", ratePerKwh: 0.00196, description: "Con Edison supply procurement fee", usageDriven: true },
    { name: "Basic Service Charge", fixedCharge: 150.00, description: "Fixed monthly charge for large commercial service", usageDriven: false },
    { name: "Delivery", ratePerKwh: 0.13200, description: "Regulated delivery charge for high-volume users", usageDriven: false },
    { name: "System Benefit Charge", ratePerKwh: 0.00678, description: "NY State Clean Energy Fund", usageDriven: false },
  ],
};

export async function loadTariffMap(
  serviceClass: string,
  billingDate: string
): Promise<TariffMap> {
  // Use Supabase if credentials are configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const { createClient } = await import("../supabase/server");
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("tariff_maps")
        .select("*")
        .eq("service_class", serviceClass)
        .lte("effective_date", billingDate)
        .order("effective_date", { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        const raw = data.components as { components: TariffComponent[] };
        return {
          serviceClass: data.service_class,
          effectiveDate: data.effective_date,
          components: raw.components,
          sourceCitation: data.source_citation ?? "",
        };
      }
    } catch {
      // Fall through to hardcoded fallback
    }
  }

  // Fallback: use hardcoded rates
  const components = FALLBACK_TARIFFS[serviceClass] ?? FALLBACK_TARIFFS["SC1"];
  return {
    serviceClass,
    effectiveDate: "2025-01-01",
    components,
    sourceCitation: "Con Edison SC1 Tariff, NY PSC Rate Case 25-E-0072",
  };
}
