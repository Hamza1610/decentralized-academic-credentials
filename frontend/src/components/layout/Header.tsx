
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const navLinks = [
    { text: 'Features', href: '/#features' },
    { text: 'How It Works', href: '/#how-it-works' },
    { text: 'FAQ', href: '/#faq' },
    { text: 'Verify Credential', href: '/credentials/verify' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6">
                <path d="m22 9-10 13L2 9l10-5 10 5Z" />
                <path d="M12 22V9" />
                <path d="m2 9 10-5" />
                <path d="m22 9-10-5" />
                <path d="M12 4v5" />
              </svg>
            </div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>CredChain</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-gray-600' : 'text-gray-600'
                  }`}
                >
                  {link.text}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to={user?.role === 'student' ? '/dashboard/student' : '/dashboard/institution'}
                    className="text-sm font-medium text-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-sm font-medium text-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="py-3 px-4 hover:bg-gray-50 text-gray-800"
                onClick={closeMenu}
              >
                {link.text}
              </a>
            ))}
            
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'student' ? '/dashboard/student' : '/dashboard/institution'}
                  className="py-3 px-4 hover:bg-gray-50 text-primary"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="py-3 px-4 text-left hover:bg-gray-50 text-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="py-3 px-4 hover:bg-gray-50 text-primary"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="py-3 px-4 bg-primary text-white mt-2 mx-4 rounded-md text-center"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
