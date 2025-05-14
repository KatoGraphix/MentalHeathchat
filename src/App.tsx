import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import BreathingExercise from './components/BreathingExercise';
import ResourcesSection from './components/ResourcesSection';
import CrisisHelp from './components/CrisisHelp';
import Auth from './components/Auth';

function App() {
  const [session, setSession] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchUserName(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchUserName(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserName = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('name')
      .eq('user_id', userId)
      .single();

    if (!error && data) {
      setUserName(data.name);
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const renderContent = () => {
    if (!session) {
      return <Auth onAuthSuccess={() => {}} />;
    }

    switch (activeTab) {
      case 'chat':
        return <ChatInterface userName={userName} />;
      case 'breathing':
        return <BreathingExercise />;
      case 'resources':
        return <ResourcesSection />;
      case 'crisis':
        return <CrisisHelp />;
      default:
        return <ChatInterface userName={userName} />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {session && <Header toggleSidebar={toggleSidebar} userName={userName} />}
      
      <div className={`flex flex-1 ${session ? 'pt-16' : ''} overflow-hidden`}>
        {session && (
          <Sidebar 
            isOpen={sidebarOpen} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            closeSidebar={closeSidebar} 
          />
        )}
        
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen && session ? 'md:ml-64' : ''}`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;