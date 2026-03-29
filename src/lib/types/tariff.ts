export interface TariffComponentDef {
  name: string;
  ratePerKwh?: number;
  fixedCharge?: number;
  rate?: number; // for percentage-based (taxes)
  description: string;
  usageDriven: boolean;
  source: string;
}

export interface TariffMap {
  serviceClass: string;
  effectiveDate: string;
  source: string;
  components: Record<string, TariffComponentDef>;
}

export interface LegislationItem {
  id: string;
  number: string;
  title: string;
  sponsor: string;
  introduced: string;
  status: string;
  summary: string;
  costImpact: string;
  url: string;
}

export interface AssistanceProgram {
  name: string;
  eligibility: string;
  benefit: string;
  howToApply: string;
  link: string;
  urgent: boolean;
}
