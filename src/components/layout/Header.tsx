import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Utensils } from 'lucide-react';
import { useMoodContext } from '../../contexts/MoodContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { resetContext } = useMoodContext();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleRestart = () => {
    resetContext();
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Capture', path: '/capture' },
    { name: 'Voice Input', path: '/voice' },
    { name: 'Preferences', path: '/preferences' },
  ];

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={handleRestart} className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -20 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Utensils className="h-8 w-8 text-primary-500" />
            </motion.div>
            <span className="text-xl font-bold text-gray-800">MoodMeal AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={handleRestart}
              className="btn-outline"
            >
              Restart
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 font-medium ${
                    location.pathname === item.path
                      ? 'text-primary-500 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-500 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleRestart();
                  setIsOpen(false);
                }}
                className="mx-4 btn-outline"
              >
                Restart
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;