import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Notifications } from './components/common/Notifications';
import { AppRoutes } from './routes/AppRoutes';
import { store, type AppDispatch } from './store';
import { restoreSession } from './store/slices/authSlice';
import { theme } from './theme';

const BootstrapAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return null;
};

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <BootstrapAuth />
        <AppRoutes />
        <Notifications />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
