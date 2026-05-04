import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Stack,
} from '@mui/material';

export const ClientCardSkeleton = () => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Skeleton variant="text" width="60%" height={28} />
        <Skeleton variant="rounded" width={88} height={24} />
      </Stack>

      <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />

      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="80%" />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="50%" />
        </Stack>
      </Stack>
    </CardContent>
    <CardActions sx={{ px: 2, pb: 2, justifyContent: 'flex-end', gap: 0.5 }}>
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="circular" width={32} height={32} />
      <Skeleton variant="circular" width={32} height={32} />
    </CardActions>
  </Card>
);
