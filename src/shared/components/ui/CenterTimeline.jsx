import Box from '@mui/material/Box';
import { Reveal } from './Section.jsx';
import { useLanguage } from '@/i18n';

const NODE = 44;
const GAP = 96; // desktop gap between the two columns; the line runs down its middle

/**
 * A vertical line down the centre with items branching left and right (desktop), or a
 * line down the left edge with every item to its right (phone / small tablet).
 *
 * `dense` staggers the two columns so each item starts halfway down its neighbour —
 * the zig-zag keeps long lists (projects) compact instead of one tall ladder.
 *
 * `renderNode(item, index)` draws what sits on the line; `renderItem(item, index, side)`
 * draws the card itself.
 */
export default function CenterTimeline({
  items,
  getKey,
  renderItem,
  renderNode,
  dense = false,
}) {
  const { isRTL } = useLanguage();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        // minmax(0, …) lets columns shrink below their content's minimum width, so a
        // card with a wide footer can never push the page sideways on a phone.
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
        columnGap: { md: `${GAP}px` },
        rowGap: { xs: 4, md: dense ? 0 : 6 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: { xs: isRTL ? 'auto' : NODE / 2 - 1, md: '50%' },
          right: { xs: isRTL ? NODE / 2 - 1 : 'auto', md: 'auto' },
          width: 2,
          transform: { md: 'translateX(-50%)' },
          borderRadius: 2,
          background:
            'linear-gradient(to bottom, transparent, var(--mui-palette-surfaces-borderStrong) 40px, var(--mui-palette-surfaces-borderStrong) calc(100% - 40px), transparent)',
        }}
      />

      {items.map((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const isLeft = side === 'left';

        // In RTL CSS grid, column 1 is physically on the right, column 2 on the left.
        const nodeLeftDesktop = isRTL
          ? isLeft
            ? `-${GAP / 2}px`
            : `calc(100% + ${GAP / 2}px)`
          : isLeft
          ? `calc(100% + ${GAP / 2}px)`
          : `-${GAP / 2}px`;

        const connectorOnLeft = isRTL ? isLeft : !isLeft;

        return (
          <Box
            key={getKey(item)}
            sx={{
              position: 'relative',
              gridColumn: { xs: '1', md: isLeft ? '1' : '2' },
              gridRow: { xs: 'auto', md: dense ? `${index + 1} / span 2` : `${index + 1}` },
              pl: { xs: isRTL ? 0 : `${NODE + 20}px`, md: 0 },
              pr: { xs: isRTL ? `${NODE + 20}px` : 0, md: 0 },
              pb: { md: dense ? 5 : 0 },
            }}
          >
            {/* The node on the line, plus a short connector reaching the card. */}
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: 28,
                left: {
                  xs: isRTL ? 'auto' : 0,
                  md: nodeLeftDesktop,
                },
                right: {
                  xs: isRTL ? 0 : 'auto',
                  md: 'auto',
                },
                transform: { md: 'translateX(-50%)' },
                width: NODE,
                height: NODE,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              {renderNode(item, index)}
            </Box>
            <Box
              aria-hidden
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'absolute',
                top: 28 + NODE / 2 - 1,
                height: 2,
                width: `${GAP / 2 - NODE / 2}px`,
                left: connectorOnLeft ? 'auto' : '100%',
                right: connectorOnLeft ? '100%' : 'auto',
                backgroundColor: 'var(--mui-palette-surfaces-borderStrong)',
              }}
            />

            <Reveal delay={isLeft ? 0 : 0.06} sx={{ height: dense ? 'auto' : '100%' }}>
              {renderItem(item, index, side)}
            </Reveal>
          </Box>
        );
      })}
    </Box>
  );
}

/** Round node used on the line: an icon, a logo or a short label. */
export function TimelineNode({ children, color, sx }) {
  return (
    <Box
      sx={{
        width: NODE,
        height: NODE,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        border: '2px solid',
        borderColor: color ?? 'primary.main',
        color: color ?? 'primary.main',
        boxShadow: '0 0 0 6px var(--section-bg, var(--mui-palette-background-default))',
        fontWeight: 700,
        fontSize: 13,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
