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

const MONTH_NAMES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
];

export const ClientsPerMonthChart = ({ clients }: Props) => {
  const data = useMemo(() => {
    const today = new Date();
    const buckets: { key: string; month: string; total: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      buckets.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        month: MONTH_NAMES[date.getMonth()],
        total: 0,
      });
    }

    clients.forEach((c) => {
      const d = new Date(c.createdAt);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = buckets.find((b) => b.key === key);
      if (bucket) bucket.total += 1;
    });

    return buckets;
  }, [clients]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="grad-clients" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.purple} stopOpacity={0.95} />
            <stop offset="100%" stopColor={colors.blue} stopOpacity={0.85} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
        <XAxis dataKey="month" stroke={colors.textSecondary} fontSize={12} tickLine={false} />
        <YAxis
          stroke={colors.textSecondary}
          fontSize={12}
          tickLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            fontSize: 13,
          }}
          cursor={{ fill: 'rgba(59, 91, 255, 0.06)' }}
          labelStyle={{ color: colors.textPrimary, fontWeight: 600 }}
        />
        <Bar dataKey="total" name="Clientes" fill="url(#grad-clients)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
