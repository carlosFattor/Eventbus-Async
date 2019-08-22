import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { catchError, filter, map } from "rxjs/operators";
import { CustomEvent } from "./custom-event.interface";
import { EmitEvent } from "./emit-event";

@Injectable({
  providedIn: "root"
})
export class EventBusService {
  private subject = new Subject<any>();

  on<T>(event: CustomEvent, action: (value: T) => void): Subscription {
    return this.subject
      .pipe(
        filter((e: EmitEvent<T>) => e.channel === event.channel),
        map((e: EmitEvent<T>) => e),
        catchError(error => { throw new Error(`There are something wrong with event-bus = ${error.message}`) })
      )
      .subscribe((e: EmitEvent<T>) => action(e.value));
  }

  emit<T>(event: EmitEvent<T>): void {
    this.subject.next(event);
  }
}
