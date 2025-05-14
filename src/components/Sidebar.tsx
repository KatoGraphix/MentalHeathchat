import React from 'react';
import { MessageSquare, Wind, Book, Phone, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab, closeSidebar }) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={20} /> },
    { id: 'breathing', label: 'Breathing', icon: <Wind size={20} /> },
    { id: 'resources', label: 'Resources', icon: <Book size={20} /> },
    { id: 'crisis', label: 'Crisis Help', icon: <Phone size={20} /> }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}
      
      <aside className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-30
        transition-transform duration-300 ease-in-out
        w-64 md:translate-x-0 pt-16
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="font-semibold text-purple-700">Menu</h2>
          <button 
            onClick={closeSidebar}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`
                    w-full flex items-center p-3 rounded-lg transition-colors
                    ${activeTab === tab.id 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-xs text-center text-gray-500">
          <p>Remember: I'm not a substitute for professional mental health care.</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;