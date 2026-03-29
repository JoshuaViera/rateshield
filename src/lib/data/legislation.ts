import { LegislationItem } from "../types/tariff";

/**
 * Active NY legislation and regulatory proceedings that could affect
 * Con Edison residential electricity bills.
 *
 * All data verified as of March 2026.
 * Sources: nysenate.gov, governor.ny.gov
 */
export const ACTIVE_LEGISLATION: LegislationItem[] = [
  {
    id: "S9144",
    number: "S9144",
    title: "Data Center Moratorium Act",
    sponsor: "Sen. Liz Krueger & Sen. Kristen Gonzalez",
    introduced: "February 6, 2026",
    status: "In Committee — Environmental Conservation",
    summary:
      "Imposes a 3-year moratorium on new data center permits statewide for facilities using 20+ MW. Requires the Department of Environmental Conservation to complete a full environmental impact study and the Public Service Commission to issue orders preventing data center costs from being passed to residential customers. Described as the strongest data center moratorium bill in the country.",
    costImpact:
      "Would prevent future capacity cost increases driven by data center demand growth. As of January 2026, NYISO's interconnection queue has 48 large-load projects totaling 11+ GW of demand — this bill would pause that pipeline while protections are put in place.",
    url: "https://www.nysenate.gov/legislation/bills/2025/S9144",
  },
  {
    id: "S8540",
    number: "S8540",
    title: 'Accountability of Costs for Data Centers Act (AC/DC Act)',
    sponsor: "Sen. Kristen Gonzalez",
    introduced: "October 22, 2025",
    status: "In Committee — Rules",
    summary:
      "Requires every electric utility in New York to create a separate service classification for large energy use facilities (data centers). This means data centers would pay rates based on their actual grid costs instead of sharing infrastructure expenses with residential customers. The PSC must ensure all new service classifications are implemented by June 2030.",
    costImpact:
      "Would directly reduce the capacity and delivery charges on your bill by isolating data center grid costs into their own rate class. Currently, residential customers subsidize the infrastructure upgrades needed for data centers.",
    url: "https://www.nysenate.gov/legislation/bills/2025/S8540",
  },
  {
    id: "S6394A",
    number: "S6394A",
    title: "Sustainable Data Centers Act",
    sponsor: "Sen. Kristen Gonzalez",
    introduced: "2025 Session (Amended)",
    status: "In Committee",
    summary:
      "Establishes a data center surcharge with proceeds distributed as monthly bill credits to low- and moderate-income utility customers in host communities. Bans state tax incentives for data centers using fossil fuel power purchase agreements. Requires data centers to source 33% renewable energy by 2030, 67% by 2035, and 100% by 2040.",
    costImpact:
      "Would create direct bill credits for qualifying low- and moderate-income households funded by a surcharge on data center operators. If you're income-eligible, this could reduce your monthly bill.",
    url: "https://www.nysenate.gov/legislation/bills/2025/S6394/amendment/A",
  },
  {
    id: "HOCHUL-PSC",
    number: "Energize NY",
    title: "Gov. Hochul's PSC Proceeding on Data Center Costs",
    sponsor: "Governor Kathy Hochul",
    introduced: "February 12, 2026",
    status: "Active PSC Proceeding",
    summary:
      'The PSC launched a formal proceeding to review interconnection processes, cost-allocation mechanisms, and tariff structures for large energy users. Governor Hochul\'s directive: "These industries must pay more; if they do not, they must supply their own energy." The DPS will gather stakeholder input, host a technical conference, and prepare a white paper with recommendations.',
    costImpact:
      "Could restructure how grid upgrade costs are allocated, potentially shifting billions in infrastructure costs from residential ratepayers to the data center companies driving the demand. This is the broadest regulatory action — it could affect all five uncontrollable components on your bill.",
    url: "https://www.governor.ny.gov/news/governor-hochul-announces-psc-proceeding-her-plan-ensure-data-centers-pay-their-fair-share",
  },
];
