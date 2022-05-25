import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  public onSelect: EventEmitter<string> = new EventEmitter<string>();
  public onReset: EventEmitter<void> = new EventEmitter();

  constructor() {

  }

  public select(cardNum: string) {
    // do something, then...
    this.onSelect.emit(cardNum);
  }

  public reset() {
    this.onReset.emit();
  }
}

export class MyServiceEvent {
  message: string;
  eventId: number;
}
