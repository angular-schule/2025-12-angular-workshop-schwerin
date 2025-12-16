import { TestBed } from '@angular/core/testing';

import { BookRatingHelper } from './book-rating-helper';
import { Book } from './book';

describe('BookRatingHelper', () => {
  let service: BookRatingHelper;
  let book: Book;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingHelper);
    book = {
      isbn: '000',
      title: 'Test',
      description: 'Test',
      rating: 3
    }
  });

  it('should rate up a book by one', () => {
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(4);
  });

  it('should rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to have a rating greater than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not be allowed to have a rating smaller than 1', () => {
    book.rating = 1;
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should not mutate the book', () => {
    const frozenBook = Object.freeze(book);
    expect(() => service.rateUp(frozenBook)).not.toThrow();
    expect(() => service.rateDown(frozenBook)).not.toThrow()
  });
});
