import { TariffMap } from "../types/tariff";

export async function loadTariffMap(
  serviceClass: string,
  billingDate: string
): Promise<TariffMap> {
  // TODO: Query tariff_maps table for the active tariff
  // on the given billing date for the given service class

  throw new Error("Tariff loader not yet implemented");
}