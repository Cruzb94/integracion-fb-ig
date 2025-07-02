import { IUser, IUserCreate } from '../models/User';

// Simulación de base de datos (reemplaza con tu ORM/DB real)
let users: IUser[] = [];

export class UserService {
  // Buscar usuario por provider y providerId
  static async findByProvider(provider: string, providerId: string): Promise<IUser | null> {
    const user = users.find(u => u.provider === provider && u.providerId === providerId);
    return user || null;
  }

  // Buscar usuario por email
  static async findByEmail(email: string): Promise<IUser | null> {
    const user = users.find(u => u.email === email);
    return user || null;
  }

  // Crear nuevo usuario
  static async create(userData: IUserCreate): Promise<IUser> {
    const newUser: IUser = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }

  // Actualizar usuario existente
  static async update(provider: string, providerId: string, userData: Partial<IUserCreate>): Promise<IUser | null> {
    const userIndex = users.findIndex(u => u.provider === provider && u.providerId === providerId);
    
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date()
    };

    return users[userIndex];
  }

  // Crear o actualizar usuario (upsert)
  static async upsert(userData: IUserCreate): Promise<IUser> {
    const existingUser = await this.findByProvider(userData.provider, userData.providerId);
    
    if (existingUser) {
      const updatedUser = await this.update(userData.provider, userData.providerId, userData);
      return updatedUser!;
    } else {
      return await this.create(userData);
    }
  }

  // Generar ID único (reemplaza con tu lógica de ID)
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
} 