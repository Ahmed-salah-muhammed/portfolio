import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { getPublishedProjects } from '@/data/projects.js';
import { PROJECT_TYPES } from '@/data/projectTypes.js';
import { Reveal } from '@/shared/components/ui';
import useDebounce from '@/hooks/useDebounce.js';
import { useLanguage } from '@/i18n';
import { filterProjects, countByType, SORTS } from '../projectFilters.js';
import ProjectsToolbar from '../components/ProjectsToolbar.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

const PER_PAGE = 9;
const TYPE_KEYS = new Set(['all', ...PROJECT_TYPES.map((t) => t.key)]);
const SORT_KEYS = new Set(SORTS.map((s) => s.key));

/**
 * Grid view of every published project. Filter, search, sort and page all live in the
 * URL (?type=gis&q=arcpy&sort=oldest&page=2) so any view can be shared and survives
 * the back button.
 */
export default function ProjectsPage() {
  const { lang, t } = useLanguage();
  const [params, setParams] = useSearchParams();

  const type = TYPE_KEYS.has(params.get('type')) ? params.get('type') : 'all';
  const sort = SORT_KEYS.has(params.get('sort')) ? params.get('sort') : 'newest';
  const queryParam = params.get('q') ?? '';
  const pageParam = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1);

  // Typing is instant; the URL only catches up once typing pauses.
  const [input, setInput] = useState(queryParam);
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    document.title =
      lang === 'ar'
        ? 'المشاريع — أحمد صلاح محمد'
        : 'Projects — Ahmed Salah Muhammed';
  }, [lang]);

  // Writes one or more params, dropping defaults so URLs stay short.
  const update = (changes, { replace = false } = {}) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([k, v]) => {
      const isDefault =
        v === '' || v == null || (k === 'type' && v === 'all') || (k === 'sort' && v === 'newest') || (k === 'page' && v === 1);
      if (isDefault) next.delete(k);
      else next.set(k, String(v));
    });
    setParams(next, { replace });
  };

  useEffect(() => {
    if (debouncedInput === queryParam) return;
    const next = new URLSearchParams(params);
    if (debouncedInput) next.set('q', debouncedInput);
    else next.delete('q');
    next.delete('page');
    // `replace` keeps every keystroke out of the browser history.
    setParams(next, { replace: true });
  }, [debouncedInput, queryParam, params, setParams]);

  const results = useMemo(
    () => filterProjects({ type, query: queryParam, sort }),
    [type, queryParam, sort],
  );
  const counts = useMemo(() => countByType(queryParam), [queryParam]);

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const page = Math.min(pageParam, pageCount);
  const visible = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const total = getPublishedProjects().length;

  return (
    <>
      <Box
        component="section"
        sx={{
          pt: { xs: 7, md: 10 },
          pb: { xs: 5, md: 7 },
          backgroundColor: 'var(--mui-palette-surfaces-alt)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container>
          <Typography variant="h1" component="h1" sx={{ fontSize: { xs: 36, md: 52 } }}>
            {t('projects.allProjectsHeading', 'All projects')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, mb: 5, maxWidth: 680 }}>
            {lang === 'ar'
              ? `${total} مشروعاً منشوراً في مجالات التطوير الشامل، نظم الـ GIS، والذكاء الاصطناعي.`
              : `${total} published projects across full-stack development, GIS and AI.`}
          </Typography>

          <ProjectsToolbar
            type={type}
            onTypeChange={(v) => update({ type: v, page: 1 })}
            query={input}
            onQueryChange={(v) => {
              setInput(v);
              if (v === '') update({ q: '', page: 1 }, { replace: true });
            }}
            sort={sort}
            onSortChange={(v) => update({ sort: v, page: 1 })}
            counts={counts}
            resultCount={results.length}
            total={total}
          />
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 } }}>
        <Container>
          {visible.length === 0 ? (
            <Box sx={{ py: 10, textAlign: 'center' }}>
              <Typography variant="h3" component="p" sx={{ mb: 1 }}>
                {t('projects.noMatches', 'No projects match that search')}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('projects.noMatchesDesc', 'Try another keyword or switch the discipline back to “All”.')}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 3, md: 4 },
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                  lg: 'repeat(3, minmax(0, 1fr))',
                },
              }}
            >
              {visible.map((project, i) => (
                <Reveal key={project.id} delay={(i % 3) * 0.06} sx={{ height: '100%' }}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </Box>
          )}

          {pageCount > 1 && (
            <Box sx={{ mt: { xs: 6, md: 8 }, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, next) => {
                  update({ page: next });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                color="primary"
                shape="rounded"
                size="large"
              />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
