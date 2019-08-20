import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from "src/app/models/user";
import { EventBusService } from "src/app/services/event-bus.service";
import { UserEvent } from "../users-event";
import { UserSelected } from "./user-selected";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.scss"]
})
export class ListUsersComponent implements OnInit, OnDestroy {

  constructor(private eventBusService: EventBusService) { }
  users: User[];
  subSink = new Subscription();

  ngOnInit() {
    this.subSink = this.eventBusService.on(new UserEvent("USERS_FOUNDED"), (users: User[]) => {
      this.users = users;
    });
  }

  userSelected(user: User): void {
    this.eventBusService.emit(new UserSelected("USER_DETAIL", user));
    this.eventBusService.emit(
      new UserSelected("USER_PANEL", { url: user.repos_url, id: user.id })
    );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
