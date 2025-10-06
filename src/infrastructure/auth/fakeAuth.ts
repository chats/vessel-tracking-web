import type { User } from '../../domain/entities/User';

export const FAKE_USERS: User[] = [
  { id: '1', username: 'captain1', password: 'pass123', name: 'Captain John', role: 'Captain' },
  { id: '2', username: 'officer1', password: 'pass123', name: 'Officer Sarah', role: 'Officer' },
  { id: '3', username: 'engineer1', password: 'pass123', name: 'Engineer Mike', role: 'Engineer' },
  { id: '4', username: 'navigator1', password: 'pass123', name: 'Navigator Lisa', role: 'Navigator' },
  { id: '5', username: 'admin', password: 'admin123', name: 'Admin User', role: 'Admin' },
];

export const fakeAuth = {
  login(username: string, password: string): User | null {
    const user = FAKE_USERS.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  logout(): void {
    localStorage.removeItem('currentUser');
  },
};
