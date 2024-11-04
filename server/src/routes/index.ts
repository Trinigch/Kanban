import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes

// Rutas protegidas con autenticación para el API
router.use('/api', authenticateToken, apiRoutes);


//router.use('/api', apiRoutes);

export default router;
