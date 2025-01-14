export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  isOutdoor?: boolean;
  important?: boolean;
  assignedTo?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface TodoState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export interface WeatherData {
  temp: number;
  description: string;
  icon: string;
}