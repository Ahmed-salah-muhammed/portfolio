import { useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { getPublishedProjects, formatProjectNumber } from '@/data/projects.js';
import { getProjectType } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { Section, CenterTimeline, TimelineNode, Reveal } from '@/shared/components/ui';
import useDebounce from '@/hooks/useDebounce.js';
import { useLanguage } from '@/i18n';
import { filterProjects, countByType } from '../projectFilters.js';
import ProjectsToolbar from './ProjectsToolbar.jsx';
import ProjectCard from './ProjectCard.jsx';

// Three at a time keeps the section short; the rest are one page-click away.
const PER_PAGE = 3;

/**
 * The home-page Projects section: discipline filter, search, sort, a Timeline/Grid
 * switch and pagination. Timeline puts projects on a centre line branching left and
 * right; Grid lays the same page out as a row of cards.
 */
export default function ProjectsExplorer() {
  const { t, language } = useLanguage();
  const [type, setType] = useState('all');
  const [input, setInput] = useState('');
  const [sort, setSort] = useState('newest');
  const [view, setView] = useState('timeline');
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  const query = useDebounce(input, 250);
  const total = getPublishedProjects().length;

  const results = useMemo(() => filterProjects({ type, query, sort }), [type, query, sort]);
  const counts = useMemo(() => countByType(query), [query]);

  const pageCount = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  // Any change to what is being filtered starts again from page 1.
  const resetting = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const goToPage = (_, next) => {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderNode = (project) => (
    <TimelineNode color={PROJECT_TYPE_COLORS[getProjectType(project)]} sx={{ fontSize: 13.5 }}>
      {formatProjectNumber(project.id)}
    </TimelineNode>
  );

  return (
    <Section
      id="projects"
      title={t('projects.title', 'Projects')}
      subtitle={t(
        'projects.subtitle',
        'Full-stack apps, WebGIS platforms and AI tools for GIS — filter by discipline, search by technology, or open any project for the full case study.',
      )}
    >
      <Box ref={topRef} sx={{ scrollMarginTop: 120 }}>
        <ProjectsToolbar
          type={type}
          onTypeChange={resetting(setType)}
          query={input}
          onQueryChange={resetting(setInput)}
          sort={sort}
          onSortChange={resetting(setSort)}
          view={view}
          onViewChange={setView}
          counts={counts}
          resultCount={results.length}
          total={total}
        />
      </Box>

      <Box sx={{ mt: { xs: 5, md: 7 } }}>
        {visible.length === 0 && (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <Typography variant="h3" component="p" sx={{ mb: 1 }}>
              {t('projects.noMatches', 'No projects match that search')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('projects.noMatchesDesc', 'Try another keyword or switch the discipline back to “All”.')}
            </Typography>
          </Box>
        )}

        {visible.length > 0 && view === 'timeline' && (
          <CenterTimeline
            key={`${type}-${query}-${sort}-${currentPage}`}
            items={visible}
            dense
            getKey={(project) => project.id}
            renderNode={renderNode}
            renderItem={(project) => <ProjectCard project={project} variant="timeline" />}
          />
        )}

        {visible.length > 0 && view === 'grid' && (
          <Box
            key={`${type}-${query}-${sort}-${currentPage}`}
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
              <Reveal key={project.id} delay={i * 0.06} sx={{ height: '100%' }}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </Box>
        )}
      </Box>

      {pageCount > 1 && (
        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={goToPage}
            color="primary"
            shape="rounded"
            size="large"
            siblingCount={1}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {language === 'ar'
              ? `صفحة ${currentPage} من ${pageCount}`
              : `Page ${currentPage} of ${pageCount}`}
          </Typography>
        </Box>
      )}
    </Section>
  );
}
