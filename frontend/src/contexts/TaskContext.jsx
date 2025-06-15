import React, { createContext, useState, useEffect, useCallback } from 'react';
import TaskService from '../services/TaskService';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runningTasks, setRunningTasks] = useState(new Set());

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedTasks = await TaskService.fetchTasks();
      console.log('Fetched tasks:', fetchedTasks);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = async (taskData) => {
    try {
      const newTask = await TaskService.createTask(taskData);
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        console.log('After createTask, tasks:', updatedTasks);
        return updatedTasks;
      });
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await TaskService.updateTask(taskId, taskData);
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        );
        console.log('After updateTask, tasks:', updatedTasks);
        return updatedTasks;
      });
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await TaskService.updateTaskStatus(taskId, newStatus);
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        );
        console.log('After updateTaskStatus, tasks:', updatedTasks);
        return updatedTasks;
      });
      return updatedTask;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  };

  const runTask = async (taskId) => {
    if (runningTasks.has(taskId)) return;

    setRunningTasks((prev) => new Set([...prev, taskId]));

    try {
      await updateTaskStatus(taskId, 'Running');

      setTimeout(async () => {
        await updateTaskStatus(taskId, 'Completed');
        setRunningTasks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
      }, 3000);
    } catch (error) {
      console.error('Error running task:', error);
      setRunningTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  const getStatusCounts = () => {
    const counts = tasks.reduce((acc, task) => {
      const status = task.status || 'Scheduled';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    console.log('Status counts:', counts);
    return counts;
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        runningTasks,
        loadTasks,
        createTask,
        updateTask,
        runTask,
        getStatusCounts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};