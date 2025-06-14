export interface AuthStore {
  isAuthenticated: boolean;
  tokens: { accessToken: string; refreshToken: string } | null;

  // actions
  login: () => void;
  logout: () => void;
}
