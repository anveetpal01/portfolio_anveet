/**
 * Shared lookup: given a tag/badge string from a project's techStack or tags,
 * find the URL of the dedicated page that documents it.
 *
 *   1. techs[]   → /tech/<slug>    (project-tech registry — preferred)
 *   2. skills[]  → /skill/<slug>   (homepage skills)
 *   3. null                         (no match — caller renders a static span)
 *
 * Matching is case-insensitive and uses both `name` and `aliases`. An exact
 * normalized match wins; otherwise a substring match in either direction is
 * accepted, so e.g. "TensorRT (FP16)" hits the `tensorrt` alias.
 */

import { skills, techs, type Skill, type Tech } from "@/lib/content";

export type LookupHit = {
  href: string;
  kind: "tech" | "skill";
  matched: Tech | Skill;
};

type Index = { needle: string; entry: Tech | Skill }[];

const norm = (s: string) => s.toLowerCase().trim();

function indexOf(list: (Tech | Skill)[]): Index {
  const out: Index = [];
  for (const entry of list) {
    out.push({ needle: norm(entry.name), entry });
    for (const a of entry.aliases ?? []) {
      out.push({ needle: norm(a), entry });
    }
  }
  return out;
}

// Built once at module load (pure data → safe in server components).
const techIndex = indexOf(techs);
const skillIndex = indexOf(skills);

function search(index: Index, tag: string): Tech | Skill | null {
  const t = norm(tag);
  // 1. exact match
  const exact = index.find((e) => e.needle === t);
  if (exact) return exact.entry;
  // 2. substring either direction (gentle fallback)
  const partial = index.find(
    (e) => t.includes(e.needle) || e.needle.includes(t),
  );
  return partial?.entry ?? null;
}

export function findTechOrSkill(tag: string): LookupHit | null {
  const tech = search(techIndex, tag);
  if (tech) return { href: `/tech/${tech.slug}`, kind: "tech", matched: tech };
  const skill = search(skillIndex, tag);
  if (skill) return { href: `/skill/${skill.slug}`, kind: "skill", matched: skill };
  return null;
}
