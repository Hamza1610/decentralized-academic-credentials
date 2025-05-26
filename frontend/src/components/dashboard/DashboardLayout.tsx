
import React, { useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Award,
  User,
  Bell,
  LogOut,
  ChevronDown,
  Settings,
  FileText,
  HelpCircle,
  Search
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface SidebarLinkProps {
  icon: ReactNode;
  text: string;
  to: string;
  isActive: boolean;
  badge?: number;
}

const SidebarLink = ({ icon, text, to, isActive, badge }: SidebarLinkProps) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white font-medium'
        : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span className="flex-grow">{text}</span>
    {badge && (
      <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
        {badge}
      </span>
    )}
  </Link>
);

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    // Redirect would happen via the auth provider
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5">
                  <path d="m22 9-10 13L2 9l10-5 10 5Z" />
                  <path d="M12 22V9" />
                  <path d="m2 9 10-5" />
                  <path d="m22 9-10-5" />
                  <path d="M12 4v5" />
                </svg>
              </div>
              <span className="font-bold">CredChain</span>
            </Link>
            <button
              className="lg:hidden text-gray-600"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {user?.role === 'student' ? (
              <>
                <SidebarLink
                  icon={<Home size={20} />}
                  text="Overview"
                  to="/dashboard/student"
                  isActive={isActive('/dashboard/student')}
                />
                <SidebarLink
                  icon={<Award size={20} />}
                  text="My Credentials"
                  to="/dashboard/student/credentials"
                  isActive={isActive('/dashboard/student/credentials')}
                  badge={3}
                />
                <SidebarLink
                  icon={<FileText size={20} />}
                  text="Request Credential"
                  to="/dashboard/student/request"
                  isActive={isActive('/dashboard/student/request')}
                />
                <SidebarLink
                  icon={<User size={20} />}
                  text="Profile"
                  to="/dashboard/student/profile"
                  isActive={isActive('/dashboard/student/profile')}
                />
              </>
            ) : (
              <>
                <SidebarLink
                  icon={<Home size={20} />}
                  text="Overview"
                  to="/dashboard/institution"
                  isActive={isActive('/dashboard/institution')}
                />
                <SidebarLink
                  icon={<Award size={20} />}
                  text="Issue Credentials"
                  to="/dashboard/institution/issue"
                  isActive={isActive('/dashboard/institution/issue')}
                />
                <SidebarLink
                  icon={<BookOpen size={20} />}
                  text="Students"
                  to="/dashboard/institution/students"
                  isActive={isActive('/dashboard/institution/students')}
                  badge={5}
                />
                <SidebarLink
                  icon={<FileText size={20} />}
                  text="Templates"
                  to="/dashboard/institution/templates"
                  isActive={isActive('/dashboard/institution/templates')}
                />
              </>
            )}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <SidebarLink
                icon={<Settings size={20} />}
                text="Settings"
                to="/dashboard/settings"
                isActive={isActive('/dashboard/settings')}
              />
              <SidebarLink
                icon={<HelpCircle size={20} />}
                text="Help & Support"
                to="/dashboard/help"
                isActive={isActive('/dashboard/help')}
              />
            </div>
          </div>
          
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-primary w-full px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut size={20} className="mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button
              className="text-gray-600 hover:text-primary lg:hidden mr-4"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1.5 rounded-md border border-gray-300 focus:ring-primary focus:border-primary w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-1 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors duration-200">
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary"></span>
            </button>
            
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  {user?.name?.[0] || user?.principal?.[0] || 'U'}
                </div>
                <span className="hidden md:block ml-2 text-sm font-medium">
                  {user?.role === 'student' ? 'Student' : 'Institution'}
                </span>
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
