import { Recommendation } from "../types/bill";

/**
 * Generates actionable recommendations for the controllable portion of the bill.
 * Recommendations are personalized based on usage patterns and bill size.
 */
export function generateRecommendations(
  totalAmount: number,
  kwhUsage: number,
  days: number
): Recommendation[] {
  const dailyUsage = kwhUsage / days;
  const recs: Recommendation[] = [];

  // High usage — off-peak shifting
  if (dailyUsage > 15) {
    recs.push({
      title: "Shift heavy appliances to off-peak hours",
      detail:
        "Run your dishwasher, laundry, and dryer after 11 PM when NYISO wholesale prices are lowest. Con Edison's time-of-use rate (SC1-VTOU) could save you on supply charges. Call 1-800-752-6633 to check eligibility.",
      savings: "$8–15/mo",
      effort: "Easy",
    });
  }

  // Summer AC — the biggest controllable cost driver for most NYC apartments
  if (totalAmount > 120 && dailyUsage > 20) {
    recs.push({
      title: "Check your window AC units",
      detail:
        "Older window ACs (pre-2018) use 30–50% more electricity than Energy Star models. A 10,000 BTU unit running 8 hours/day in summer is often the single biggest controllable cost. Replacing it can save significantly during June–September.",
      savings: "$15–25/mo (summer)",
      effort: "Medium",
    });
  }

  // LED lighting — easy win
  recs.push({
    title: "Switch to LED lighting throughout",
    detail:
      "If you still have any incandescent or CFL bulbs, LEDs use 75% less energy and last 25x longer. A typical NYC apartment with 15 light fixtures saves meaningfully each month. Most hardware stores carry them for $2–3/bulb.",
    savings: "$5–8/mo",
    effort: "Easy",
  });

  // Phantom loads
  if (dailyUsage > 18) {
    recs.push({
      title: "Eliminate phantom loads with smart power strips",
      detail:
        "Electronics on standby (TV, game consoles, cable box, chargers) draw power 24/7. A smart power strip for your entertainment center and desk setup cuts phantom draw. The average NYC apartment has $3–5/month in phantom loads.",
      savings: "$3–5/mo",
      effort: "Easy",
    });
  }

  // TOU rate suggestion
  recs.push({
    title: "Ask about Con Edison's time-of-use rate",
    detail:
      "If you can shift most usage to evenings and weekends, Con Edison's voluntary TOU rate (SC1-VTOU) offers lower supply rates during off-peak hours. It's free to switch and free to switch back. Call 1-800-752-6633.",
    savings: "Varies by schedule",
    effort: "Easy",
  });

  // High bill — consider energy audit
  if (totalAmount > 200) {
    recs.push({
      title: "Request a free home energy assessment",
      detail:
        "NYSERDA's EmPower+ program provides free energy assessments and upgrades (insulation, air sealing, smart thermostats) for income-eligible households. Even if you don't qualify for free upgrades, the assessment identifies your biggest energy wasters. Call 1-866-697-3732.",
      savings: "$10–30/mo",
      effort: "Medium",
    });
  }

  return recs;
}
