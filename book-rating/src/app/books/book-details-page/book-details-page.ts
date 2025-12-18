import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookCard } from '../book-card/book-card';
import { rxResourceFixed } from '../shared/rx-resource-fixed';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink, BookCard],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsPage {

  bookStore = inject(BookStore);

  isbn = input.required<string>();

  // Johannes seine Lösung
  book = rxResourceFixed({
    params: () => this.isbn(),
    stream: ({ params: isbn }) => this.bookStore.getSingleBook(isbn)
  })

  // offizielle "Lösung"
  // book = withPreviousValue(rxResource({
  //   params: () => this.isbn(),
  //   stream: ({ params: isbn }) => this.bookStore.getSingleBook(isbn)
  // }))
}
