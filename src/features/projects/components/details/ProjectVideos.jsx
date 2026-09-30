import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLanguage } from '@/i18n';

/**
 * Self-hosted demo clips, rendered only when the project has `videos`.
 * Adding `videos: [{ src, poster, title }]` in projects.js lights this up with no component changes.
 * The clips are short screen recordings without audio, so nothing autoplays and no sound is expected.
 */
export default function ProjectVideos({ project }) {
  const { lang, t } = useLanguage();
  const videos = project.videos ?? [];
  if (videos.length === 0) return null;

  const single = videos.length === 1;

  return (
    <Box component="section" aria-labelledby="project-demo">
      <Typography variant="h3" component="h2" id="project-demo" sx={{ mb: 3 }}>
        {single ? t('project.demoVideo', 'Demo video') : t('project.demoVideos', 'Demo videos')}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: single
            ? 'minmax(0, 1fr)'
            : { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        {videos.map((video) => {
          const videoTitle = lang === 'ar' && video.titleAr ? video.titleAr : video.title;
          return (
            <Box key={video.src} component="figure" sx={{ m: 0 }}>
              <Box
                sx={{
                  borderRadius: (tTheme) => `${tTheme.tokens.RADIUS.xl}px`,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: '#000',
                }}
              >
                <Box
                  component="video"
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload={video.poster ? 'none' : 'metadata'}
                  aria-label={videoTitle ?? `${project.title} demo`}
                  sx={{ display: 'block', width: '100%', aspectRatio: '16 / 9' }}
                />
              </Box>
              {videoTitle && (
                <Typography
                  component="figcaption"
                  variant="body2"
                  sx={{ color: 'text.secondary', mt: 1.5 }}
                >
                  {videoTitle}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
