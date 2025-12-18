import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, share } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    const observer = {
      next: (e: number) => this.log(e),
      error: (err: any) => this.log(err),
      complete: () => this.log('COMPLETE')
    }

    // const observable = of('😄', '😇', '😎');
    const observable = interval(1000).pipe(share());


    observable.subscribe(observer);

    window.setTimeout(() => observable.subscribe(observer), 3000)





    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
