import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Component } from '@angular/core';
import { DashboardPage } from './books/dashboard-page/dashboard-page';

@Component({
  selector: 'app-dashboard-page',
  template: '😃',
})
export class DummyDashboardPage {
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
    .overrideComponent(App, {
      remove: { imports: [DashboardPage] },
      add: { imports: [DummyDashboardPage] }
    })
    .compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Book Rating 🥶');
  });
});
