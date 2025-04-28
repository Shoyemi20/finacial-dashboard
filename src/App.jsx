import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Make sure to import useAuth here
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useLocation } from "react-router-dom";

function App() {
  const { user } = useAuth();  // Access the current user from context

  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/signup"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  //const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // To toggle the sidebar open/close

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, null if not
    });
    return () => unsubscribe(); // Cleanup when component unmounts
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <DarkModeProvider>
      <AuthProvider>
        
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Show Sidebar only if user is logged in and not on login/signup page */}
            {user && shouldShowSidebar && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
            
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Show Navbar only if user is logged in */}
              {user && <Navbar toggleSidebar={toggleSidebar} />}

              <main className="flex-1 overflow-auto p-4">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </div>
        
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;


