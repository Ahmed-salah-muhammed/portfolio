import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

/**
 * Self-hosted clip: shows an edge-to-edge cover poster with a prominent center play button.
 * Clicking immediately starts video playback with native controls.
 */
export default function FilePlayer({ src, poster, title }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: '16 / 9',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {playing ? (
        <Box
          component="video"
          ref={(node) => {
            videoRef.current = node;
            if (node) {
              node.play().catch(() => {});
            }
          }}
          src={src}
          controls
          autoPlay
          playsInline
          aria-label={title}
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: '#000',
          }}
        />
      ) : (
        <Box
          component="button"
          type="button"
          onClick={handlePlay}
          aria-label={`Play video: ${title}`}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            p: 0,
            border: 0,
            cursor: 'pointer',
            background: 'none',
            display: 'block',
            overflow: 'hidden',
            '&:hover .file-play-icon': {
              transform: 'scale(1.12)',
              backgroundColor: 'primary.main',
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.45)',
            },
            '&:hover img': {
              transform: 'scale(1.03)',
            },
            '&:focus-visible': {
              outline: '3px solid',
              outlineColor: 'primary.main',
              outlineOffset: -3,
            },
          }}
        >
          {poster && (
            <Box
              component="img"
              src={poster}
              alt=""
              loading="lazy"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                transition: 'transform 0.4s ease',
              }}
            />
          )}

          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              pointerEvents: 'none',
              background:
                'linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.1) 40%, rgba(15, 23, 42, 0.25) 100%)',
            }}
          >
            <Box
              className="file-play-icon"
              sx={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
                backgroundColor: 'rgba(15, 23, 42, 0.78)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                transition: 'all 0.25s ease',
              }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 40, ml: 0.5 }} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
