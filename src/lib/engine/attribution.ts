import { BillComponent } from "../types/bill";
import { KEY_STATS } from "../utils/constants";

export interface Attribution {
  component: string;
  headline: string;
  explanation: string;
  source: string;
  canControl: boolean;
}

/**
 * Builds plain-English attributions explaining why each cost component
 * is what it is, with citations to public data sources.
 */
export function buildAttributions(
  components: BillComponent[]
): Attribution[] {
  return components.map((c) => {
    let headline = "";
    let explanation = "";

    switch (c.name) {
      case "Energy Supply":
        headline = "This is the only charge that changes based on your usage.";
        explanation = `Your supply charge reflects wholesale electricity prices on the NYISO market. In 2025, the average Zone J price was $${KEY_STATS.wholesalePrice2025}/MWh — up ${KEY_STATS.wholesalePriceIncrease} from $${KEY_STATS.wholesalePrice2024}/MWh in 2024. The primary driver: natural gas prices at Transco Zone 6 surged ${KEY_STATS.gasPriceIncrease}. Using less electricity directly reduces this charge.`;
        break;

      case "Capacity & Demand":
        headline = "You pay this regardless of how much electricity you use.";
        explanation = `Capacity charges guarantee enough power plants exist to meet NYC's peak demand. These costs are set by NYISO's capacity auction and allocated across all Con Edison customers. Data center interconnection requests to NYISO nearly doubled in recent months (to 12,000+ MW), tightening supply margins and driving up these charges for everyone.`;
        break;

      case "Transmission":
        headline = "Moving bulk power into New York City.";
        explanation = `Transmission charges cover the high-voltage lines that bring electricity into NYC from upstate generators, Canadian hydropower, and regional interconnections. The Champlain Hudson Power Express (1,250 MW from Quebec) is expected online May 2026, which may help stabilize this component.`;
        break;

      case "Distribution & Delivery":
        headline = "This is the largest uncontrollable charge on most bills.";
        explanation = `Distribution covers maintaining the local wires, transformers, and substations in your neighborhood — plus a $18.37/month customer charge you pay even with zero usage. The NY PSC approved a ${KEY_STATS.rateIncrease2026} delivery increase for 2026, ${KEY_STATS.rateIncrease2027} for 2027, and ${KEY_STATS.rateIncrease2028} for 2028. Con Edison is investing $21 billion over three years in infrastructure upgrades, and those costs are passed directly to customers.`;
        break;

      case "Clean Energy Mandates":
        headline = "Funding New York's clean energy transition.";
        explanation = `These charges fund compliance with the Climate Leadership & Community Protection Act (CLCPA), which requires 70% renewable electricity by 2030 and 100% zero-emission by 2040. Includes the System Benefits Charge, Renewable Energy Credits, and offshore wind procurement costs. These are state policy decisions — not usage-based.`;
        break;

      case "Taxes & Surcharges":
        headline = "Government taxes applied to your electricity charges.";
        explanation = `Includes NYC sales tax (4.5%), NY State sales tax (4%), the Gross Receipts Tax (a utility-specific tax passed through to customers), and the MTA surcharge. These are percentage-based, so they increase automatically when other charges go up.`;
        break;

      default:
        headline = c.description;
        explanation = "";
    }

    return {
      component: c.name,
      headline,
      explanation,
      source: c.source,
      canControl: c.canControl,
    };
  });
}
