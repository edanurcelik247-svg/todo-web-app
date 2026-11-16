import { useState } from 'react';
import type { Task, TaskFilter } from '../interfaces/Task';
import { useTasks } from '../hooks/useTasks';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';

export default function HomePage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask } = useTasks();
  const [filter, setFilter] = useState<TaskFilter>('tumu');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const completedCount = tasks.filter((t) => t.completed).length;

  // Önce filtreye, sonra arama metnine göre süzülüyor
  const visibleTasks = tasks
    .filter((t) => (filter === 'aktif' ? !t.completed : filter === 'tamamlanan' ? t.completed : true))
    .filter((t) => {
      const text = (t.title + ' ' + t.description).toLocaleLowerCase('tr');
      return text.includes(search.trim().toLocaleLowerCase('tr'));
    });

  const handleDelete = (id: string) => {
    if (window.confirm('Bu görevi silmek istediğine emin misin?')) deleteTask(id);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <Header total={tasks.length} completed={completedCount} />

      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[320px_1fr]">
        <section className="h-fit rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-stone-800">Yeni görev</h2>
          <TaskForm submitLabel="Görev ekle" onSubmit={addTask} />
        </section>

        <section className="space-y-4">
          <FilterBar filter={filter} search={search} onFilterChange={setFilter} onSearchChange={setSearch} />
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onEdit={setEditingTask} onDelete={handleDelete} />
        </section>
      </main>

      {editingTask && (
        <EditTaskModal task={editingTask} onSave={updateTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  );
}
