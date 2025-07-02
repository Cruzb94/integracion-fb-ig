import { Router, Request, Response } from 'express';
import passport from 'passport';
import { 
  loginSuccess, 
  loginFailure, 
  logout, 
  getCurrentUser, 
  checkAuth 
} from '../controllers/authController';

const router = Router();

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  loginSuccess
);

// Instagram
router.get('/instagram', passport.authenticate('instagram'));

router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/auth/failure' }),
  loginSuccess
);

// Rutas adicionales
router.get('/failure', loginFailure);
router.get('/logout', logout);
router.get('/me', getCurrentUser);
router.get('/check', checkAuth);

export default router; 