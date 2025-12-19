import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStore } from '../shared/book-store';


@Injectable()
export class BookEffects {

  bookStore = inject(BookStore)

  loadBooks$ = createEffect(() => {
    return inject(Actions).pipe(

      ofType(BookActions.loadBooks),
      switchMap(() =>
        this.bookStore.getBooks().pipe(
          map(books => BookActions.loadBooksSuccess({ books })),
          catchError(error => of(BookActions.loadBooksFailure({ error }))))
      )
    );
  });
}
    