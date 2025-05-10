import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, subDays, parseISO } from 'date-fns';
import Chart from 'react-apexcharts';
import getIcon from '../utils/iconUtils';

const MoodHistory = ({ entries, onDelete }) => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const [activeTab, setActiveTab] = useState('chart');

  // Prepare chart data when entries or time range changes
  useEffect(() => {
    if (!entries.length) return;

    // Calculate date range based on selected time range
    const today = new Date();
    let startDate;
    
    switch (timeRange) {
      case 'week':
        startDate = subDays(today, 7);
        break;
      case 'month':
        startDate = subDays(today, 30);
        break;
      case 'year':
        startDate = subDays(today, 365);
        break;
      default:
        startDate = subDays(today, 7);
    }

    // Filter entries within the selected date range
    const filteredEntries = entries.filter(entry => 
      new Date(entry.date) >= startDate && new Date(entry.date) <= today
    );
    
    // Sort entries by date
    const sortedEntries = [...filteredEntries].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    // Prepare data for chart
    const dates = sortedEntries.map(entry => format(parseISO(entry.date), 'MMM dd'));
    const ratings = sortedEntries.map(entry => entry.rating);
    
    // Configure chart options
    const options = {
      chart: {
        type: 'line',
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'Inter, ui-sans-serif, system-ui',
        background: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: ['#4f46e5'], // primary color
      xaxis: {
        categories: dates,
        labels: {
          style: {
            colors: '#64748b', // surface-500
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        min: 1,
        max: 5,
        tickAmount: 4,
        labels: {
          style: {
            colors: '#64748b', // surface-500
            fontSize: '12px',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        y: {
          formatter: (value) => {
            const moodLabels = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent'];
            return `${value} - ${moodLabels[value - 1]}`;
          }
        }
      },
      grid: {
        borderColor: '#e2e8f0', // surface-200
        strokeDashArray: 4,
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        }
      },
    };

    // Update chart data
    setChartData({
      series: [{
        name: 'Mood Rating',
        data: ratings
      }],
      options
    });
  }, [entries, timeRange]);

  // Helper to get mood icon based on rating
  const getMoodIcon = (rating) => {
    switch(rating) {
      case 5: return getIcon('SmilePlus')({ className: "w-5 h-5 text-green-500" });
      case 4: return getIcon('Smile')({ className: "w-5 h-5 text-green-400" });
      case 3: return getIcon('Meh')({ className: "w-5 h-5 text-yellow-400" });
      case 2: return getIcon('Frown')({ className: "w-5 h-5 text-orange-400" });
      case 1: return getIcon('FrownPlus')({ className: "w-5 h-5 text-red-500" });
      default: return getIcon('Meh')({ className: "w-5 h-5 text-yellow-400" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white dark:bg-surface-800 rounded-xl shadow-soft p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          {getIcon('ChartLine')({ className: "w-5 h-5 mr-2 text-primary" })}
          Mood History
        </h2>
        
        {/* Time range selector */}
        <div className="flex bg-surface-100 dark:bg-surface-700 rounded-lg p-1">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md ${
                timeRange === range 
                  ? 'bg-white dark:bg-surface-600 shadow-sm' 
                  : 'text-surface-600 dark:text-surface-400'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {entries.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mx-auto mb-4">
            {getIcon('Calendar')({ className: "w-8 h-8 text-surface-400" })}
          </div>
          <h3 className="text-lg font-medium mb-2">No mood entries yet</h3>
          <p className="text-surface-500 dark:text-surface-400">
            Record your first mood to start tracking your emotional wellbeing.
          </p>
        </div>
      ) : (
        <div className="h-64 md:h-72">
          <Chart options={chartData.options} series={chartData.series} type="line" height="100%" />
        </div>
      )}
    </motion.div>
  );
};

export default MoodHistory;