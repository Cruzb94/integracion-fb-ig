import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const loginSuccess = (req: Request, res: Response) => {
  res.json({ 
    message: 'Login successful', 
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
};

export const loginFailure = (req: Request, res: Response) => {
  res.status(401).json({ message: 'Login failed' });
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error during logout', error: err.message });
    }
    res.json({ message: 'Logout successful' });
  });
};

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  res.json({ 
    user: req.user,
    isAuthenticated: true
  });
};

export const checkAuth = (req: Request, res: Response) => {
  res.json({ 
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null
  });
}; 