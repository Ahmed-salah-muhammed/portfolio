import { useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';

// GitHub's contribution graph: one column per week (Sunday first), one row per weekday.
const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LEFT = 30; // room for the Mon / Wed / Fri labels
const TOP = 20; // room for the month labels
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_LABELS = [
  [1, 'Mon'],
  [3, 'Wed'],
  [5, 'Fri'],
];

// Dates are "YYYY-MM-DD" and are read as UTC so a visitor's timezone can never shift a day.
const parseDay = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};
const longDate = (iso) =>
  parseDay(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const describe = (day) =>
  day.count === 0
    ? `No contributions on ${longDate(day.date)}`
    : `${day.count} contribution${day.count === 1 ? '' : 's'} on ${longDate(day.date)}`;

function layOut(days) {
  const weeks = [];
  let week = [];
  days.forEach((day, i) => {
    const weekday = parseDay(day.date).getUTCDay();
    if (i === 0) week = Array(weekday).fill(null); // the first week usually starts part-way through
    week.push(day);
    if (weekday === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);

  // A month is named above the week that contains its 1st; the opening column is named too
  // when it is not about to be labelled by the next month.
  const months = [];
  weeks.forEach((w, index) => {
    const first = w.find((d) => d?.date.endsWith('-01'));
    if (first) months.push({ index, label: MONTHS[Number(first.date.slice(5, 7)) - 1] });
  });
  const opening = weeks[0]?.find(Boolean);
  if (opening && (months[0]?.index ?? 99) >= 3) {
    months.unshift({ index: 0, label: MONTHS[Number(opening.date.slice(5, 7)) - 1] });
  }
  return { weeks, months };
}

// GitHub's own greens (light and dark). `theme.applyStyles` needs its `this`, so it is not destructured.
const LEVEL_COLORS = (theme) => ({
  '--gh-l0': '#ebedf0',
  '--gh-l1': '#9be9a8',
  '--gh-l2': '#40c463',
  '--gh-l3': '#30a14e',
  '--gh-l4': '#216e39',
  ...theme.applyStyles('dark', {
    '--gh-l0': '#1c2129',
    '--gh-l1': '#0e4429',
    '--gh-l2': '#006d32',
    '--gh-l3': '#26a641',
    '--gh-l4': '#39d353',
  }),
});

export default function ContributionCalendar({ days, label }) {
  const scroller = useRef(null);
  const { weeks, months } = useMemo(() => layOut(days), [days]);

  // On a narrow screen the graph scrolls sideways; start at the most recent weeks, like GitHub.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [days]);

  const width = LEFT + weeks.length * STEP - GAP;
  const height = TOP + 7 * STEP - GAP;

  return (
    <Box sx={LEVEL_COLORS}>
      <Box ref={scroller} sx={{ overflowX: 'auto', pb: 0.5 }}>
        <Box
          component="svg"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={label}
          sx={{ display: 'block', width: '100%', minWidth: 700, height: 'auto' }}
        >
          <g fontSize="9.5" fill="var(--mui-palette-text-secondary)">
            {months.map((m) => (
              <text key={`${m.label}-${m.index}`} x={LEFT + m.index * STEP} y={11}>
                {m.label}
              </text>
            ))}
            {WEEKDAY_LABELS.map(([row, text]) => (
              <text key={text} x={0} y={TOP + row * STEP + 9}>
                {text}
              </text>
            ))}
          </g>

          {weeks.map((week, w) =>
            week.map(
              (day, row) =>
                day && (
                  <rect
                    key={day.date}
                    x={LEFT + w * STEP}
                    y={TOP + row * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={`var(--gh-l${day.level})`}
                  >
                    <title>{describe(day)}</title>
                  </rect>
                ),
            ),
          )}
        </Box>
      </Box>

      <Box
        aria-hidden
        sx={{
          mt: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 0.75,
          fontSize: 12,
          color: 'text.secondary',
        }}
      >
        Less
        {[0, 1, 2, 3, 4].map((level) => (
          <Box
            key={level}
            sx={{ width: CELL, height: CELL, borderRadius: '2px', backgroundColor: `var(--gh-l${level})` }}
          />
        ))}
        More
      </Box>
    </Box>
  );
}
