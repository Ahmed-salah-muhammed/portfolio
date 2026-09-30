// Lazy-loaded (React.lazy in ContributionsCard) so Recharts stays out of the main bundle.
import Box from '@mui/material/Box';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion.js';

const GREEN = '#2ea043';

// Same layout as GitHub's activity overview: code review on top, then clockwise
// issues, pull requests and commits. Each axis is that type's share of all contributions.
function AxisTick({ x, y, payload, textAnchor, shares }) {
  const item = shares.find((s) => s.axis === payload.value);
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="var(--mui-palette-text-secondary)" fontSize={12}>
      <tspan x={x} dy="0">
        {payload.value}
      </tspan>
      {item?.percent > 0 && (
        <tspan x={x} dy="15" fontWeight={700} fill="var(--mui-palette-text-primary)">
          {item.percent}%
        </tspan>
      )}
    </text>
  );
}

export default function ActivityRadar({ shares }) {
  const reduced = usePrefersReducedMotion();
  const summary = shares.map((s) => `${s.axis} ${s.percent}%`).join(', ');

  return (
    <Box role="img" aria-label={`Share of contributions by type: ${summary}`} sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={shares} outerRadius="72%" startAngle={90} endAngle={-270} margin={{ top: 6, right: 16, bottom: 6, left: 16 }}>
          <PolarGrid gridType="polygon" stroke="var(--mui-palette-divider)" />
          <PolarAngleAxis dataKey="axis" tick={(props) => <AxisTick {...props} shares={shares} />} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="percent"
            stroke={GREEN}
            fill={GREEN}
            fillOpacity={0.35}
            strokeWidth={2}
            dot={{ r: 3, fill: GREEN, stroke: '#fff', strokeWidth: 1 }}
            isAnimationActive={!reduced}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
}
