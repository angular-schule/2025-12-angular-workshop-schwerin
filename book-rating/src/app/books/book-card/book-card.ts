import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Book } from '../shared/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  imports: [RouterLink],
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCard {

  book = input.required<Book>();

  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book());
  }

}
