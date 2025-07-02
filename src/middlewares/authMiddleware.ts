import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.status(401).json({ 
    message: 'Authentication required',
    isAuthenticated: false
  });
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  // Este middleware permite que la ruta funcione tanto para usuarios autenticados como no autenticados
  next();
}; 