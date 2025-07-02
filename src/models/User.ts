export interface IUser {
  id?: string;
  email?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  provider: 'facebook' | 'instagram';
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCreate {
  email?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  provider: 'facebook' | 'instagram';
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
} 