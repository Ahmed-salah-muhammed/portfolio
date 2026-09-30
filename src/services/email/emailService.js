import emailjs from '@emailjs/browser';

// Public EmailJS identifiers — safe in the browser by design (they can only send
// through the template you configured). Real secrets never belong here.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured');
    this.name = 'EmailNotConfiguredError';
  }
}

/**
 * Sends the contact form to Ahmed's inbox. The template's To Email is his Gmail and its
 * Reply-To is `{{reply_to}}`, so hitting "Reply" answers the sender directly.
 */
export async function sendContactMessage({ name, email, subject, message, service }) {
  if (!isEmailConfigured) throw new EmailNotConfiguredError();

  const enrichedSubject = service
    ? `[${service}] ${subject || 'New Project Inquiry'}`
    : subject || 'New message from your portfolio';

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      // Names (covers any template variable)
      name,
      from_name: name,
      user_name: name,
      sender_name: name,

      // Emails & Reply-To (covers any template variable)
      email,
      from_email: email,
      user_email: email,
      sender_email: email,
      reply_to: email,

      // Message details
      service: service || 'General Inquiry',
      service_type: service || 'General Inquiry',
      subject: `${enrichedSubject} — from ${name} (${email})`,
      message,
      message_html: message,
      sent_at: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
    },
    { publicKey: PUBLIC_KEY },
  );
}
