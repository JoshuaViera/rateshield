-- Seed data: Assistance programs for Con Edison customers
-- Run this in Supabase SQL Editor after creating the assistance_programs table

INSERT INTO public.assistance_programs (name, eligibility_summary, how_to_apply, direct_link) VALUES
(
  'HEAP (Home Energy Assistance Program)',
  'Households at or below 60% of state median income. Family of 4 in NYC: ~$67,000/year. Single adults: ~$38,000/year.',
  'Apply through local Department of Social Services or online at myBenefits.ny.gov. HEAP hotline: 1-800-342-3009.',
  'https://otda.ny.gov/programs/heap/'
),
(
  'Con Edison EnergyShare',
  'Con Edison customers behind on bills, typically income-qualified. Prioritizes households at risk of disconnection.',
  'Call Con Edison at 1-800-752-6633 and ask about EnergyShare, or visit coned.com billing assistance.',
  'https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements/help-paying-your-bill'
),
(
  'Con Edison Payment Plans',
  'Any Con Edison customer with a past-due balance. No income restrictions.',
  'Log into My Account at coned.com, or call 1-800-752-6633. Setup available online.',
  'https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements'
),
(
  'Disconnection Protections',
  'All Con Edison residential customers. Special protections for medical equipment users and hardship program enrollees.',
  'If you received a termination notice, call Con Edison at 1-800-752-6633. PSC complaint line: 1-800-342-3377.',
  'https://www.coned.com/en/accounts-billing/payment-plans-and-arrangements'
),
(
  'EmPower+ (NYSERDA)',
  'Income-eligible homeowners and renters. Generally covers households below 60% of area median income.',
  'Apply at nyserda.ny.gov/empower or call 1-866-697-3732 for a free home energy assessment.',
  'https://www.nyserda.ny.gov/All-Programs/EmPower-New-York-Program'
);
