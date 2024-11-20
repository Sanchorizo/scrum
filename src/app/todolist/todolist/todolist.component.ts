import {Component, signal} from '@angular/core';
import {ModalComponent} from '../../parts/modal/modal.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from '../../model/task';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [
    ModalComponent,
    ReactiveFormsModule,
    NgForOf
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
      category: ['a faire', Validators.required]
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
      this.taskForm.reset({ category: 'a faire' });
    }
  }

  editTask(task: Task): void {
    const updatedTitle = prompt('Mettre a jour le nom de la tache:', task.title);
    const updatedCategory = prompt(
      'Modifié la catégorie (a faire, en cours, done, important):',
      task.category
    ) as 'a faire' | 'en cours' | 'done' | 'important';

    const validCategories: Task['category'][] = ['a faire', 'en cours', 'done', 'important'];
    if (updatedTitle && updatedCategory && validCategories.includes(updatedCategory)) {
      this.tasks.update((currentTasks: Task[]) =>
        currentTasks.map((t: Task) =>
          t.id === task.id
            ? { ...t, title: updatedTitle, category: updatedCategory }
            : t
        )
      );
    } else if (updatedCategory && !validCategories.includes(updatedCategory)) {
      alert('Catégorie invalide veuillez utilisé : a faire , en cours , done ou important.');
    }
  }



  deleteTask(task: Task) {
    this.modalConfig.set({
      title: 'Supprimé la tâche',
      message: `voulez vous vraiment supprimé :  "${task.title}"?`,
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
      'a faire': '--text-secondary',
      'en cours': '--warning',
      'done': '--success',
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
          ? this.ensureTask({ ...t, category: t.category === 'done' ? 'a faire' : 'done' })
          : t
      )
    );
  }

  getCategories(): Task['category'][] {
    return ['a faire', 'en cours', 'done', 'important'];
  }

  tasksByCategory(category: Task['category']): Task[] {
    return this.tasks().filter(task => task.category === category);
  }


}
