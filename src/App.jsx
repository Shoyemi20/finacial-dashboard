import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DarkModeProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          {/* Sidebar - always present but hidden on mobile */}
          <Sidebar 
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <main className="flex-1 overflow-auto p-4">
              <Dashboard />
            </main>
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
