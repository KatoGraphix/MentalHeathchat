import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface HeaderProps {
  toggleSidebar: () => void;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, userName }) => {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-2xl font-semibold text-purple-700">MindfulChat</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {userName}</span>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Sign out"
          >
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header