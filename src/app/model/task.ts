export interface Task {
  id: number;
  title: string;
  category: 'todo' | 'in-progress' | 'completed' | 'important';
}
