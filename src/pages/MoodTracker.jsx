import { useState, useEffect, createElement } from 'react';
import { motion } from 'framer-motion'; 
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MoodEntryForm from '../components/MoodEntryForm';
import MoodHistory from '../components/MoodHistory';

const MoodTracker = () => {
  // State for storing all mood entries
  const [moodEntries, setMoodEntries] = useState(() => {
    // Load from localStorage if available
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Function to add a new mood entry
  const addMoodEntry = (entry) => {
    // Create a new entry with timestamp
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    
    setMoodEntries(prevEntries => [newEntry, ...prevEntries]);
    
    toast.success('Mood entry saved successfully!', {
      // Create the element properly using createElement
      icon: createElement(getIcon('Check'), { className: 'w-5 h-5' }),
    });
  };

  // Function to delete a mood entry
  const deleteMoodEntry = (id) => {
    setMoodEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    
    toast.info('Mood entry deleted', {
      // Create the element properly using createElement
      icon: createElement(getIcon('Trash'), { className: 'w-5 h-5' }),
    });
  };

  return (
    <div className="bg-surface-50 dark:bg-surface-900 min-h-screen">
      <section className="py-12 bg-gradient-to-br from-primary/90 to-primary-dark/90 dark:from-primary-dark/90 dark:to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              {/* Render the component correctly in JSX */}
              {createElement(getIcon('Smile'), { className: "w-8 h-8" })}
              <span>Mood Tracker</span>
            </h1>
            <p className="text-lg opacity-90 mb-0">
              Track how you feel day by day to understand your emotional patterns
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-1">
            <MoodEntryForm onSubmit={addMoodEntry} />
          </div>
          
          {/* Mood History */}
          <div className="lg:col-span-2">
            <MoodHistory 
              entries={moodEntries} 
              onDelete={deleteMoodEntry} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;