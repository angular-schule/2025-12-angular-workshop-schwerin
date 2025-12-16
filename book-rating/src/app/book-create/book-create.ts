import { Component, signal } from '@angular/core';
import { Book } from '../books/shared/book';
import { Field, form, max, maxLength, min, minLength, pattern, provideSignalFormsConfig, required, schema, validate } from '@angular/forms/signals';

@Component({
  selector: 'app-book-create',
  imports: [Field], // Field nicht vergessen!
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

  protected readonly formData = signal<Book>({
    isbn: '',
    title: '',
    description: '',
    rating: 1
  });

  protected readonly bookForm = form(this.formData, schema(path => {
    required(path.isbn, { message: 'Die ISBN muss angegeben werden.' });
    required(path.title, { message: 'Der Titel muss angegeben werden.' });
    required(path.rating, { message: 'Das Rating muss angegeben werden.' });
    pattern(path.isbn, /^[0-9]+$/, { message: 'Die ISBN darf nur Zahlen beinhalten.' })

    minLength(path.isbn, 8, { message: 'Die ISBN muss min. 8 Zeichen lang sein.' });
    maxLength(path.isbn, 15, { message: 'Die ISBN darf max. 15 Zeichen lang sein' });
    min(path.rating, 1, { message: 'Rating min. 1' });
    max(path.rating, 5, { message: 'Rating max. 5' });

    validate(path.isbn, (ctx) => {
      if (!ctx.value().startsWith('978')) {
        return {
          kind: 'isbnprefix',
          message: 'ISBN muss mit 978 beginnen.'
        }
      } else {
        return undefined;
      }
    })
  }));

  submitForm() {
    console.log(this.bookForm().value());

    this.bookForm().reset({
      isbn: '',
      title: '',
      description: '',
      rating: 1
    });

    // verhindert Neuladen des Formulars
    return false;
  }
}
