import { Card, CardContent, Stack, Typography } from '@mui/material';
import { memo, ReactNode } from 'react';

interface Props {
  title: string;
  value: number | string;
  icon: ReactNode;
  gradient: string;
  onClick?: () => void;
}

const KPICardImpl = ({ title, value, icon, gradient, onClick }: Props) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s, box-shadow 0.2s',
      overflow: 'hidden',
      position: 'relative',
      '&:hover': onClick
        ? {
            transform: 'translateY(-3px)',
            boxShadow: '0 12px 30px -12px rgba(15, 30, 71, 0.18)',
          }
        : {},
    }}
  >
    <div style={{ height: 4, background: gradient }} />

    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: gradient,
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          {icon}
        </Stack>
        <Stack>
          <Typography variant="h3" component="div" sx={{ lineHeight: 1.1 }}>
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

export const KPICard = memo(KPICardImpl);
