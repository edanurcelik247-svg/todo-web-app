import { useEffect, useState } from 'react';
import type { Task, TaskInput } from '../interfaces/Task';

const STORAGE_KEY = 'gorev-panosu-tasks';

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Task[]) : [];
  } catch {
    return [];
  }
}

// Görev listesini tutar ve her değişiklikte LocalStorage'a yazar
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (input: TaskInput) => {
    const newTask: Task = {
      ...input,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, input: TaskInput) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...input } : t)));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, addTask, updateTask, toggleTask, deleteTask };
}
