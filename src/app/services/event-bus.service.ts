import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { CustomEvent } from "./custom-event.interface";
import { EmitEvent } from "./emit-event";

@Injectable({
  providedIn: "root"
})
export class EventBusService {
  private subject = new Subject<any>();

  on(event: CustomEvent, data: any): Subscription {
    return this.subject
      .pipe(
        filter((e: CustomEvent) => {
          return e.channel === event.channel;
        }),
        map((e: CustomEvent) => {
          return e;
        })
      )
      .subscribe(data);
  }

  emit(event: EmitEvent): void {
    this.subject.next(event);
  }
}
