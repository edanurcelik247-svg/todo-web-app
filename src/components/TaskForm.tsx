import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority, TaskInput } from '../interfaces/Task';
import { PRIORITY_LABELS } from '../interfaces/Task';

interface TaskFormProps {
  initialValues?: TaskInput;
  submitLabel: string;
  onSubmit: (input: TaskInput) => void;
  onCancel?: () => void;
}

const emptyForm: TaskInput = { title: '', description: '', priority: 'orta', dueDate: '' };

// Hem yeni görev eklerken hem de düzenlerken aynı form kullanılıyor
export default function TaskForm({ initialValues, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(initialValues ?? emptyForm);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Görev başlığı boş olamaz.');
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
    setError('');
    if (!initialValues) setForm(emptyForm);
  };

  const inputClass =
    'w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100';

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Başlık</label>
        <input
          className={inputClass}
          value={form.title}
          maxLength={80}
          placeholder="Örn. Sunum slaytlarını hazırla"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">Açıklama</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          maxLength={300}
          value={form.description}
          placeholder="Kısa bir not ekleyebilirsin"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Öncelik</label>
          <select
            className={inputClass}
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
          >
            {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">Son tarih</label>
          <input
            type="date"
            className={inputClass}
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>
      </div>

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
        >
          {submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-100"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
