import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";
import { BookRatingHelper } from '../shared/book-rating-helper';
import { readonly } from '@angular/forms/signals';
import { BookCreate } from "../book-create/book-create";
import { BookStore } from '../shared/book-store';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectBooks, selectBooksLoading } from '../store/book.selectors';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard, BookCreate, JsonPipe],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  bookRatingHelper = inject(BookRatingHelper);
  bookStore = inject(BookStore);

  books = inject(Store).selectSignal(selectBooks)
  loading = inject(Store).selectSignal(selectBooksLoading)


  // readonly books = signal<Book[]>([]);

  constructor() {
    // this.bookStore.getBooks().subscribe(books => this.books.set(books));
  }


  doRateUp(book: Book) {
    // const ratedBook = this.bookRatingHelper.rateUp(book);
    // const ratedBook = {
    //   ...book,
    //   rating: Math.min(book.rating + 1, 5)
    // }
    // this.updateAndSortBooks(ratedBook);
  }

  doRateDown(book: Book) {
    // const ratedBook = this.bookRatingHelper.rateDown(book);
    // this.updateAndSortBooks(ratedBook);
  }

  updateAndSortBooks(ratedBook: Book) {
    // this.books.update(books => books
    //   .map(x => x.isbn === ratedBook.isbn ? ratedBook : x)
    //   .sort((a, b) => b.rating - a.rating));
  }

  doAddBook(newBook: Book) {
    // this.books.update(books => [...books, newBook]
    //   .sort((a, b) => b.rating - a.rating)
    // )
  }

  isbn = signal('9783864909467');

  bookResource2 = rxResource({
    params: () => this.isbn(),
    stream: ({ params: isbn }) => this.bookStore.getSingleBook(isbn)
  })

  bookResource = httpResource<Book>(
    () => `https://api.angular.schule/books/${this.isbn()}`,
    {
      defaultValue: {
        isbn: '',
        title: '',
        description: '',
        rating: 1
      }
    }
  )
}
