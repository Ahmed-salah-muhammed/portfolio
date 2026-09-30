import { useState } from 'react';
import Box from '@mui/material/Box';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

/**
 * "Lite" YouTube embed: shows the video's thumbnail and only loads the player (from the
 * privacy-enhanced youtube-nocookie.com domain) after a click, so six videos on the page
 * cost six small images instead of six players.
 */
export default function YoutubePlayer({ id, title }) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault is 16:9 and sharp but missing for some videos; hqdefault always exists.
  const [thumb, setThumb] = useState('maxresdefault');

  const fallBack = () => setThumb((current) => (current === 'maxresdefault' ? 'hqdefault' : current));

  return (
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', backgroundColor: '#000' }}>
      {playing ? (
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow={IFRAME_ALLOW}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <Box
          component="button"
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          sx={{
            position: 'absolute',
            inset: 0,
            p: 0,
            border: 0,
            cursor: 'pointer',
            background: 'none',
            '&:hover .yt-play': { transform: 'scale(1.08)', backgroundColor: 'primary.main' },
            '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: -3 },
          }}
        >
          <Box
            component="img"
            src={`https://i.ytimg.com/vi/${id}/${thumb}.jpg`}
            alt=""
            loading="lazy"
            onError={fallBack}
            onLoad={(e) => e.currentTarget.naturalWidth < 400 && fallBack()}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <Box
            aria-hidden
            sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}
          >
            <Box
              className="yt-play"
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                backgroundColor: 'rgba(15, 23, 42, 0.72)',
                backdropFilter: 'blur(4px)',
                transition: 'transform .25s ease, background-color .25s ease',
              }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 36 }} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
