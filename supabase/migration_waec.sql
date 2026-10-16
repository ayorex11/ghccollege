-- Run once in the Supabase SQL editor (adds the WAEC results table and loads the 9 results received so far).
-- Rows hold NO names and NO exam numbers: only the year and the subject grades.
create table if not exists waec_results (id uuid primary key default gen_random_uuid(), year int not null, grades text not null);
alter table waec_results enable row level security;
create policy "read" on waec_results for select using (true);
create policy "admin" on waec_results for all to authenticated using (true) with check (true);

insert into waec_results (year, grades) values
  (2024, E'Data Processing C6\nEconomics B2\nCivic Education A1\nEnglish Language C4\nGeneral Mathematics B2\nBiology B3\nChemistry A1\nPhysics B2\nComputer Studies A1'),
  (2024, E'Data Processing A1\nChristian Religious Studies C4\nEconomics A1\nGovernment A1\nLiterature in English C6\nCivic Education A1\nEnglish Language B3\nYoruba C5\nGeneral Mathematics B2'),
  (2024, E'Data Processing A1\nEconomics B2\nCivic Education A1\nEnglish Language B3\nGeneral Mathematics A1\nBiology B2\nChemistry A1\nPhysics B2\nComputer Studies A1'),
  (2025, E'Marketing A1\nEconomics B3\nGeography C4\nCivic Education B2\nEnglish Language C4\nGeneral Mathematics B3\nBiology B3\nChemistry A1\nPhysics B2'),
  (2025, E'Data Processing B3\nEconomics C4\nCivic Education B3\nEnglish Language B3\nGeneral Mathematics B3\nBiology B2\nChemistry A1\nPhysics B2\nComputer Studies A1'),
  (2025, E'Data Processing C4\nChristian Religious Studies A1\nEconomics B3\nGovernment A1\nLiterature in English C4\nCivic Education B3\nEnglish Language C4\nYoruba D7\nGeneral Mathematics B3'),
  (2025, E'Data Processing C4\nEconomics B3\nCivic Education A1\nEnglish Language B3\nFurther Mathematics A1\nGeneral Mathematics B3\nBiology B2\nChemistry A1\nPhysics A1'),
  (2026, E'Christian Religious Studies B3\nEconomics B3\nGovernment C5\nLiterature in English C5\nCivic Education C5\nEnglish Language B3\nGeneral Mathematics B2\nBiology C4\nDigital Technologies A1'),
  (2026, E'Commerce A1\nAccounting A1\nEconomics B2\nGovernment C4\nCivic Education A1\nEnglish Language B3\nGeneral Mathematics B2\nBiology B3\nDigital Technologies A1');
