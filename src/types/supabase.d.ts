declare namespace Supabase {
  interface AuthSession {
    user: {
      id: string;
      email?: string;
    };
  }

  interface AuthError {
    message: string;
  }

  interface AuthResponse {
    data: {
      user: {
        id: string;
        email?: string;
      } | null;
      session?: any;
      subscription?: {
        unsubscribe: () => void;
      };
    };
    error: AuthError | null;
  }

  interface InsertResponse {
    data: any;
    error: {
      message: string;
    } | null;
  }
} 