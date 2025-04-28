import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
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

function App() {
  const { user, setUser } = useAuth(); // Get both user and setUser from AuthContext
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define routes where sidebar/navbar should be hidden
  const hideNavigationRoutes = ["/login", "/signup"];
  const shouldShowNavigation = !hideNavigationRoutes.includes(location.pathname);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup on unmount
  }, [setUser]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <DarkModeProvider>
      <AuthProvider>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          {/* Show Sidebar only when needed */}
          {user && shouldShowNavigation && (
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          )}

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Show Navbar only when needed */}
            {user && shouldShowNavigation && (
              <Navbar toggleSidebar={toggleSidebar} />
            )}

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
                {/* Add more protected routes as needed */}
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;

