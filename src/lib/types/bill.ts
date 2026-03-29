export interface BillInput {
  totalAmount: number;
  kwhUsage: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  serviceClass: "SC1" | "SC2" | "SC9";
}

export interface BillComponent {
  name: string;
  amount: number;
  percent: number;
  usageDriven: boolean;
  canControl: boolean;
  description: string;
  source: string;
  color: string;
}

export interface BillBreakdown {
  components: BillComponent[];
  controllable: BillComponent[];
  uncontrollable: BillComponent[];
  controllableTotal: number;
  uncontrollableTotal: number;
  controllablePercent: number;
  uncontrollablePercent: number;
  effectiveRate: number;
  days: number;
  scaleFactor: number;
}

export interface Recommendation {
  title: string;
  detail: string;
  savings: string;
  effort: "Easy" | "Medium" | "Hard";
}

export interface DecomposedBill {
  input: BillInput;
  breakdown: BillBreakdown;
  recommendations: Recommendation[];
}
