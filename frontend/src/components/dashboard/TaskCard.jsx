import React, { useContext } from 'react';
import { Play, FileText, Settings, Loader2, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from './StatusBadge.jsx';
import { ThemeContext } from '../../contexts/ThemeContext';
import { TaskContext } from '../../contexts/TaskContext';

const TaskCard = ({ task, onViewLogs, onEditConfig }) => {
  const { isDark } = useContext(ThemeContext);
  const { runningTasks, runTask } = useContext(TaskContext);
  // Handle Lucide icons as ForwardRef components
  const Icon = task.icon && typeof task.icon === 'object' && task.icon.$$typeof === Symbol.for('react.forward_ref')
    ? task.icon
    : Activity;
  console.log('task.icon:', task.icon, 'task.name:', task.name, 'icon.displayName:', Icon.displayName || 'Activity'); // Debug

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  return (
    <Card
      className={`
        transition-all duration-300 hover:scale-[1.02] transform-gpu
        ${isDark
          ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700/50 shadow-2xl shadow-gray-900/50'
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-200/50 shadow-2xl shadow-gray-300/30'
        }
        backdrop-blur-xl hover:shadow-3xl
        before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:to-transparent
        hover:before:from-blue-500/5 hover:before:to-purple-500/5 before:transition-all before:duration-300
      `}
    >
      <div
        className={`
          absolute inset-0.5 rounded-lg
          ${isDark ? 'shadow-inner shadow-gray-600/20' : 'shadow-inner shadow-gray-400/20'}
          pointer-events-none
        `}
      />
      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`
                p-3 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110
                ${isDark
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-blue-500/25'
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-400/25'
                }
              `}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle
                className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {task.name}
              </CardTitle>
              <CardDescription
                className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {task.category}
              </CardDescription>
            </div>
          </div>
          <StatusBadge status={task.status} />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-0">
        <p
          className={`mb-4 text-sm leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {task.description}
        </p>
        <div
          className={`grid grid-cols-2 gap-3 mb-6 text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <div>
            <span className="font-medium">Last Run:</span>
            <br />
            <span className="text-sm">{formatDate(task.lastRunTime)}</span>
          </div>
          <div>
            <span className="font-medium">Triggered By:</span>
            <br />
            <span className="text-sm">{task.triggeredBy}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => runTask(task.id)}
            disabled={task.status === 'Running' || runningTasks.has(task.id)}
            size="sm"
            className={`
              ${task.status === 'Running' || runningTasks.has(task.id)
                ? `${isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-300 text-gray-800'} opacity-70 cursor-not-allowed`
                : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-400/25'
              }
              transform transition-all duration-200 hover:scale-105 active:scale-95
            `}
          >
            {task.status === 'Running' || runningTasks.has(task.id) ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-1.5" />
            )}
            Run Now
          </Button>
          <Button
            onClick={() => onViewLogs(task)}
            variant="outline"
            size="sm"
            className={`
              ${isDark
                ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500/50 text-blue-300 hover:bg-blue-600/30'
                : 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-400/50 text-blue-600 hover:bg-blue-500/20'
              }
              shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95
            `}
          >
            <FileText className="w-4 h-4 mr-1.5" />
            View Logs
          </Button>
          <Button
            onClick={() => onEditConfig(task)}
            variant="ghost"
            size="sm"
            className={`
              ${isDark
                ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
              }
              transform transition-all duration-200 hover:scale-105 active:scale-95
            `}
          >
            <Settings className="w-4 h-4 mr-1.5" />
            Edit Config
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;




