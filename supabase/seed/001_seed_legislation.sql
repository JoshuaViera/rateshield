-- Seed data: Active NY legislation affecting Con Edison bills
-- Run this in Supabase SQL Editor after creating the legislation table

INSERT INTO public.legislation (bill_number, title, summary, status, sponsor, potential_cost_impact, source_url) VALUES
(
  'S9144',
  'Data Center Moratorium Act',
  'Imposes a 3-year moratorium on new data center permits statewide for facilities using 20+ MW. Requires the DEC to complete a full environmental impact study and the PSC to issue orders preventing data center costs from being passed to residential customers.',
  'In Committee — Environmental Conservation',
  'Sen. Liz Krueger & Sen. Kristen Gonzalez',
  'Would prevent future capacity cost increases driven by data center demand growth. NYISO interconnection queue has 48 projects totaling 11+ GW.',
  'https://www.nysenate.gov/legislation/bills/2025/S9144'
),
(
  'S8540',
  'Accountability of Costs for Data Centers Act (AC/DC Act)',
  'Requires utilities to create a separate service classification for large energy use facilities. Data centers would pay rates based on actual grid costs instead of sharing expenses with residential customers.',
  'In Committee — Rules',
  'Sen. Kristen Gonzalez',
  'Would directly reduce capacity and delivery charges on residential bills by isolating data center infrastructure costs.',
  'https://www.nysenate.gov/legislation/bills/2025/S8540'
),
(
  'S6394A',
  'Sustainable Data Centers Act',
  'Establishes a data center surcharge with proceeds distributed as monthly bill credits to low- and moderate-income utility customers. Bans fossil fuel incentives for data centers. Requires 100% renewable energy by 2040.',
  'In Committee',
  'Sen. Kristen Gonzalez',
  'Would create direct bill credits for qualifying low/moderate-income households funded by data center surcharges.',
  'https://www.nysenate.gov/legislation/bills/2025/S6394/amendment/A'
),
(
  'Energize NY',
  'Governor Hochul PSC Proceeding on Data Center Costs',
  'PSC proceeding to review interconnection processes, cost-allocation mechanisms, and tariff structures for large energy users. Goal: ensure data centers pay their own grid upgrade costs.',
  'Active PSC Proceeding',
  'Governor Kathy Hochul',
  'Could restructure how grid upgrade costs are allocated, potentially shifting billions from residential ratepayers to data center companies.',
  'https://www.governor.ny.gov/news/governor-hochul-announces-psc-proceeding-her-plan-ensure-data-centers-pay-their-fair-share'
);
