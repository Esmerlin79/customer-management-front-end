import { Box, Grid, Paper, Skeleton, Stack } from '@mui/material';

export const ClientDetailSkeleton = () => (
  <Box>
    <Skeleton variant="text" width={120} sx={{ mb: 3 }} />

    <Paper sx={{ p: { xs: 2, sm: 4 }, mb: 3 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="40%" height={48} />
          <Skeleton variant="text" width="25%" />
        </Box>
        <Skeleton variant="rounded" width={140} height={36} />
      </Stack>

      <Box sx={{ my: 3 }}>
        <Skeleton variant="rectangular" height={1} />
      </Box>

      <Grid container spacing={3}>
        {[0, 1].map((i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton variant="circular" width={24} height={24} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Paper>

    <Paper sx={{ p: { xs: 2, sm: 4 } }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Skeleton variant="text" width={140} height={32} />
        <Skeleton variant="rounded" width={170} height={36} />
      </Stack>

      {[0, 1].map((i) => (
        <Skeleton
          key={i}
          variant="rounded"
          height={68}
          sx={{ mb: 1, borderRadius: 2 }}
        />
      ))}
    </Paper>
  </Box>
);
