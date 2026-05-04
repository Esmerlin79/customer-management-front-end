import { Box, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { colors } from '../../../theme';
import { Client } from '../../../types';

interface Props {
  clients: Client[];
}

const PALETTE = [
  colors.blue,
  colors.purple,
  colors.navy,
  '#10B981',
  '#F59E0B',
  colors.blueLight,
];

export const AddressesByCountryChart = ({ clients }: Props) => {
  const data = useMemo(() => {
    const counts = new Map<string, number>();
    clients.forEach((c) => {
      c.addresses.forEach((a) => {
        counts.set(a.country, (counts.get(a.country) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([country, total]) => ({ country, total }))
      .sort((a, b) => b.total - a.total);
  }, [clients]);

  if (data.length === 0) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Sin direcciones registradas todavía.
        </Typography>
      </Stack>
    );
  }

  return (
    <Box sx={{ height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="country"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={2}
            stroke={colors.surface}
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 13,
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={32}
            iconType="circle"
            wrapperStyle={{ fontSize: 12, color: colors.textSecondary }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
