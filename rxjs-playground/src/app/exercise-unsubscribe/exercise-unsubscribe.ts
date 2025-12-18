import { Component, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject, timer, Subscription, takeWhile, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-unsubscribe.html'
})
export class ExerciseUnsubscribe  {

    zahl = toSignal(timer(0, 1000).pipe(
      tap(console.log)
    ));

}
