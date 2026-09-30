import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import { PROFILE } from '@/data/profile.js';
import { EmailNotConfiguredError, sendContactMessage } from '@services/email/emailService.js';
import {
  CONTACT_DEFAULTS,
  MESSAGE_MAX,
  SERVICE_CATEGORIES,
  contactSchema,
  cooldownRemaining,
  startCooldown,
} from '../contactSchema.js';
import { useLanguage } from '@/i18n';

const CATEGORY_ICONS = {
  'WebGIS & Full-Stack': MapRoundedIcon,
  'ArcGIS Enterprise': DnsRoundedIcon,
  'AI & Automation': AutoAwesomeRoundedIcon,
  'Flood & Planning Study': WaterDropRoundedIcon,
  'Career Opportunity': WorkOutlineRoundedIcon,
};

const mailtoFor = ({ name, subject, message }) => {
  const params = new URLSearchParams({
    subject: subject || 'Hello from your portfolio',
    body: `${message ?? ''}\n\n— ${name ?? ''}`.trim(),
  });
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  return `mailto:${PROFILE.contact.email}?${params.toString().replaceAll('+', '%20')}`;
};

const fieldProps = { fullWidth: true, size: 'medium', variant: 'outlined' };

export default function ContactForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema), defaultValues: CONTACT_DEFAULTS });

  const { t } = useLanguage();

  // idle | sending | success | error | unconfigured
  const [status, setStatus] = useState('idle');
  const [wait, setWait] = useState(0);
  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;
  const selectedService = useWatch({ control, name: 'service' });

  // Ticks the cooldown message down once a second.
  useEffect(() => {
    if (wait <= 0) return undefined;
    const id = setInterval(() => setWait((w) => Math.max(0, w - 1)), 1000);
    return () => clearInterval(id);
  }, [wait]);

  const onSubmit = async (values) => {
    // A filled honeypot means a bot: say "thanks" and send nothing.
    if (values.website) {
      setStatus('success');
      reset(CONTACT_DEFAULTS);
      return;
    }

    const remaining = cooldownRemaining();
    if (remaining > 0) {
      setWait(remaining);
      return;
    }

    setStatus('sending');
    try {
      await sendContactMessage(values);
      startCooldown();
      reset(CONTACT_DEFAULTS);
      setStatus('success');
    } catch (error) {
      setStatus(error instanceof EmailNotConfiguredError ? 'unconfigured' : 'error');
    }
  };

  if (status === 'success') {
    return (
      <Box
        role="status"
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CheckCircleRoundedIcon
          sx={{
            fontSize: 72,
            color: 'success.main',
            animation: 'popIn .5s cubic-bezier(.22,1,.36,1) both',
            '@keyframes popIn': { from: { transform: 'scale(.4)', opacity: 0 }, to: { transform: 'scale(1)', opacity: 1 } },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
        <Typography variant="h3" component="h3">
          {t('contact.successTitle', "Thanks, I'll reply soon")}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 360 }}>
          {t(
            'contact.successText',
            'Your message reached my inbox. I usually answer within a day or two.',
          )}
        </Typography>
        <Button variant="outlined" onClick={() => setStatus('idle')} sx={{ mt: 1 }}>
          {t('contact.anotherMessage', 'Send another message')}
        </Button>
      </Box>
    );
  }

  const sending = status === 'sending';

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Contact form"
      sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}
    >
      {/* Service Category Pills */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
          {t('contact.inquiryType', 'Inquiry Type (optional):')}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {SERVICE_CATEGORIES.map((cat) => {
            const isSelected = selectedService === cat.id;
            const IconComp = CATEGORY_ICONS[cat.id];
            const catKeyMap = {
              'WebGIS & Full-Stack': 'contact.cat.webgis',
              'ArcGIS Enterprise': 'contact.cat.enterprise',
              'AI & Automation': 'contact.cat.ai',
              'Flood & Planning Study': 'contact.cat.flood',
              'Career Opportunity': 'contact.cat.career',
            };
            const label = t(catKeyMap[cat.id], cat.label);
            return (
              <Chip
                key={cat.id}
                icon={
                  IconComp ? (
                    <IconComp
                      sx={{
                        fontSize: '1rem !important',
                        color: isSelected ? 'inherit !important' : 'primary.main !important',
                      }}
                    />
                  ) : undefined
                }
                label={label}
                clickable
                variant={isSelected ? 'filled' : 'outlined'}
                color={isSelected ? 'primary' : 'default'}
                size="small"
                onClick={() => setValue('service', isSelected ? '' : cat.id, { shouldValidate: true })}
                sx={{
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8rem',
                  py: 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          // The message row takes whatever height the card is given.
          gridTemplateRows: { xs: 'auto auto auto 1fr', sm: 'auto auto 1fr' },
          flex: 1,
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...fieldProps}
              label={t('contact.yourName', 'Your name')}
              autoComplete="name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              disabled={sending}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              {...fieldProps}
              type="email"
              label={t('contact.yourEmail', 'Your email')}
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              disabled={sending}
            />
          )}
        />
        <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...fieldProps}
                label={t('contact.subject', 'Subject (optional)')}
                error={Boolean(errors.subject)}
                helperText={errors.subject?.message}
                disabled={sending}
              />
            )}
          />
        </Box>
        <Box sx={{ gridColumn: { sm: '1 / -1' }, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                {...fieldProps}
                label={t('contact.message', 'Message')}
                multiline
                minRows={6}
                maxRows={12}
                error={Boolean(errors.message)}
                helperText={errors.message?.message}
                disabled={sending}
                sx={{
                  flex: 1,
                  '& .MuiInputBase-root': { flex: 1, alignItems: 'flex-start' },
                  // Stacked layouts keep the normal auto-sizing; beside the map the box fills the card.
                  '& .MuiInputBase-inputMultiline': {
                    height: { lg: '100% !important' },
                    overflowY: { lg: 'auto !important' },
                  },
                }}
              />
            )}
          />
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'right',
              mt: 0.5,
              color: messageLength > MESSAGE_MAX ? 'error.main' : 'text.secondary',
            }}
          >
            {messageLength} / {MESSAGE_MAX}
          </Typography>
        </Box>
      </Box>

      {/* Honeypot — invisible to people, tempting to bots. */}
      <Box aria-hidden sx={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Leave this field empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </Box>

      {wait > 0 && (
        <Alert severity="info" sx={{ mt: 2.5 }}>
          {t('contact.waitAlert', `Please wait ${wait}s before sending another message.`).replace('{wait}', wait)}
        </Alert>
      )}

      {status === 'error' && (
        <Alert severity="error" sx={{ mt: 2.5 }}>
          {t('contact.errorAlert', 'Something went wrong sending that. You can')}{' '}
          <Box component="a" href={mailtoFor(getValues())} sx={{ fontWeight: 700, textDecoration: 'underline' }}>
            {t('contact.emailMeDirectly', 'email me directly')}
          </Box>{' '}
          {t('contact.atEmail', 'at')} {PROFILE.contact.email}.
        </Alert>
      )}

      {status === 'unconfigured' && (
        <Alert severity="warning" sx={{ mt: 2.5 }}>
          {t('contact.unconfiguredAlert', 'The form is not connected to email yet. Please')}{' '}
          <Box component="a" href={mailtoFor(getValues())} sx={{ fontWeight: 700, textDecoration: 'underline' }}>
            {t('contact.emailMeDirectly', 'email me directly')}
          </Box>{' '}
          {t('contact.atEmail', 'at')} {PROFILE.contact.email}.
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={sending || wait > 0}
        endIcon={sending ? <CircularProgress size={18} color="inherit" /> : <SendRoundedIcon />}
        // In the flex-column form a button would otherwise stretch to the full width.
        sx={{ mt: 3, width: { xs: '100%', sm: 'auto' }, alignSelf: { sm: 'flex-start' } }}
      >
        {sending ? t('contact.sending', 'Sending…') : t('contact.sendBtn', 'Send message')}
      </Button>
    </Box>
  );
}
