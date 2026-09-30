import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Tooltip from '@mui/material/Tooltip';
import { PROJECT_TYPES } from '@/data/projectTypes.js';
import { PROJECT_TYPE_COLORS } from '@/theme/tokens.js';
import { SORTS } from '../projectFilters.js';

import { useLanguage } from '@/i18n';

const TYPES = [{ key: 'all', labelKey: 'projects.all', defaultLabel: 'All' }, ...PROJECT_TYPES.map(t => ({ ...t, labelKey: `projects.${t.key}`, defaultLabel: t.label }))];

const SORT_LABELS = {
  newest: 'projects.sortNewest',
  oldest: 'projects.sortOldest',
  number: 'projects.sortNumber',
};

/**
 * Discipline filter (with live counts for the current search), search box and sort —
 * shared by the home explorer and the /projects page so they behave identically.
 */
export default function ProjectsToolbar({
  type,
  onTypeChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  counts,
  resultCount,
  total,
  view,
  onViewChange,
}) {
  const { lang, t } = useLanguage();
  const filtered = type !== 'all' || query.trim() !== '';

  return (
    <Box
      sx={{
        p: { xs: 2, md: 2.5 },
        borderRadius: (tTheme) => `${tTheme.tokens.RADIUS.lg}px`,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(_, v) => v && onTypeChange(v)}
          aria-label="Filter projects by discipline"
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            '& .MuiToggleButtonGroup-grouped': {
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '999px !important',
              ml: '0 !important',
              px: 2,
              py: 0.9,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 14,
              color: 'text.secondary',
              gap: 1,
            },
            '& .Mui-selected': {
              color: 'primary.main !important',
              borderColor: 'primary.main !important',
              backgroundColor: 'var(--mui-palette-surfaces-primarySoft) !important',
            },
          }}
        >
          {TYPES.map((item) => (
            <ToggleButton key={item.key} value={item.key} disabled={item.key !== 'all' && !counts[item.key] && type !== item.key}>
              {item.key !== 'all' && (
                <Box
                  component="span"
                  sx={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: PROJECT_TYPE_COLORS[item.key] }}
                />
              )}
              {t(item.labelKey, item.defaultLabel)}
              <Box
                component="span"
                sx={{
                  minWidth: 22,
                  px: 0.75,
                  borderRadius: 999,
                  fontSize: 12,
                  lineHeight: '20px',
                  backgroundColor: 'var(--mui-palette-surfaces-muted)',
                  color: 'text.secondary',
                }}
              >
                {counts[item.key] ?? 0}
              </Box>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box
          sx={{
            ml: { lg: 'auto' },
            display: 'flex',
            gap: 1.5,
            flexWrap: 'wrap',
            width: { xs: '100%', lg: 'auto' },
          }}
        >
          {onViewChange && (
            <ToggleButtonGroup
              value={view}
              exclusive
              size="small"
              onChange={(_, v) => v && onViewChange(v)}
              aria-label="Switch project layout"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 1.5,
                  borderColor: 'divider',
                  color: 'text.secondary',
                  borderRadius: '10px',
                },
                '& .Mui-selected': {
                  color: 'primary.main !important',
                  backgroundColor: 'var(--mui-palette-surfaces-primarySoft) !important',
                },
              }}
            >
              <ToggleButton value="timeline" aria-label="Timeline view">
                <Tooltip title={t('projects.timelineView', 'Timeline view')}>
                  <ViewTimelineOutlinedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="grid" aria-label="Grid view">
                <Tooltip title={t('projects.gridView', 'Grid view')}>
                  <GridViewRoundedIcon fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          )}

          <TextField
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t('projects.searchPlaceholder', 'Search title, tech …')}
            size="small"
            sx={{ flex: { xs: '1 1 220px', lg: '0 0 300px' } }}
            slotProps={{
              htmlInput: { 'aria-label': 'Search projects' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => onQueryChange('')} aria-label="Clear search">
                      <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />

          <TextField
            select
            size="small"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            sx={{ flex: { xs: '1 1 160px', lg: '0 0 180px' } }}
            slotProps={{ htmlInput: { 'aria-label': 'Sort projects' } }}
          >
            {SORTS.map((s) => (
              <MenuItem key={s.key} value={s.key}>
                {t(SORT_LABELS[s.key] ?? s.key, s.label)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }} aria-live="polite">
          {lang === 'ar' ? (
            <>
              عرض <strong>{resultCount}</strong> من إجمالي {total} مشاريع
            </>
          ) : (
            <>
              Showing <strong>{resultCount}</strong> of {total} projects
            </>
          )}
        </Typography>
        {filtered && (
          <Button
            size="small"
            variant="text"
            startIcon={<FilterAltOffOutlinedIcon />}
            onClick={() => {
              onTypeChange('all');
              onQueryChange('');
            }}
          >
            {t('projects.clearFilters', 'Clear filters')}
          </Button>
        )}
      </Box>
    </Box>
  );
}
