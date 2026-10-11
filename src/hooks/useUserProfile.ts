import { useAuth } from '../context/AuthContext';

export function useUserProfile() {
  const { profile, refreshProfile, loading } = useAuth();
  return {
    profile,
    balance: profile?.balance || 0,
    vipLevel: profile?.vipLevel || 'BRONZE',
    refreshProfile,
    loading,
  };
}
