import {Component, signal} from '@angular/core';
import {ModalComponent} from '../../parts/modal/modal.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from '../../model/task';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  private fb = new FormBuilder();
  tasks = signal<Task[]>([]);
  showModal = signal(false);
  modalConfig = signal<any>({});
  taskForm: FormGroup;

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      category: ['todo', Validators.required]
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: Date.now(),
        title: this.taskForm.value.title,
        category: this.taskForm.value.category
      };

      this.tasks.update(tasks => [...tasks, newTask]);
      this.taskForm.reset({ category: 'todo' });
    }
  }

  editTask(task: Task): void {
    const updatedTitle = prompt('Update task title:', task.title);
    const updatedCategory = prompt(
      'Modifié la catégorie (todo, in-progress, completed, important):',
      task.category
    ) as 'todo' | 'in-progress' | 'completed' | 'important';

    const validCategories: Task['category'][] = ['todo', 'in-progress', 'completed', 'important'];
    if (updatedTitle && updatedCategory && validCategories.includes(updatedCategory)) {
      this.tasks.update((currentTasks: Task[]) =>
        currentTasks.map((t: Task) =>
          t.id === task.id
            ? { ...t, title: updatedTitle, category: updatedCategory }
            : t
        )
      );
    } else if (updatedCategory && !validCategories.includes(updatedCategory)) {
      alert('Catégorie invalide veuillez utilisé : todo , in-progresse , completed ou important.');
    }
  }



  deleteTask(task: Task) {
    this.modalConfig.set({
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"?`,
      onConfirm: () => {
        this.tasks.update(tasks => tasks.filter(t => t.id !== task.id));
        this.closeModal();
      }
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  getCategoryColor(category: string): string {
    const colors = {
      'todo': '--text-secondary',
      'in-progress': '--warning',
      'completed': '--success',
      'important': '--danger'
    };
    const colorVariable = colors[category as keyof typeof colors];
    return getComputedStyle(document.documentElement).getPropertyValue(colorVariable).trim() || 'black';
  }
  private ensureTask(obj: any): Task {
    return obj as Task; // Validation explicite, ou ajoutez une logique de vérification si nécessaire
  }

  toggleDoneStatus(task: Task): void {
    this.tasks.update((currentTasks: Task[]) =>
      currentTasks.map((t: Task) =>
        t.id === task.id
          ? this.ensureTask({ ...t, category: t.category === 'completed' ? 'todo' : 'completed' })
          : t
      )
    );
  }




}
