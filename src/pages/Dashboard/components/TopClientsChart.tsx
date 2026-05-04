import { Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { colors } from '../../../theme';
import { Client } from '../../../types';

interface Props {
  clients: Client[];
}

export const TopClientsChart = ({ clients }: Props) => {
  const data = useMemo(() => {
    return clients
      .map((c) => ({
        name: c.name.length > 22 ? `${c.name.slice(0, 20)}…` : c.name,
        total: c.addresses.length,
      }))
      .filter((c) => c.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [clients]);

  if (data.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Aún no hay clientes con direcciones registradas.
        </Typography>
      </Stack>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 8, bottom: 0 }}
      >
        <defs>
          <linearGradient id="grad-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.blue} />
            <stop offset="100%" stopColor={colors.purple} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} />
        <XAxis
          type="number"
          stroke={colors.textSecondary}
          fontSize={12}
          allowDecimals={false}
          tickLine={false}
        />
        <YAxis
          dataKey="name"
          type="category"
          stroke={colors.textSecondary}
          fontSize={12}
          tickLine={false}
          width={150}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            fontSize: 13,
          }}
          cursor={{ fill: 'rgba(59, 91, 255, 0.06)' }}
        />
        <Bar
          dataKey="total"
          name="Direcciones"
          fill="url(#grad-top)"
          radius={[0, 8, 8, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
