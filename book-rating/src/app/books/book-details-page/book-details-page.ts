import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { BookCard } from '../book-card/book-card';
import { rxResourceFixed } from '../shared/rx-resource-fixed';
import { JsonPipe } from '@angular/common';
import { catchError, concatMap, map, mergeMap, of, retry, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
    switchMap(isbn => this.bookStore.getSingleBook(isbn).pipe(
      retry({
        count: 3,
        delay: 500
      }),
      catchError((e: HttpErrorResponse) => of({
        isbn: '000',
        title: 'ERRROR',
        description: e.message,
        rating: 1
      }))
    ))
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
