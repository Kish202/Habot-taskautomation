import React, { useContext, useState } from 'react';
import { Activity, Loader2, Plus, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TaskCard from './TaskCard.jsx';
import NewTaskModal from './NewTaskModal.jsx';
import ViewLogsModal from './ViewLogsModal.jsx';
import StatsCard from './StatsCard.jsx';
import { ThemeContext } from '../../contexts/ThemeContext';
import { TaskContext } from '../../contexts/TaskContext';

const Dashboard = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const taskContext = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskForLogs, setTaskForLogs] = useState(null);

  if (!taskContext) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
        }`}
      >
        <Card
          className={`p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="text-center">
            <p
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Error: Task context not available. Please check the application setup.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const { tasks, loading, getStatusCounts } = taskContext;

  console.log('Tasks in Dashboard:', tasks);

  const handleViewLogs = (task) => {
    console.log('Viewing logs for task:', task);
    setTaskForLogs(task);
    setIsLogsModalOpen(true);
  };

  const handleEditConfig = (task) => {
    console.log('Editing task:', task);
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleCloseLogsModal = () => {
    setIsLogsModalOpen(false);
    setTaskForLogs(null);
  };

  const statusCounts = getStatusCounts();
  console.log('Status counts in Dashboard:', statusCounts);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
        }`}
      >
        <Card
          className={`p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="text-center">
            <Loader2
              className={`animate-spin rounded-full h-16 w-16 mx-auto mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}
            />
            <p
              className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Loading automation tasks...
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-gray-100 via-white to-gray-200'
        }`}
    >
      <header
        className={`
          sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300
          ${isDark ? 'bg-gray-900/80 border-gray-700' : 'bg-white/30 border-gray-200'}
          shadow-lg
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div
                className={`
                  p-2 rounded-xl shadow-lg
                  ${isDark ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}
                `}
              >
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1
                className={`md:text-2xl text-xl  max-sm:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                Task Automation Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className={`
                  ${isDark ? 'text-yellow-400 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                  transform hover:scale-110 transition-all duration-200
                `}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Automation
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => (
            <StatsCard key={status} title={status} value={count} />
          ))}
          {Object.keys(statusCounts).length === 0 && (
            <Card
              className={`p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No status data available
              </p>
            </Card>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onViewLogs={handleViewLogs}
              onEditConfig={handleEditConfig}
            />
          ))}
        </div>
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <Card
              className={`p-8 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <Activity
                className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}
              />
              <h3
                className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
              >
                No automation tasks found
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Create your first automation task to get started.
              </p>
            </Card>
          </div>
        )}
      </main>
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />
      <ViewLogsModal
        isOpen={isLogsModalOpen}
        onClose={handleCloseLogsModal}
        task={taskForLogs}
      />
    </div>
  );
};

export default Dashboard;
