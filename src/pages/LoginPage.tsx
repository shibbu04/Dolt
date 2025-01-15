import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { ListTodo, Mail, Lock } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';
import { Toast, ToastType } from '../components/Toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      dispatch(login(user));
      setToast({
        message: 'Welcome back! Login successful.',
        type: 'success'
      });
      // Navigate after a short delay to show the toast
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setError('Invalid email or password');
      setToast({
        message: 'Login failed. Please check your credentials.',
        type: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <ListTodo className="h-6 w-6 text-primary-dark dark:text-primary-light" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">DoIt</span>
            </Link>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </Link>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Features
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <ListTodo className="h-10 w-10 text-primary dark:text-primary-light" />
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-md text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:focus:ring-primary-light bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:focus:ring-primary-light bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:text-primary-dark dark:text-primary-light">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;