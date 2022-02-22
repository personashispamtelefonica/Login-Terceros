export interface AuthResponse {
  logged: boolean;
  username?: string;
  password?: string;
  token?: string;
  message?: string;
}

export interface LoginForm {
  username: string;
  password: string;
  remember?: boolean;
}
