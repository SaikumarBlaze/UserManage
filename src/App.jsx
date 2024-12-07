import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-center text-black dark:text-white">Loading...</div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/users" replace />
                    ) : (
                      <Login />
                    )
                  }
                />

                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <UserList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-user/:id"
                  element={
                    <ProtectedRoute>
                      <EditUser />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
