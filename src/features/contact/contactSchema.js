import { z } from 'zod';

export const MESSAGE_MAX = 2000;

export const SERVICE_CATEGORIES = [
  { id: 'WebGIS & Full-Stack', label: 'WebGIS & Full-Stack' },
  { id: 'ArcGIS Enterprise', label: 'ArcGIS Enterprise' },
  { id: 'AI & Automation', label: 'AI & Automation (MCP)' },
  { id: 'Flood & Planning Study', label: 'Flood & Planning Study' },
  { id: 'Career Opportunity', label: 'Career / Full-Time' },
];

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(60, 'Keep it under 60 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  service: z.string().optional().or(z.literal('')),
  subject: z.string().trim().max(100, 'Keep it under 100 characters').optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, 'A little more detail, please (at least 10 characters)')
    .max(MESSAGE_MAX, `Keep it under ${MESSAGE_MAX} characters`),
  // Honeypot: real visitors never see or fill this field, bots do.
  website: z.string().max(0).optional().or(z.literal('')),
});

export const CONTACT_DEFAULTS = {
  name: '',
  email: '',
  service: '',
  subject: '',
  message: '',
  website: '',
};

// One message per minute from the same browser — a light deterrent against spam.
const COOLDOWN_MS = 60_000;
const KEY = 'as-contact-last-sent';

/** Seconds left on the cooldown; storage may be unavailable (private mode), so never throw. */
export const cooldownRemaining = () => {
  try {
    const last = Number(window.localStorage.getItem(KEY));
    if (!last) return 0;
    return Math.max(0, Math.ceil((COOLDOWN_MS - (Date.now() - last)) / 1000));
  } catch {
    return 0;
  }
};

export const startCooldown = () => {
  try {
    window.localStorage.setItem(KEY, String(Date.now()));
  } catch {
    /* storage unavailable — the cooldown is best-effort */
  }
};
