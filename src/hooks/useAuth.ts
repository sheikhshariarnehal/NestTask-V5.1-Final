// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loginUser, signupUser, logoutUser } from '../services/auth.service';
import type { User, LoginCredentials, SignupCredentials } from '../types/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await updateUserState(session.user);
        // Update last_active when session is checked
        await updateLastActive(session.user.id);
      }
    } catch (err) {
      console.error('Session check error:', err);
      setError('Failed to check authentication status');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthChange = async (_event: string, session: any) => {
    if (session?.user) {
      await updateUserState(session.user);
      // Update last_active on auth state change
      await updateLastActive(session.user.id);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const updateLastActive = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ last_active: new Date().toISOString() })
        .eq('id', userId);

      if (error) {
        console.error('Error updating last_active:', error);
      }
    } catch (err) {
      console.error('Error updating last_active:', err);
    }
  };

  const updateUserState = async (authUser: any) => {
    try {
      // Get the latest user data including last_active
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) throw error;

      setUser({
        id: authUser.id,
        email: authUser.email!,
        name: userData.name || authUser.email?.split('@')[0] || '',
        role: userData.role || 'user',
        createdAt: userData.created_at,
        lastActive: userData.last_active
      });
    } catch (err) {
      console.error('Error updating user state:', err);
      setError('Failed to update user information');
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const user = await loginUser(credentials);
      setUser(user);
      // Update last_active on login
      await updateLastActive(user.id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      setError(null);
      const user = await signupUser(credentials);
      setUser(user);
      // Update last_active on signup
      await updateLastActive(user.id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await logoutUser();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };
}
