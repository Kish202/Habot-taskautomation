import React, { useState, useContext, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ThemeContext } from '../../contexts/ThemeContext';
import { TaskContext } from '../../contexts/TaskContext';

const NewTaskModal = ({ isOpen, onClose, taskToEdit }) => {
  const { isDark } = useContext(ThemeContext);
  const { createTask, updateTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'Manual',
    description: '',
    category: 'General',
    iconName: 'Activity',
    status: 'Scheduled',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        name: taskToEdit.name || '',
        triggerType: taskToEdit.triggerType || 'Manual',
        description: taskToEdit.description || '',
        category: taskToEdit.category || 'General',
        iconName: taskToEdit.iconName || 'Activity',
        status: taskToEdit.status || 'Scheduled',
      });
    } else {
      setFormData({
        name: '',
        triggerType: 'Manual',
        description: '',
        category: 'General',
        iconName: 'Activity',
        status: 'Scheduled',
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        console.log('Updating task:', taskToEdit.id, formData);
        await updateTask(taskToEdit.id, formData);
      } else {
        console.log('Creating task:', formData);
        await createTask(formData);
      }
      setFormData({
        name: '',
        triggerType: 'Manual',
        description: '',
        category: 'General',
        iconName: 'Activity',
        status: 'Scheduled',
      });
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          sm:max-w-md
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
            {taskToEdit ? 'Edit Automation' : 'Create New Automation'}
          </DialogTitle>
          <DialogDescription
            className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {taskToEdit
              ? 'Update your automation task details'
              : 'Configure a new automation task for your workflow'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Rule Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter automation rule name"
              className={`
                ${isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }
                transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
              `}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="trigger"
              className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Trigger Type
            </Label>
            <Select
              value={formData.triggerType}
              onValueChange={(value) =>
                setFormData({ ...formData, triggerType: value })
              }
            >
              <SelectTrigger
                className={`
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger
                className={`
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Data">Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="iconName"
              className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Icon
            </Label>
            <Select
              value={formData.iconName}
              onValueChange={(value) =>
                setFormData({ ...formData, iconName: value })
              }
            >
              <SelectTrigger
                className={`
                  ${isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                `}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activity">Activity</SelectItem>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="Server">Server</SelectItem>
                <SelectItem value="Mail">Mail</SelectItem>
                <SelectItem value="Shield">Shield</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe what this automation does..."
              className={`
                ${isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
                }
                resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
              `}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.name.trim()}
            className={`
              flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
              text-white shadow-lg disabled:opacity-50
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {taskToEdit ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              taskToEdit ? 'Update Task' : 'Create Task'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;




// import React, { useState, useContext, useEffect } from 'react';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { ThemeContext } from '../../contexts/ThemeContext';
// import { TaskContext } from '../../contexts/TaskContext';

// const NewTaskModal = ({ isOpen, onClose, taskToEdit }) => {
//   const { isDark } = useContext(ThemeContext);
//   const { createTask, updateTask } = useContext(TaskContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     triggerType: 'Manual',
//     description: '',
//     category: 'General',
//     iconName: 'Activity',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (taskToEdit) {
//       setFormData({
//         name: taskToEdit.name || '',
//         triggerType: taskToEdit.triggerType || 'Manual',
//         description: taskToEdit.description || '',
//         category: taskToEdit.category || 'General',
//         iconName: taskToEdit.iconName || 'Activity',
//       });
//     } else {
//       setFormData({
//         name: '',
//         triggerType: 'Manual',
//         description: '',
//         category: 'General',
//         iconName: 'Activity',
//       });
//     }
//   }, [taskToEdit]);

//   const handleSubmit = async () => {
//     if (!formData.name.trim()) return;

//     setIsSubmitting(true);
//     try {
//       if (taskToEdit) {
//         await updateTask(taskToEdit.id, formData);
//       } else {
//         await createTask(formData);
//       }
//       setFormData({
//         name: '',
//         triggerType: 'Manual',
//         description: '',
//         category: 'General',
//         iconName: 'Activity',
//       });
//       onClose();
//     } catch (error) {
//       console.error('Error saving task:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent
//         className={`
//           sm:max-w-md
//           ${isDark
//             ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700'
//             : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
//           }
//           backdrop-blur-xl shadow-2xl
//         `}
//       >
//         <DialogHeader>
//           <DialogTitle
//             className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
//           >
//             {taskToEdit ? 'Edit Automation' : 'Create New Automation'}
//           </DialogTitle>
//           <DialogDescription
//             className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}
//           >
//             {taskToEdit
//               ? 'Update your automation task details'
//               : 'Configure a new automation task for your workflow'}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="space-y-2">
//             <Label
//               htmlFor="name"
//               className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//             >
//               Rule Name *
//             </Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               placeholder="Enter automation rule name"
//               className={`
//                 ${isDark
//                   ? 'bg-gray-700 border-gray-600 text-white'
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//                 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
//               `}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="trigger"
//               className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//             >
//               Trigger Type
//             </Label>
//             <Select
//               value={formData.triggerType}
//               onValueChange={(value) =>
//                 setFormData({ ...formData, triggerType: value })
//               }
//             >
//               <SelectTrigger
//                 className={`
//                   ${isDark
//                     ? 'bg-gray-700 border-gray-600 text-white'
//                     : 'bg-white border-gray-300 text-gray-900'
//                   }
//                 `}
//               >
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Manual">Manual</SelectItem>
//                 <SelectItem value="Daily">Daily</SelectItem>
//                 <SelectItem value="Weekly">Weekly</SelectItem>
//                 <SelectItem value="Monthly">Monthly</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="category"
//               className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//             >
//               Category
//             </Label>
//             <Select
//               value={formData.category}
//               onValueChange={(value) =>
//                 setFormData({ ...formData, category: value })
//               }
//             >
//               <SelectTrigger
//                 className={`
//                   ${isDark
//                     ? 'bg-gray-700 border-gray-600 text-white'
//                     : 'bg-white border-gray-300 text-gray-900'
//                   }
//                 `}
//               >
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="General">General</SelectItem>
//                 <SelectItem value="Database">Database</SelectItem>
//                 <SelectItem value="Analytics">Analytics</SelectItem>
//                 <SelectItem value="Infrastructure">Infrastructure</SelectItem>
//                 <SelectItem value="Marketing">Marketing</SelectItem>
//                 <SelectItem value="Security">Security</SelectItem>
//                 <SelectItem value="HR">HR</SelectItem>
//                 <SelectItem value="Data">Data</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="iconName"
//               className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//             >
//               Icon
//             </Label>
//             <Select
//               value={formData.iconName}
//               onValueChange={(value) =>
//                 setFormData({ ...formData, iconName: value })
//               }
//             >
//               <SelectTrigger
//                 className={`
//                   ${isDark
//                     ? 'bg-gray-700 border-gray-600 text-white'
//                     : 'bg-white border-gray-300 text-gray-900'
//                   }
//                 `}
//               >
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Activity">Activity</SelectItem>
//                 <SelectItem value="Database">Database</SelectItem>
//                 <SelectItem value="Server">Server</SelectItem>
//                 <SelectItem value="Mail">Mail</SelectItem>
//                 <SelectItem value="Shield">Shield</SelectItem>
//                 <SelectItem value="User">User</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label
//               htmlFor="description"
//               className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
//             >
//               Description
//             </Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               placeholder="Describe what this automation does..."
//               className={`
//                 ${isDark
//                   ? 'bg-gray-700 border-gray-600 text-white'
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//                 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
//               `}
//               rows={3}
//             />
//           </div>
//         </div>

//         <div className="flex gap-3 pt-4">
//           <Button
//             onClick={onClose}
//             variant="outline"
//             disabled={isSubmitting}
//             className="flex-1"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting || !formData.name.trim()}
//             className={`
//               flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
//               text-white shadow-lg disabled:opacity-50
//             `}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 {taskToEdit ? 'Updating...' : 'Creating...'}
//               </>
//             ) : (
//               taskToEdit ? 'Update Task' : 'Create Task'
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default NewTaskModal;


// import React, { useState } from 'react';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { ThemeContext } from '../../contexts/ThemeContext';
// // ... (rest of the NewTaskModal component code as provided)

// const NewTaskModal = ({ isOpen, onClose, onSubmit }) => {
//   const { isDark } = React.useContext(ThemeContext);
//   const [formData, setFormData] = useState({
//     name: '',
//     triggerType: 'Manual',
//     description: '',
//     category: 'General'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!formData.name.trim()) return;
    
//     setIsSubmitting(true);
//     try {
//       await onSubmit(formData);
//       setFormData({ name: '', triggerType: 'Manual', description: '', category: 'General' });
//       onClose();
//     } catch (error) {
//       console.error('Error creating task:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className={`
//         sm:max-w-md
//         ${isDark 
//           ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' 
//           : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
//         }
//         backdrop-blur-xl shadow-2xl
//       `}>
//         <DialogHeader>
//           <DialogTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
//             Create New Automation
//           </DialogTitle>
//           <DialogDescription className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//             Configure a new automation task for your workflow
//           </DialogDescription>
//         </DialogHeader>
        
//         <div className="space-y-4 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="name" className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               Rule Name *
//             </Label>
//             <Input
//               id="name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               placeholder="Enter automation rule name"
//               className={`
//                 ${isDark 
//                   ? 'bg-gray-700 border-gray-600 text-white' 
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//                 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
//               `}
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="trigger" className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               Trigger Type
//             </Label>
//             <Select value={formData.triggerType} onValueChange={(value) => setFormData({ ...formData, triggerType: value })}>
//               <SelectTrigger className={`
//                 ${isDark 
//                   ? 'bg-gray-700 border-gray-600 text-white' 
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//               `}>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Manual">Manual</SelectItem>
//                 <SelectItem value="Daily">Daily</SelectItem>
//                 <SelectItem value="Weekly">Weekly</SelectItem>
//                 <SelectItem value="Monthly">Monthly</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="category" className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               Category
//             </Label>
//             <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
//               <SelectTrigger className={`
//                 ${isDark 
//                   ? 'bg-gray-700 border-gray-600 text-white' 
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//               `}>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="General">General</SelectItem>
//                 <SelectItem value="Database">Database</SelectItem>
//                 <SelectItem value="Analytics">Analytics</SelectItem>
//                 <SelectItem value="Infrastructure">Infrastructure</SelectItem>
//                 <SelectItem value="Marketing">Marketing</SelectItem>
//                 <SelectItem value="Security">Security</SelectItem>
//                 <SelectItem value="HR">HR</SelectItem>
//                 <SelectItem value="Data">Data</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
          
//           <div className="space-y-2">
//             <Label htmlFor="description" className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//               Description
//             </Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               placeholder="Describe what this automation does..."
//               className={`
//                 ${isDark 
//                   ? 'bg-gray-700 border-gray-600 text-white' 
//                   : 'bg-white border-gray-300 text-gray-900'
//                 }
//                 resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/20
//               `}
//               rows={3}
//             />
//           </div>
//         </div>
        
//         <div className="flex gap-3 pt-4">
//           <Button
//             onClick={onClose}
//             variant="outline"
//             disabled={isSubmitting}
//             className="flex-1"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             disabled={isSubmitting || !formData.name.trim()}
//             className={`
//               flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600
//               text-white shadow-lg disabled:opacity-50
//             `}
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Creating...
//               </>
//             ) : (
//               'Create Task'
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
// export default NewTaskModal;