import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './parts/navbar/navbar.component';
import {AjouterTexteComponent} from './todolist/ajouter-texte/ajouter-texte.component';
import {TodolistComponent} from './todolist/todolist/todolist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AjouterTexteComponent, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Scrum-app';
}
