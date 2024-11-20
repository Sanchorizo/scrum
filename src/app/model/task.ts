export interface Task {
  id: number;
  title: string;
  category: 'a faire' | 'en cours' | 'done' | 'important';
}
