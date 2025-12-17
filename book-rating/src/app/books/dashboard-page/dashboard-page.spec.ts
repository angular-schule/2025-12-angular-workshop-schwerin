import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { BookRatingHelper } from '../shared/book-rating-helper';
import { Book } from '../shared/book';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {

    // Der ganz klassische Mock
    const ratingMock = {
      rateUp: (book: Book) => { console.log('Unter meiner Kontrolle:', book); return book }
    }

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        {
          provide: BookRatingHelper,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {

    console.log('HALLO');
    component.doRateUp({} as Book);

    expect(component).toBeTruthy();

  });
});
