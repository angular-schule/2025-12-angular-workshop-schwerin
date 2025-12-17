import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";
import { BookRatingHelper } from '../shared/book-rating-helper';
import { readonly } from '@angular/forms/signals';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  bookRatingHelper = inject(BookRatingHelper);

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

  doRateUp(book: Book) {
    const ratedBook = this.bookRatingHelper.rateUp(book);
    this.updateAndSortBooks(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.bookRatingHelper.rateDown(book);
    this.updateAndSortBooks(ratedBook);
  }

  updateAndSortBooks(ratedBook: Book) {
    this.books.update(books => books
      .map(x => x.isbn === ratedBook.isbn ? ratedBook : x)
      .sort((a, b) => b.rating - a.rating));
  }
}
