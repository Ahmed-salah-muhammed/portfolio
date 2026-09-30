# Connecting the contact form (EmailJS)

The form sends through [EmailJS](https://www.emailjs.com/) straight from the browser, so
no server is needed. Until it is configured, the form stays usable: it explains that it
is not connected yet and offers a pre-filled `mailto:` link instead.

Messages arrive in **ahmedsalah219013@gmail.com**, and pressing *Reply* answers the
sender directly.

## 1. Create the service

1. Create a free account at emailjs.com.
2. **Email Services → Add New Service → Gmail**, and connect `ahmedsalah219013@gmail.com`.
3. Copy the **Service ID**.

## 2. Create the template

**Email Templates → Create New Template**, then set:

| Setting | Value |
|---|---|
| **To Email** | `ahmedsalah219013@gmail.com` |
| **Reply-To** | `{{reply_to}}` |
| **Subject** | `{{subject}}` |
| **From Name** | `{{from_name}}` |

Body (adjust freely):

```
New message from your portfolio

From:    {{from_name}} <{{from_email}}>
Sent:    {{sent_at}}
Subject: {{subject}}

{{message}}
```

The form sends exactly these variables: `from_name`, `from_email`, `reply_to`, `subject`,
`message`, `sent_at`. Copy the **Template ID**.

*(Optional)* A second template that thanks the sender can use `{{from_email}}` as its
**To Email** — you would call it from `src/services/email/emailService.js`.

## 3. Add the three IDs

Copy `.env.example` to `.env` and fill it in:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

The **Public Key** is under *Account → General*. These three values are public by design
(EmailJS can only send through the template you configured), so they are safe in a
`VITE_` variable. **Never put a private key here.**

Restart `npm run dev` after editing `.env`.

## 4. Deploy

On Netlify, add the same three variables under *Site configuration → Environment
variables*, then redeploy. Vite reads them at build time, so a redeploy is required
after changing them.

## Spam protection already in place

- A hidden **honeypot** field: if a bot fills it, the form pretends to succeed and sends
  nothing.
- A **60-second cooldown** per browser between messages.
- In EmailJS, you can also restrict allowed domains and enable rate limiting under
  *Account → Security*.
