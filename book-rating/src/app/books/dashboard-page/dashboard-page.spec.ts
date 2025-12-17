import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {

    const testBook = {} as Book;

    const bookRatingHelper = TestBed.inject(BookRatingHelper);
    const spy = vi.spyOn(bookRatingHelper, 'rateUp');

    component.doRateUp(testBook);

    expect(spy).toHaveBeenCalledExactlyOnceWith(testBook);

  });
});
