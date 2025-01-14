import React from 'react';
import { Link } from 'react-router-dom';
import { ListTodo } from 'lucide-react'; // Replace with your actual icon component
import { ThemeToggle } from './ThemeToggle'; // Replace with your actual ThemeToggle component

export const Nav = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center">
            <ListTodo className="h-8 w-8 text-primary-dark dark:text-primary-light" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              DoIt
            </span>
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
              to="/about"
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              About
            </Link>
            <Link
              to="/features"
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Features
            </Link>
          </div>

          {/* Action Buttons */}
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
  );
};

export default Nav;
