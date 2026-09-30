// The three disciplines projects are grouped by — used by the project filters, the
// cards and the map symbology. Full-stack leads, GIS is the specialism.
export const PROJECT_TYPES = [
  { key: 'fullstack', label: 'Full-Stack' },
  { key: 'gis', label: 'GIS' },
  { key: 'ai', label: 'AI' },
];

const TYPE_KEYS = new Set(PROJECT_TYPES.map((t) => t.key));

/**
 * A project's discipline, derived from its categories unless the data sets an explicit
 * `projectType` ('fullstack' | 'gis' | 'ai'):
 *   AI listed first            → ai
 *   both Web and Backend       → fullstack
 *   Web or Backend listed first→ fullstack
 *   anything else              → gis
 */
export const getProjectType = (project) => {
  if (TYPE_KEYS.has(project.projectType)) return project.projectType;
  const [first] = project.category ?? [];
  if (first === 'AI') return 'ai';
  if (project.category?.includes('Web') && project.category?.includes('Backend')) return 'fullstack';
  if (first === 'Web' || first === 'Backend') return 'fullstack';
  return 'gis';
};

export const getProjectTypeLabel = (key) => PROJECT_TYPES.find((t) => t.key === key)?.label ?? key;
