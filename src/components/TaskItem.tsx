import type { Task } from '../interfaces/Task';
import { PRIORITY_LABELS } from '../interfaces/Task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityStyles = {
  dusuk: 'bg-sky-100 text-sky-800',
  orta: 'bg-amber-100 text-amber-800',
  yuksek: 'bg-rose-100 text-rose-800',
};

function formatDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const today = new Date().toISOString().slice(0, 10);
  const isLate = !task.completed && task.dueDate !== '' && task.dueDate < today;

  return (
    <li className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-teal-700"
        aria-label="Tamamlandı olarak işaretle"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`font-semibold ${task.completed ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
            {task.title}
          </h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>

        {task.description && <p className="mt-1 text-sm break-words text-stone-600">{task.description}</p>}

        {task.dueDate && (
          <p className={`mt-2 text-xs ${isLate ? 'font-semibold text-rose-600' : 'text-stone-500'}`}>
            Son tarih: {formatDate(task.dueDate)}
            {isLate && ' (gecikti)'}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md px-2 py-1 text-sm text-teal-700 hover:bg-teal-50"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-md px-2 py-1 text-sm text-rose-600 hover:bg-rose-50"
        >
          Sil
        </button>
      </div>
    </li>
  );
}
