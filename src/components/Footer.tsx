import React from 'react';
import { Github, Linkedin, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md border-t border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Developed by Shivam{' '}
            <span className="text-red-500 animate-pulse">❣️</span>
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/shibbu04/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary rounded-md"
            >
              <span className="sr-only">GitHub</span>
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/shivamsingh57680/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary rounded-md"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={20} />
            </a>
            <a
              href="https://shivam04.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-primary rounded-md"
            >
              <span className="sr-only">Website</span>
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
