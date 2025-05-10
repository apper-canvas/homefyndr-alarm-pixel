import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const MoodEntryForm = ({ onSubmit }) => {
  // Mood states and their corresponding data
  const moodOptions = [
    { value: 5, label: 'Excellent', icon: 'SmilePlus', color: 'text-green-500' },
    { value: 4, label: 'Good', icon: 'Smile', color: 'text-green-400' },
    { value: 3, label: 'Okay', icon: 'Meh', color: 'text-yellow-400' },
    { value: 2, label: 'Bad', icon: 'Frown', color: 'text-orange-400' },
    { value: 1, label: 'Terrible', icon: 'FrownPlus', color: 'text-red-500' }
  ];

  // State for form fields
  const [moodRating, setMoodRating] = useState(3);
  const [activities, setActivities] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Activity options
  const activityOptions = [
    { id: 'exercise', label: 'Exercise', icon: 'Dumbbell' },
    { id: 'work', label: 'Work', icon: 'Briefcase' },
    { id: 'social', label: 'Social', icon: 'Users' },
    { id: 'family', label: 'Family', icon: 'Heart' },
    { id: 'hobby', label: 'Hobby', icon: 'Palette' },
    { id: 'relax', label: 'Relaxation', icon: 'Coffee' },
    { id: 'sleep', label: 'Sleep', icon: 'Moon' },
    { id: 'study', label: 'Study', icon: 'BookOpen' }
  ];

  // Handle activity selection
  const toggleActivity = (activityId) => {
    if (activities.includes(activityId)) {
      setActivities(activities.filter(id => id !== activityId));
    } else {
      setActivities([...activities, activityId]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare the mood entry data
    const entry = {
      rating: moodRating,
      activities,
      notes
    };
    
    // Simulate API call with timeout
    setTimeout(() => {
      onSubmit(entry);
      
      // Reset form (but keep mood rating as is)
      setActivities([]);
      setNotes('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6"
    >
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        {getIcon('PenSquare')({ className: "w-5 h-5 mr-2 text-primary" })}
        How are you feeling today?
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Mood Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Your mood</label>
          <div className="flex justify-between items-center gap-1">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => setMoodRating(mood.value)}
                className={`flex-1 flex flex-col items-center p-3 rounded-lg transition-all ${
                  moodRating === mood.value 
                    ? 'bg-primary/10 dark:bg-primary/20 border-2 border-primary'
                    : 'bg-surface-100 dark:bg-surface-700 border-2 border-transparent hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {getIcon(mood.icon)({ className: `w-8 h-8 mb-1 ${mood.color}` })}
                <span className="text-xs font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Activities */}
        <div>
          <label className="block text-sm font-medium mb-2">Activities today (optional)</label>
          <div className="grid grid-cols-4 gap-2">
            {activityOptions.map((activity) => (
              <button
                key={activity.id}
                type="button"
                onClick={() => toggleActivity(activity.id)}
                className={`flex flex-col items-center p-2 rounded-lg text-xs transition-all ${
                  activities.includes(activity.id)
                    ? 'bg-secondary/10 dark:bg-secondary/20 border border-secondary text-secondary dark:text-secondary-light'
                    : 'bg-surface-100 dark:bg-surface-700 border border-transparent hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {getIcon(activity.icon)({ className: "w-5 h-5 mb-1" })}
                <span>{activity.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's on your mind today?"
            className="input min-h-24 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Mood Entry'}
        </button>
      </form>
    </motion.div>
  );
};

export default MoodEntryForm;