import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ListTodo } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Footer } from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ListTodo className="h-8 w-8 text-primary-dark dark:text-primary-light" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">DoIt</span>
            </div>

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
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Organize your tasks with <span className="text-primary dark:text-primary-light">DoIt</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Stay productive and never miss a task. Simple, intuitive, and powerful task management for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary text-white text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-lg border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 text-lg font-semibold"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-primary dark:text-primary-light mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Simple Task Management</h3>
            <p className="text-gray-600 dark:text-gray-300">Easily create, organize, and track your tasks in one place.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-primary dark:text-primary-light mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Priority Levels</h3>
            <p className="text-gray-600 dark:text-gray-300">Set task priorities and focus on what matters most.</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-primary dark:text-primary-light mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dark Mode Support</h3>
            <p className="text-gray-600 dark:text-gray-300">Work comfortably day or night with our dark mode feature.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;