import { BillInput, DecomposedBill } from "../types/bill";

export async function decomposeBill(input: BillInput): Promise<DecomposedBill> {
  // TODO: Implement full decomposition logic
  // 1. Load tariff map for input.serviceClass and billing period
  // 2. Pull NYISO prices for billing period
  // 3. Calculate each component
  // 4. Classify usage-driven vs system-driven
  // 5. Generate attributions
  // 6. Generate recommendations

  throw new Error("Decomposition engine not yet implemented");
}