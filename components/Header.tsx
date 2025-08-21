import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobeIcon, CogIcon } from './Icon';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { siteSettings } = useData();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navLinkClasses = 'px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors';
  const activeNavLinkClasses = 'bg-fuchsia-600 text-white hover:bg-fuchsia-700 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-slate-800 font-bold text-xl">
              <GlobeIcon className="h-8 w-8 text-fuchsia-600" />
              <span>{siteSettings.title}</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`} end>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>About Me</NavLink>
              <NavLink to="/works" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>My Works</NavLink>
              <NavLink to="/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Blog</NavLink>
              <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>Contact</NavLink>
              {currentUser ? (
                 <div className="flex items-center space-x-4 pl-4 border-l border-slate-300">
                    <span className="text-sm font-medium text-slate-600">Hi, {currentUser.name}</span>
                    <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-1 ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                      <CogIcon className="h-4 w-4" />
                      Admin
                    </NavLink>
                    <button onClick={handleLogout} className={`${navLinkClasses} !text-red-600 hover:!bg-red-100`}>Logout</button>
                 </div>
              ) : (
                <NavLink to="/login" className={({ isActive }) => `flex items-center gap-1 ${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}>
                  <CogIcon className="h-4 w-4" />
                  Admin Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;