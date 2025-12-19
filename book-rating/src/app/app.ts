import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookActions } from './books/store/book.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Book Rating');

  constructor(store: Store) {
    store.dispatch(BookActions.loadBooks())
  }
}
