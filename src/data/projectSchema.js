import { z } from 'zod';
import { PROJECTS, PROJECT_CATEGORIES } from './projects.js';

// The blueprint every project object must satisfy. Adding a project means adding one
// object to PROJECTS — this schema is what stops a typo from silently breaking a page.

const isHttpUrl = (v) => /^https?:\/\//i.test(v);
const urlField = z.string().refine(isHttpUrl, 'must be an http(s) URL').nullable().optional();

const categoryValues = PROJECT_CATEGORIES.filter((c) => c !== 'All');

export const linksSchema = z.object({
  live: urlField,
  code: urlField,
  codeBackend: urlField,
  storymap: urlField,
  video: urlField,
});

export const metricSchema = z.object({
  label: z.string().min(1),
  value: z.union([z.string(), z.number()]),
  verified: z.boolean(),
});

// Self-hosted demo clip: `src` is an mp4 under /videos/projects/{slug}/, `poster` a webp still.
export const videoSchema = z.object({
  src: z.string().min(1),
  poster: z.string().optional(),
  title: z.string().optional(),
});

export const locationSchema = z
  .object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    label: z.string().min(1),
  })
  .nullable();

export const projectSchema = z.object({
  id: z.number().int().positive(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'must be kebab-case'),
  title: z.string().min(1),
  category: z.array(z.enum(categoryValues)),
  type: z.string().optional(),
  projectType: z.enum(['fullstack', 'gis', 'ai']).optional(),
  client: z.string().optional(),
  period: z.string().optional(),
  summary: z.string().min(1),
  description: z.string(),
  problem: z.string(),
  approach: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  image: z.string().nullable(),
  gallery: z.array(z.string()),
  videos: z.array(videoSchema).optional(),
  links: linksSchema,
  location: locationSchema,
  metrics: z.array(metricSchema),
  verified: z.boolean(),
  featured: z.boolean(),
  featuredRank: z.number().int().positive().optional(),
  published: z.boolean(),
  year: z.number().int().nullable(),
});

/**
 * Dev-only guard. Logs the project number and the exact field that is wrong,
 * plus duplicate ids/slugs, which the per-object schema cannot catch.
 */
export function validateProjects(projects = PROJECTS) {
  const problems = [];

  projects.forEach((project) => {
    const result = projectSchema.safeParse(project);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        problems.push(
          `Project ${project.id ?? '??'} (${project.slug ?? 'no slug'}) → ${issue.path.join('.')}: ${issue.message}`,
        );
      });
    }
  });

  const seen = { id: new Map(), slug: new Map() };
  projects.forEach((p) => {
    ['id', 'slug'].forEach((key) => {
      if (seen[key].has(p[key])) {
        problems.push(`Duplicate ${key} "${p[key]}" on projects ${seen[key].get(p[key])} and ${p.id}`);
      } else {
        seen[key].set(p[key], p.id);
      }
    });
  });

  if (problems.length) {
    console.error(
      `[projects.js] ${problems.length} blueprint problem(s):\n` + problems.join('\n'),
    );
  }

  return problems;
}

export default projectSchema;
