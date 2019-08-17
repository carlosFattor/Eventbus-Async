import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat } from "rxjs";
import { EventBusService } from "src/app/services/event-bus.service";
import { UserEvent } from "../users-event";
import { User } from "src/app/models/user";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements AfterViewInit {
  @ViewChild("searchInput", { static: true })
  input: ElementRef;

  constructor(
    private userService: UserService,
    private eventBusService: EventBusService
  ) {}

  ngAfterViewInit(): void {
    const searchUser$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map((event: any) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(search => this.loadUsers(search))
    );
    const initialUsers$ = this.loadUsers("");
    concat(initialUsers$, searchUser$).subscribe(data => {
      this.eventBusService.emit(new UserEvent("USERS_FOUNDED", data));
    });
  }
  loadUsers(search = ""): Observable<User[]> {
    return this.userService
      .search(search)
      .pipe(map(response => response["items"]));
  }
}
