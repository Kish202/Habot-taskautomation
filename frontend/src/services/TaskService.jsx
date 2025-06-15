import { delay } from '../utils/delay';
import { getStorageData, setStorageData } from '../utils/storage';
import { Database, Activity, Server, Mail, Shield, User } from 'lucide-react';

const iconMap = {
  Database,
  Activity,
  Server,
  Mail,
  Shield,
  User,
};

const validIconNames = Object.keys(iconMap); // ['Database', 'Activity', ...]

const normalizeIconName = (iconName) => {
  if (!iconName || typeof iconName !== 'string') {
    console.warn(`Invalid iconName: ${iconName}, defaulting to Activity`);
    return 'Activity';
  }
  // Trim and capitalize first letter (e.g., 'database' -> 'Database')
  const normalized = iconName.trim().replace(/^\w/, (c) => c.toUpperCase());
  if (!validIconNames.includes(normalized)) {
    console.warn(`Icon ${normalized} not found in iconMap, defaulting to Activity`);
    return 'Activity';
  }
  return normalized;
};

const defaultTasks = [
  {
    id: 1,
    name: 'Daily Database Backup',
    status: 'Completed',
    lastRunTime: '2025-06-15T02:00:00Z',
    triggeredBy: 'System Scheduler',
    description: 'Automated daily backup of production database',
    category: 'Database',
    triggerType: 'Daily',
    iconName: 'Database',
  },
  {
    id: 2,
    name: 'User Activity Report',
    status: 'Running',
    lastRunTime: '2025-06-15T08:30:00Z',
    triggeredBy: 'Analytics Engine',
    description: 'Generate user activity reports',
    category: 'Analytics',
    triggerType: 'Weekly',
    iconName: 'Activity',
  },
  {
    id: 3,
    name: 'Server Health Monitoring',
    status: 'Scheduled',
    lastRunTime: '2025-06-15T07:45:00Z',
    triggeredBy: 'Monitoring Agent',
    description: 'Monitor server resources',
    category: 'Infrastructure',
    triggerType: 'Manual',
    iconName: 'Server',
  },
  {
    id: 4,
    name: 'Email Campaign Automation',
    status: 'Failed',
    lastRunTime: '2025-06-15T06:15:00Z',
    triggeredBy: 'Marketing Team',
    description: 'Automated email campaigns for customer engagement and retention',
    category: 'Marketing',
    iconName: 'Mail',
  },
  {
    id: 5,
    name: 'Security Audit Scanner',
    status: 'Completed',
    lastRunTime: '2025-06-15T03:20:00Z',
    triggeredBy: 'Security Team',
    description: 'Automated security vulnerability scanning and compliance checks',
    category: 'Security',
    iconName: 'Shield',
  },
  {
    id: 6,
    name: 'User Onboarding Workflow',
    status: 'Scheduled',
    lastRunTime: '2025-06-14T16:30:00Z',
    triggeredBy: 'HR Portal',
    description: 'Streamlined new user account creation and permission assignment',
    category: 'HR',
    iconName: 'User',
  },
  {
    id: 7,
    name: 'Data Synchronization Process',
    status: 'Running',
    lastRunTime: '2025-06-15T09:00:00Z',
    triggeredBy: 'Data Pipeline',
    description: 'Real-time synchronization between multiple data sources and warehouses',
    category: 'Data',
    iconName: 'Database',
  },
];

