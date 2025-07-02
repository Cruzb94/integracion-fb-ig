import { IUserCreate } from '../models/User';
import { Profile as FacebookProfile } from 'passport-facebook';
import { Profile as InstagramProfile } from 'passport-instagram';

export class ProfileMapper {
  // Mapear perfil de Facebook a nuestro modelo
  static mapFacebookProfile(profile: FacebookProfile, accessToken: string, refreshToken?: string): IUserCreate {
    return {
      email: profile.emails?.[0]?.value,
      displayName: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      profilePicture: profile.photos?.[0]?.value,
      provider: 'facebook',
      providerId: profile.id,
      accessToken,
      refreshToken
    };
  }

  // Mapear perfil de Instagram a nuestro modelo
  static mapInstagramProfile(profile: InstagramProfile, accessToken: string, refreshToken?: string): IUserCreate {
    return {
      displayName: profile.displayName,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      profilePicture: profile.photos?.[0]?.value,
      provider: 'instagram',
      providerId: profile.id,
      accessToken,
      refreshToken
    };
  }
} 