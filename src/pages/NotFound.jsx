import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Define icon components
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-6">
          <AlertTriangleIcon className="w-12 h-12 text-orange-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;