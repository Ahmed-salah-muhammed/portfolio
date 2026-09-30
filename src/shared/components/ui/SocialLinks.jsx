import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SvgIcon from '@mui/material/SvgIcon';
import { siFiverr } from 'simple-icons';
import { PROFILE } from '@/data/profile.js';
import { safeUrl } from '@/utils/content.js';

// MUI has no Fiverr glyph; simple-icons does (same source the Skills tiles use).
function FiverrIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d={siFiverr.path} />
    </SvgIcon>
  );
}

// Only the public channels — Ahmed's phone and second email never appear on the site.
const CHANNELS = [
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'fiverr', label: 'Fiverr', Icon: FiverrIcon },
  { key: 'x', label: 'X', Icon: XIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
];

export default function SocialLinks({ size = 'medium', includeEmail = true }) {
  const items = CHANNELS.map((c) => ({ ...c, href: safeUrl(PROFILE.links[c.key]) })).filter(
    (c) => c.href,
  );

  if (includeEmail && PROFILE.contact?.email) {
    items.push({
      key: 'email',
      label: 'Email',
      Icon: EmailRoundedIcon,
      href: `mailto:${PROFILE.contact.email}`,
    });
  }

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {items.map(({ key, label, Icon, href }) => (
        <Tooltip key={key} title={label}>
          <IconButton
            component="a"
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel={key === 'email' ? undefined : 'noopener noreferrer'}
            aria-label={label}
            size={size}
            sx={{
              color: 'text.secondary',
              transition: 'color .2s, transform .2s',
              '&:hover': { color: 'primary.main', transform: 'translateY(-2px)' },
            }}
          >
            <Icon fontSize="small" />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
