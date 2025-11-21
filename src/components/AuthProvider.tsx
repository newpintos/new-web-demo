import { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  generationCount: number;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  incrementGenerationCount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [generationCount, setGenerationCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        // Get current session immediately
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        if (mounted) {
          console.log('Initial session:', currentSession?.user?.email || 'No user');
          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          // Fetch user data if logged in
          if (currentSession?.user) {
            await fetchUserData(currentSession.user.id);
          } else {
            setGenerationCount(0);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth event:', event);
        console.log('Session:', session);
        console.log('User:', session?.user);
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch user data if user logged in
        if (session?.user) {
          console.log('Fetching user data for:', session.user.id);
          await fetchUserData(session.user.id);
        } else {
          console.log('No user in session');
          setGenerationCount(0);
        }

        // CRITICAL: Set loading to false after auth state change
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('generation_count')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('Error fetching user data:', error);
        // Try to create new user record if not found
        if (error.code === 'PGRST116') {
          console.log('User not found, creating new user record...');
          const { error: insertError } = await supabase.from('users').insert({
            id: userId,
            generation_count: 0,
          });
          if (insertError) {
            console.error('Error creating user record:', insertError);
          } else {
            console.log('User record created successfully');
          }
        }
        setGenerationCount(0);
      } else if (data) {
        console.log('User found, generation count:', data.generation_count);
        setGenerationCount(data.generation_count || 0);
      }
    } catch (error) {
      console.error('User data fetch error:', error);
      setGenerationCount(0);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google OAuth...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        toast.error(error.message || 'Failed to sign in');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('An error occurred during sign in');
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out...');

      // Clear local state immediately
      setUser(null);
      setSession(null);
      setGenerationCount(0);

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Supabase sign out error:', error);
        toast.error('Failed to sign out');
      } else {
        console.log('Supabase sign out successful');
        toast.success('Signed out successfully');
      }

      // Reload page after a brief delay to ensure all state is cleared
      setTimeout(() => {
        console.log('Reloading page...');
        window.location.href = '/';
      }, 300);

    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('An error occurred during sign out');
      // Still reload even if there's an error
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
  };

  const incrementGenerationCount = async () => {
    if (!user) return;

    try {
      setGenerationCount((prev) => prev + 1);

      const newCount = generationCount + 1;
      await supabase
        .from('users')
        .update({ generation_count: newCount })
        .eq('id', user.id);
    } catch (error) {
      console.error('Error incrementing count:', error);
      setGenerationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    generationCount,
    signInWithGoogle,
    signOut,
    incrementGenerationCount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
