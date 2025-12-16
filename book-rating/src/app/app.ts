import { Component, signal } from '@angular/core';
import { DashboardPage } from "./books/dashboard-page/dashboard-page";

@Component({
  selector: 'app-root',
  imports: [DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Book Rating 🥶');

  constructor() {
    setTimeout(() => this.title.set('Book Rating'), 1000);
  }
}
