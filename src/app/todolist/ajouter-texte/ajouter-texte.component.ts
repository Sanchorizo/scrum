import {Component, effect, signal} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-ajouter-texte',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonDirective,
    CardModule,
    NgForOf
  ],
  templateUrl: './ajouter-texte.component.html',
  styleUrl: './ajouter-texte.component.css'
})
export class AjouterTexteComponent {
  savedTexts = signal<string[]>([]);

  constructor() {
    const storedTexts = localStorage.getItem('savedTexts');
    if (storedTexts) {
      this.savedTexts.set(JSON.parse(storedTexts));
    }
    effect(() => {
      localStorage.setItem('savedTexts', JSON.stringify(this.savedTexts()));
    });
  }
  ajouterTexte(form: NgForm) {
    if (form.valid && form.value.inputText.trim()) {
      const newText = form.value.inputText.trim();
      this.savedTexts.update((texts) => [...texts, newText]);
      form.reset();
    }
  }
  supprimerTexte(index: number) {
    this.savedTexts.update((texts) => texts.filter((_, i) => i !== index));
  }
}
