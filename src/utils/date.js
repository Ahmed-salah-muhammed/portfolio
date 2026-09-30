const MONTHS_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

/** "2025-10" → "Oct 2025" or "أكتوبر 2025". Returns null for anything unparseable. */
export const formatMonth = (value, lang = 'en') => {
  if (typeof value !== 'string') return null;
  const [year, month] = value.split('-');
  const index = Number(month) - 1;
  const months = lang === 'ar' ? MONTHS_AR : MONTHS_EN;
  if (!year || Number.isNaN(index) || !months[index]) return year ?? null;
  return `${months[index]} ${year}`;
};

/** "2025-01" + "2025-10" → "Jan 2025 → Oct 2025" (or "→ Present" / "→ حتى الآن" when open-ended). */
export const formatRange = (start, end, lang = 'en') => {
  const from = formatMonth(start, lang);
  const presentText = lang === 'ar' ? 'حتى الآن' : 'Present';
  const to = end ? formatMonth(end, lang) : presentText;
  if (!from) return to ?? null;
  const arrow = lang === 'ar' ? '←' : '→';
  return `${from} ${arrow} ${to}`;
};

const RELATIVE_UNITS = [
  ['year', 31_536_000],
  ['month', 2_592_000],
  ['week', 604_800],
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

/** ISO timestamp → "3 days ago" / "last month" / "just now" (or Arabic equivalent). Null when unparseable. */
export const formatRelative = (iso, now = Date.now(), lang = 'en') => {
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return null;

  const seconds = Math.round((time - now) / 1000);
  const rtf = new Intl.RelativeTimeFormat(lang === 'ar' ? 'ar' : 'en', { numeric: 'auto' });
  for (const [unit, size] of RELATIVE_UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return lang === 'ar' ? 'الآن' : 'just now';
};

/** Sort key for merging experience and education onto one timeline. */
export const toSortKey = (value) => (typeof value === 'string' ? value : '0000-00');
