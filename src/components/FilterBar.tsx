import type { TaskFilter } from '../interfaces/Task';

interface FilterBarProps {
  filter: TaskFilter;
  search: string;
  onFilterChange: (filter: TaskFilter) => void;
  onSearchChange: (value: string) => void;
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'tumu', label: 'Tümü' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'tamamlanan', label: 'Tamamlanan' },
];

export default function FilterBar({ filter, search, onFilterChange, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex rounded-lg bg-stone-200/70 p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              filter === f.value ? 'bg-white text-teal-800 shadow-sm' : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <input
        type="search"
        value={search}
        placeholder="Görevlerde ara..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 sm:w-60"
      />
    </div>
  );
}
