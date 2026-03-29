import { AssistanceProgram } from "../types/tariff";

/**
 * Assistance programs available to Con Edison customers
 * who are struggling to pay their electricity bills.
 *
 * Verified as of March 2026.
 */
export const ASSISTANCE_PROGRAMS: AssistanceProgram[] = [
  {
    name: "HEAP (Home Energy Assistance Program)",
    eligibility:
      "Households at or below 60% of state median income. For a family of 4 in NYC, that's roughly $67,000/year. Single adults qualify at roughly $38,000/year.",
    benefit:
      "Up to $996 for heating/cooling costs per year. Emergency HEAP is available for shutoff prevention and broken equipment. Does not need to be repaid.",
    howToApply:
      "Apply through your local Department of Social Services or online at myBenefits.ny.gov. You can also call the HEAP hotline: 1-800-342-3009.",
    link: "https://otda.ny.gov/programs/heap/",
    urgent: true,
  },
  {
    name: "Con Edison EnergyShare",
    eligibility:
      "Con Edison customers behind on bills, typically income-qualified. Prioritizes households at risk of disconnection.",
    benefit:
      "Grants to help pay down arrears. Unlike payment plans, EnergyShare grants do not need to be repaid. Funded by voluntary contributions from other Con Edison customers.",
    howToApply:
      "Call Con Edison at 1-800-752-6633 and ask about EnergyShare, or visit coned.com and navigate to billing assistance.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements/help-paying-your-bill",
    urgent: true,
  },
  {
    name: "Con Edison Payment Plans",
    eligibility:
      "Any Con Edison customer with a past-due balance. No income restrictions.",
    benefit:
      "Spread your balance over 10–12 months with no interest through a Deferred Payment Agreement (DPA). Con Edison is required to offer a payment plan before disconnecting service.",
    howToApply:
      "Log into My Account at coned.com, or call 1-800-752-6633. You can set up a plan online in minutes.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements",
    urgent: false,
  },
  {
    name: "Disconnection Protections",
    eligibility: "All Con Edison residential customers.",
    benefit:
      "Con Edison cannot disconnect your service during extreme heat or cold (per National Weather Service forecasts), for customers enrolled in hardship programs, for households with residents who depend on medical equipment, or for customers with an active payment agreement. If you received a termination notice, you have rights.",
    howToApply:
      "If you received a termination notice, call Con Edison immediately at 1-800-752-6633 and ask about your protections. You can also contact the NY PSC complaint line at 1-800-342-3377.",
    link: "https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements",
    urgent: true,
  },
  {
    name: "EmPower+ (NYSERDA)",
    eligibility:
      "Income-eligible homeowners and renters in New York State. Income limits vary but generally cover households below 60% of area median income.",
    benefit:
      "Free energy efficiency improvements including insulation, air sealing, smart thermostats, LED lighting, and high-efficiency appliances. Can permanently reduce your monthly bill by lowering the energy supply charge.",
    howToApply:
      "Apply at nyserda.ny.gov/empower or call 1-866-697-3732. A contractor will schedule a free home energy assessment.",
    link: "https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program",
    urgent: false,
  },
];
