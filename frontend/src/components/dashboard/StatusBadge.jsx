import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Running: { 
      variant: 'default',
      className: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white animate-pulse shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40', 
      icon: Clock
    },
    Completed: { 
      variant: 'secondary',
      className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40', 
      icon: CheckCircle
    },
    Failed: { 
      variant: 'destructive',
      className: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40', 
      icon: XCircle
    },
    Scheduled: { 
      variant: 'outline',
      className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40', 
      icon: Calendar
    }
  };

  const config = statusConfig[status] || statusConfig.Scheduled;
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant}
      className={`${config.className} px-3 py-1.5 font-medium transition-all duration-300 transform hover:scale-105`}
    >
      <Icon className="w-4 h-4 mr-1.5" />
      {status}
    </Badge>
  );
};

export default StatusBadge;