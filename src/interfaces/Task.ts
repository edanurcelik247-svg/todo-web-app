export type Priority = 'dusuk' | 'orta' | 'yuksek';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string; // yyyy-mm-dd, boş olabilir
  completed: boolean;
  createdAt: string;
}

// Formdan gelen alanlar
export type TaskInput = Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'>;

export type TaskFilter = 'tumu' | 'aktif' | 'tamamlanan';

export const PRIORITY_LABELS: Record<Priority, string> = {
  dusuk: 'Düşük',
  orta: 'Orta',
  yuksek: 'Yüksek',
};
