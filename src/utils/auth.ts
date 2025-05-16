import { supabase } from '../supabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface User {
  id: string;
  email?: string;
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const setupAuthListener = (callback: (user: User | null) => void): (() => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
    if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
      if (session?.user) {
        callback({
          id: session.user.id || '',
          email: session.user.email,
        });
      }
    } else if (event === 'SIGNED_OUT') {
      callback(null);
    }
  });

  // Return cleanup function
  return () => {
    subscription.unsubscribe();
  };
}; 