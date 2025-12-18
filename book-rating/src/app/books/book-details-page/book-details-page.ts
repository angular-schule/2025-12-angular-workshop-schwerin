import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookCard } from '../book-card/book-card';

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

  book = rxResource({
    params: () => this.isbn(),
    stream: ({ params: isbn }) => this.bookStore.getSingleBook(isbn)
  })

}

// weiter um 10:05 Uhr
