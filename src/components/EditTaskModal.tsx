import { useEffect } from 'react';
import type { Task, TaskInput } from '../interfaces/Task';
import TaskForm from './TaskForm';

interface EditTaskModalProps {
  task: Task;
  onSave: (id: string, input: TaskInput) => void;
  onClose: () => void;
}

export default function EditTaskModal({ task, onSave, onClose }: EditTaskModalProps) {
  // Esc tuşu ile kapatma
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-stone-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-stone-50 p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold text-stone-800">Görevi düzenle</h2>
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }}
          submitLabel="Kaydet"
          onSubmit={(input) => {
            onSave(task.id, input);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
