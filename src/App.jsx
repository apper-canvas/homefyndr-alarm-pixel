import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import getIcon from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MoodTracker from './pages/MoodTracker';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has already set a preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      // Check system preference if no saved preference
      if (savedMode === null) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return savedMode === 'true';
    }
    return false;
  });

  useEffect(() => {
    // Update localStorage and document class when dark mode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, {
      icon: !darkMode ? "🌙" : "☀️",
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: !darkMode ? "dark" : "light"
    });
  };

  // Define icon components
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const HomeIcon = getIcon('Home');
  const SmileIcon = getIcon('Smile');
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-surface-800 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">HomeFyndr</span>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors">
                  Home
                </a>
                <a href="/mood-tracker" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors flex items-center">
                  <SmileIcon className="w-4 h-4 mr-1" /> Mood Tracker
                </a>
              </nav>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <SunIcon className="w-5 h-5 text-yellow-400" /> : <MoonIcon className="w-5 h-5 text-surface-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-center md:text-left text-surface-600 dark:text-surface-400 text-sm">
                © {new Date().getFullYear()} HomeFyndr. All rights reserved.
              </p>
            </div>
            <div>
              <ul className="flex space-x-4 justify-center md:justify-end">
                <li>
                  <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors text-sm">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors text-sm">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-surface-600 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="text-sm"
      />
    </div>
  );
}

export default App;