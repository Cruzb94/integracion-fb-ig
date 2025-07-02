import passport from 'passport';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import { Strategy as InstagramStrategy, Profile as InstagramProfile } from 'passport-instagram';
import dotenv from 'dotenv';
import { Request } from 'express';
import { UserService } from '../services/userService';
import { ProfileMapper } from '../utils/profileMapper';

dotenv.config();

passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done: (err: any, user?: Express.User | false | null) => void) => {
  done(null, user);
});

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID || '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'name', 'photos']
  },
  async (accessToken: string, refreshToken: string, profile: FacebookProfile, done: (error: any, user?: any) => void) => {
    try {
      // Mapear perfil de Facebook a nuestro modelo
      const userData = ProfileMapper.mapFacebookProfile(profile, accessToken, refreshToken);
      
      // Buscar o crear usuario
      const user = await UserService.upsert(userData);
      
      return done(null, user);
    } catch (error) {
      console.error('Error en Facebook strategy:', error);
      return done(error, null);
    }
  }
));

passport.use(new InstagramStrategy(
  {
    clientID: process.env.INSTAGRAM_CLIENT_ID || '',
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    callbackURL: process.env.INSTAGRAM_CALLBACK_URL || '/auth/instagram/callback',
  },
  async (accessToken: string, refreshToken: string, profile: InstagramProfile, done: (error: any, user?: any) => void) => {
    try {
      // Mapear perfil de Instagram a nuestro modelo
      const userData = ProfileMapper.mapInstagramProfile(profile, accessToken, refreshToken);
      
      // Buscar o crear usuario
      const user = await UserService.upsert(userData);
      
      return done(null, user);
    } catch (error) {
      console.error('Error en Instagram strategy:', error);
      return done(error, null);
    }
  }
)); 