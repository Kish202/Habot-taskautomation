import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PlayCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

const StatsCard = ({ title, value, variant = "default" }) => {
  const { isDark } = React.useContext(ThemeContext);

  // Map statuses to icons and colors
  const statusConfig = {
    Running: {
      icon: PlayCircle,
      color: isDark ? 'text-blue-400' : 'text-blue-600',
    },
    Completed: {
      icon: CheckCircle,
      color: isDark ? 'text-green-400' : 'text-green-600',
    },
    Failed: {
      icon: XCircle,
      color: isDark ? 'text-red-400' : 'text-red-600',
    },
    Scheduled: {
      icon: Clock,
      color: isDark ? 'text-yellow-400' : 'text-yellow-600',
    },
  };

  // Default to Scheduled if status is unknown
  const config = statusConfig[title] || statusConfig.Scheduled;
  const Icon = config.icon;

  return (
    <Card
      className={`
        transition-all duration-300 hover:scale-105 transform-gpu
        ${isDark
          ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50'
          : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-200/50'
        }
        backdrop-blur-xl shadow-xl hover:shadow-2xl
      `}
    >
      <CardContent className="p-6 text-center flex flex-col items-center">
        <div className="flex items-center justify-center mb-3">
          <Icon
            className={`
              w-8 h-8 ${config.color} 
              transition-transform duration-300 group-hover:scale-110
            `}
          />
        </div>
        <div
          className={`text-3xl font-bold mb-1 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {value}
        </div>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {title}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;