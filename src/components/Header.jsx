import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { Sun, Moon, LogOut } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          UserManage
        </Link>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-600" />
            )}
          </button>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Logout"
            >
              <LogOut className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
