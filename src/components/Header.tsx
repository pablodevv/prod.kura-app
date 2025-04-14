import React from 'react';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-lg mx-auto px-4 h-16 flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="text-purple-600" size={32} />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Kure</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
