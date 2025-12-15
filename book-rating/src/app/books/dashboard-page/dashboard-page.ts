import { Component, signal } from '@angular/core';
import { Book } from '../shared/book';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { BookCard } from "../book-card/book-card";

@Component({
  selector: 'app-dashboard-page',
  imports: [JsonPipe, UpperCasePipe, BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  // 🦆
  readonly books = signal<Book[]>([
    {
      isbn: '000',
      title: 'Angular',
      description: 'Bestes Angular Buch überhaupt',
      rating: 5
    },
    {
      isbn: '111',
      title: 'React',
      description: 'Auch ganz nettes Buch',
      rating: 3
    },
    {
      isbn: '222',
      title: 'jQuery',
      description: 'Super altes Buch',
      rating: 1
    }
  ]);

}
