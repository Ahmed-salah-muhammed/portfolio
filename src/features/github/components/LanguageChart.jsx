// Lazy-loaded (React.lazy in LanguageBreakdown) so Recharts stays out of the main bundle.
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';

export default function LanguageChart({ slices, total }) {
  const reduced = usePrefersReducedMotion();

  return (
    <Box
      role="img"
      aria-label={`Repositories by primary language: ${slices.map((s) => `${s.name} ${s.count}`).join(', ')}`}
      sx={{ position: 'relative', width: '100%', height: '100%', minHeight: 200 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={slices}
            dataKey="count"
            nameKey="name"
            innerRadius="64%"
            outerRadius="94%"
            paddingAngle={2}
            stroke="none"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={!reduced}
          >
            {slices.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} ${value === 1 ? 'repository' : 'repositories'}`, name]}
            contentStyle={{
              background: 'var(--mui-palette-background-paper)',
              border: '1px solid var(--mui-palette-divider)',
              borderRadius: 10,
              color: 'var(--mui-palette-text-primary)',
              fontSize: 13,
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.14)',
            }}
            itemStyle={{ color: 'var(--mui-palette-text-primary)' }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* The hole of the donut. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeContent: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <Typography
          sx={{ fontFamily: (t) => t.tokens.FONTS.display, fontWeight: 800, fontSize: 30, lineHeight: 1 }}
        >
          {total}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          repositories
        </Typography>
      </Box>
    </Box>
  );
}
