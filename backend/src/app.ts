import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import authRoutes from './routes/authRoutes';
import clientsRoutes from './routes/clientsRoutes';
import addressesRoutes from './routes/addressesRoutes';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { requireAuth } from './middlewares/auth';
import { swaggerSpec } from './swagger/swagger';

export const buildApp = (): Application => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
      credentials: true,
    })
  );

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));

  app.use('/api/auth', authRoutes);

  app.use('/api/clients', requireAuth, clientsRoutes);
  app.use('/api/addresses', requireAuth, addressesRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
