import { Component, output, signal } from '@angular/core';
import { Field, form, max, maxLength, min, minLength, pattern, provideSignalFormsConfig, required, schema, validate } from '@angular/forms/signals';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-create',
  imports: [Field],
  templateUrl: './book-create.html',
  styleUrl: './book-create.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        'invalid': state => state.invalid() && state.touched()
      }
    })
  ]
})
export class BookCreate {

  createBook = output<Book>();

  readonly #formData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1
  });

  protected readonly bookForm = form(this.#formData, schema(path => {

    required(path.isbn, { message: 'Die ISBN muss angegeben werden.' });
    required(path.title, { message: 'Der Titel muss angegeben werden.' });
    required(path.rating, { message: 'Das Rating muss angegeben werden.' });
    pattern(path.isbn, /^[0-9]+$/, { message: 'Die ISBN darf nur Zahlen beinhalten.' });

    minLength(path.isbn, 8, { message: 'Die ISBN muss min. 8 Zeichen lang sein.' });
    maxLength(path.isbn, 15, { message: 'Die ISBN darf max. 15 Zeichen lang sein.' });

    min(path.rating, 1, { message: 'Das Rating muss min. 1 sein.' });
    max(path.rating, 5, { message: 'Das Rating muss max. 5 sein.' });

    validate(path.isbn, ctx => {
      if (!ctx.value().startsWith('978')) {
        return {
          kind: 'isbnPrefix',
          message: 'Eine ISBN muss mit 978 beginnen.'
        }
      }
      return undefined;
    })

  }));

  submitForm() {

    const newBook = this.bookForm().value();
    this.createBook.emit(newBook);

    this.bookForm().reset({
      isbn: '',
      title: '',
      description: '',
      rating: 1
    });

    // verhindert Neuladen der Seite
    return false;
  }
}
