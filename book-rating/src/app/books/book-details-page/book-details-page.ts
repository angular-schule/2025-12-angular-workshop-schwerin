import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { BookCard } from '../book-card/book-card';
import { rxResourceFixed } from '../shared/rx-resource-fixed';
import { JsonPipe } from '@angular/common';
import { concatMap, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink, BookCard, JsonPipe],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsPage {

  bookStore = inject(BookStore);
  router = inject(ActivatedRoute);

  book = toSignal(this.router.paramMap.pipe(
    map(paramMap => paramMap.get('isbn') || ''),
    concatMap(isbn => this.bookStore.getSingleBook(isbn))
  ))




  /*

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
  */
}
