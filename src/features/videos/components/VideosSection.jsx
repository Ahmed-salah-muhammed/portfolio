import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getVideos } from '@/data/videos.js';
import { Section, Reveal, Card } from '@/shared/components/ui';
import { useLanguage } from '@/i18n';
import YoutubePlayer from './YoutubePlayer.jsx';
import FilePlayer from './FilePlayer.jsx';

function Player({ video }) {
  return video.kind === 'youtube' ? (
    <YoutubePlayer id={video.id} title={video.title} />
  ) : (
    <FilePlayer src={video.src} poster={video.poster} title={video.title} />
  );
}

// dir="auto": some titles are Arabic and must align/flow right-to-left on their own.
function VideoText({ video, large = false }) {
  const { lang } = useLanguage();
  const title = lang === 'ar' && video.titleAr ? video.titleAr : video.title;
  const description = lang === 'ar' && video.descriptionAr ? video.descriptionAr : video.description;

  return (
    <Box sx={{ p: large ? { xs: 1, md: 1.5 } : { xs: 2.5, md: 3 }, alignSelf: 'center' }}>
      <Typography
        variant="h3"
        component="h3"
        dir="auto"
        sx={{ fontSize: large ? { xs: 20, md: 24 } : 18, lineHeight: 1.4 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" dir="auto" sx={{ color: 'text.secondary', mt: 1.25 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

export default function VideosSection() {
  const { t } = useLanguage();
  const videos = getVideos();

  // Nothing to show: hidden for visitors, a hint for Ahmed while developing.
  if (videos.length === 0) {
    if (!import.meta.env.DEV) return null;
    return (
      <Section id="videos" title={t('videos.title', 'Videos')} subtitle="Dev preview — this section is hidden in production until videos are added.">
        <Card sx={{ textAlign: 'center', borderStyle: 'dashed', boxShadow: 'none' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Add YouTube links or self-hosted clips to <strong>src/data/videos.js</strong> and they appear here, with a nav link.
          </Typography>
        </Card>
      </Section>
    );
  }

  return (
    <Section
      id="videos"
      title={t('videos.title', 'Videos')}
      subtitle={t(
        'videos.subtitle',
        'Tutorials, walkthroughs and project demos on GIS, ArcGIS, remote sensing and 3D city modelling.',
      )}
    >
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 3, md: 4 },
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {videos.map((video, i) => (
          <Reveal
            key={video.key}
            delay={video.featured ? 0 : (i % 3) * 0.06}
            sx={{ height: '100%', gridColumn: video.featured ? '1 / -1' : 'auto' }}
          >
            <Card
              interactive
              sx={{
                p: video.featured ? { xs: 2, md: 3 } : 0,
                overflow: 'hidden',
                ...(video.featured && {
                  display: { md: 'grid' },
                  gridTemplateColumns: { md: 'minmax(0, 480px) minmax(0, 1fr)' },
                  alignItems: 'center',
                  gap: { xs: 2.5, md: 4 },
                }),
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  borderRadius: video.featured ? '14px' : 0,
                  overflow: 'hidden',
                  boxShadow: video.featured ? '0 4px 18px rgba(0, 0, 0, 0.12)' : 'none',
                }}
              >
                <Player video={video} />
              </Box>
              <VideoText video={video} large={video.featured} />
            </Card>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}
