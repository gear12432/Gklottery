export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  balance: number;
  vipLevel: string;
  vipStatus: 'active' | 'inactive' | 'expired';
  avatarUrl?: string;
  createdAt: string;
  profileUpdatedAt?: string;
}

export interface UserPreferences {
  language: 'en' | 'ml';
  notificationsEnabled: boolean;
  soundEnabled: boolean;
}
