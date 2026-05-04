import RefreshIcon from '@mui/icons-material/Refresh';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, px: 2 }}>
        <Paper sx={{ p: 4, maxWidth: 480, textAlign: 'center' }}>
          <ReportProblemIcon color="error" sx={{ fontSize: 56, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Algo salió mal
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Ocurrió un error inesperado al renderizar esta sección. Podés
            intentar recargarla; si persiste, refrescá la página.
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: 'block', mb: 3, color: 'error.main', wordBreak: 'break-word' }}
          >
            {this.state.error.message}
          </Typography>
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={this.reset}>
            Reintentar
          </Button>
        </Paper>
      </Box>
    );
  }
}
