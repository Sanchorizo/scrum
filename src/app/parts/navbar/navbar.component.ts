import { Component } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      { label: 'Home', icon: 'pi pi-home', command: () => this.onNavigate('home') },
      { label: 'About', icon: 'pi pi-info-circle', command: () => this.onNavigate('about') },
      { label: 'Contact', icon: 'pi pi-envelope', command: () => this.onNavigate('contact') },
    ];
  }

  onNavigate(route: string) {
    console.log(`Navigating to ${route}`);
  }
}