const TaskService = {
  fetchTasks: async () => {
    await delay(800);
    let storedTasks = getStorageData('automationTasks', []);
    if (!Array.isArray(storedTasks)) {
      storedTasks = [...defaultTasks]; // Initialize with defaultTasks
      setStorageData('automationTasks', storedTasks);
      console.log('Initialized localStorage with defaultTasks:', storedTasks);
    }

    // Merge defaultTasks and storedTasks, prioritizing storedTasks for duplicates
    const taskMap = new Map();
    defaultTasks.forEach((task) => taskMap.set(task.id, { ...task }));
    storedTasks.forEach((task) => taskMap.set(task.id, { ...task }));

    const mergedTasks = Array.from(taskMap.values()).map((task) => {
      const normalizedIconName = normalizeIconName(task.iconName);
      const icon = iconMap[normalizedIconName] || Activity;
      console.log(`Task: ${task.name}, iconName: ${task.iconName}, normalized: ${normalizedIconName}, icon: ${icon.displayName || 'Activity'}`);
      return {
        ...task,
        status: task.status || 'Scheduled',
        icon: icon,
      };
    });

    console.log('Merged tasks:', mergedTasks.map(t => ({ name: t.name, iconName: t.iconName, icon: t.icon.displayName || 'Activity' })));
    return mergedTasks;
  },

  updateTaskStatus: async (taskId, newStatus) => {
    await delay(1500);
    let tasks = getStorageData('automationTasks', []);
    if (!Array.isArray(tasks)) {
      tasks = [...defaultTasks];
      setStorageData('automationTasks', tasks);
    }

    // If taskId is a default task not in localStorage, add it
    if (!tasks.some(task => task.id === taskId)) {
      const defaultTask = defaultTasks.find(task => task.id === taskId);
      if (defaultTask) {
        tasks.push({ ...defaultTask });
        console.log(`Added default task ${taskId} to localStorage for status update`);
      }
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: newStatus, lastRunTime: new Date().toISOString() }
        : task
    );
    setStorageData('automationTasks', updatedTasks);
    console.log('After updateTaskStatus, stored tasks:', updatedTasks);
    const updatedTask = updatedTasks.find((task) => task.id === taskId);
    if (!updatedTask) return null;
    const normalizedIconName = normalizeIconName(updatedTask.iconName);
    const icon = iconMap[normalizedIconName] || Activity;
    return {
      ...updatedTask,
      icon: icon,
    };
  },

  createTask: async (taskData) => {
    await delay(1000);
    let tasks = getStorageData('automationTasks', []);
    if (!Array.isArray(tasks)) {
      tasks = [...defaultTasks];
      setStorageData('automationTasks', tasks);
    }

    const normalizedIconName = normalizeIconName(taskData.iconName);
    const newTask = {
      ...taskData,
      id: Date.now(), // Unique ID for new tasks
      status: 'Scheduled',
      lastRunTime: new Date().toISOString(),
      triggeredBy: 'Manual Creation',
      iconName: normalizedIconName,
    };
    const updatedTasks = [...tasks, newTask];
    setStorageData('automationTasks', updatedTasks);
    console.log('After createTask, stored tasks:', updatedTasks);
    const icon = iconMap[normalizedIconName] || Activity;
    return {
      ...newTask,
      icon: icon,
    };
  },


  updateTask: async (taskId, taskData) => {
    await delay(1000);
    let tasks = getStorageData('automationTasks', []);
    if (!Array.isArray(tasks)) {
      tasks = [...defaultTasks];
      setStorageData('automationTasks', tasks);
    }

    
    if (!tasks.some(task => task.id === taskId)) {
      const defaultTask = defaultTasks.find(task => task.id === taskId);
      if (defaultTask) {
        tasks.push({ ...defaultTask });
        console.log(`Added default task ${taskId} to localStorage for update`);
      } else {
        console.warn(`Task ${taskId} not found in defaultTasks or localStorage`);
        return null;
      }
    }

    const normalizedIconName = normalizeIconName(taskData.iconName);
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            ...taskData,
            status: taskData.status || task.status || 'Scheduled',
            lastRunTime: new Date().toISOString(),
            triggeredBy: 'Manual Update',
            iconName: normalizedIconName || task.iconName || 'Activity',
          }
        : task
    );
    setStorageData('automationTasks', updatedTasks);
    console.log('After updateTask, stored tasks:', updatedTasks);
    const updatedTask = updatedTasks.find((task) => task.id === taskId);
    if (!updatedTask) {
      console.warn(`Updated task ${taskId} not found after update`);
      return null;
    }
    const icon = iconMap[normalizedIconName] || Activity;
    return {
      ...updatedTask,
      icon: icon,
    };
  },
};

export default TaskService;



