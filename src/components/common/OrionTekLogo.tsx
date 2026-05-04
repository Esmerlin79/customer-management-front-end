import { Box, Typography } from '@mui/material';

import { colors, gradients } from '../../theme';

interface Props {
  size?: number;
  iconOnly?: boolean;
  inverted?: boolean;
}

export const OrionTekLogo = ({
  size = 36,
  iconOnly = false,
  inverted = false,
}: Props) => {
  const orionColor = inverted ? '#FFFFFF' : colors.navy;

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        component="svg"
        viewBox="0 0 48 48"
        sx={{ width: size, height: size, flexShrink: 0 }}
        aria-label="Logo OrionTek"
      >
        <defs>
          <linearGradient id="oriontek-grad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.purple} />
            <stop offset="100%" stopColor={colors.blue} />
          </linearGradient>
        </defs>
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="url(#oriontek-grad)"
          strokeWidth="2.5"
        />
        <circle cx="13" cy="15" r="1.8" fill="url(#oriontek-grad)" />
        <circle cx="10" cy="22" r="1.8" fill="url(#oriontek-grad)" />
        <circle cx="13" cy="29" r="1.8" fill="url(#oriontek-grad)" />
        <path
          d="M13 15 C20 16, 28 24, 36 38"
          stroke="url(#oriontek-grad)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M10 22 C18 24, 26 32, 32 40"
          stroke="url(#oriontek-grad)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M13 29 C18 32, 22 38, 26 41"
          stroke="url(#oriontek-grad)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </Box>

      {!iconOnly && (
        <Typography
          component="span"
          sx={{
            fontSize: size * 0.5,
            fontWeight: 800,
            letterSpacing: '0.02em',
            lineHeight: 1,
            display: 'inline-flex',
          }}
        >
          <Box component="span" sx={{ color: orionColor }}>
            ORION
          </Box>
          <Box
            component="span"
            sx={{
              background: gradients.brand,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            TEK
          </Box>
        </Typography>
      )}
    </Box>
  );
};
