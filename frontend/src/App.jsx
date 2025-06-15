import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './components/dashboard/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </TaskProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
