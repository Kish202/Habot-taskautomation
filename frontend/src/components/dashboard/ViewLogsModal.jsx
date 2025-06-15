import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const ViewLogsModal = ({ isOpen, onClose, task }) => {
  const { isDark } = useContext(ThemeContext);

  if (!task) return null;

  const logs = [
    'Task initiated successfully',
    'Processing data...',
    `Status: ${task.status}`,
    `Last run: ${new Date(task.lastRunTime).toLocaleString()}`,
  ];

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(`Task Logs: ${task.name}`, 20, 20);
    
    doc.setFontSize(12);
    doc.text('Task Details', 20, 30);
    doc.text(`Name: ${task.name}`, 20, 40);
    doc.text(`Category: ${task.category}`, 20, 48);
    doc.text(`Status: ${task.status}`, 20, 56);
    doc.text(`Last Run: ${new Date(task.lastRunTime).toLocaleString()}`, 20, 64);
    doc.text(`Triggered By: ${task.triggeredBy}`, 20, 72);
    doc.text(`Description: ${task.description || 'N/A'}`, 20, 80);
    doc.text(`Trigger Type: ${task.triggerType}`, 20, 88);
    doc.text(`Icon: ${task.iconName}`, 20, 96);

    doc.text('Log Entries', 20, 108);
    logs.forEach((log, index) => {
      doc.text(`- ${log}`, 20, 116 + index * 8);
    });

    doc.save(`logs_${task.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          sm:max-w-lg
          ${isDark
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
            : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
          }
          backdrop-blur-xl shadow-2xl
        `}
      >
        <DialogHeader>
          <DialogTitle
            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Logs for {task.name}
          </DialogTitle>
          <DialogDescription
            className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            View the latest log entries for this task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div
            className={`
              p-4 rounded-lg
              ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
            `}
          >
            <h4
              className={`text-sm font-semibold mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Task Details
            </h4>
            <div
              className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              <p><strong>Name:</strong> {task.name}</p>
              <p><strong>Category:</strong> {task.category}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Last Run:</strong> {new Date(task.lastRunTime).toLocaleString()}</p>
              <p><strong>Triggered By:</strong> {task.triggeredBy}</p>
              <p><strong>Description:</strong> {task.description || 'N/A'}</p>
              <p><strong>Trigger Type:</strong> {task.triggerType}</p>
              <p><strong>Icon:</strong> {task.iconName}</p>
            </div>
          </div>
          <div
            className={`
              p-4 rounded-lg
              ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
            `}
          >
            <h4
              className={`text-sm font-semibold mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Log Entries
            </h4>
            <ul
              className={`text-sm list-disc pl-5 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Close
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className={`
              flex-1 bg-gradient-to-r from-blue-500 to-indigo-500
              hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg
            `}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLogsModal;