import { BehaviorSubject } from 'rxjs';
import { publish } from 'rxjs/operators';

export default class Broadcast {
  constructor(inits) {
    this.broadcast$ = new BehaviorSubject(inits).pipe(publish());
  }
}
