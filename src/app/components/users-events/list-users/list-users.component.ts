import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from "src/app/models/user";
import { EventBusService } from "src/app/services/event-bus.service";
import { UserEventsEnum } from 'src/app/services/user-events.enum';
import { UsersChannelListening } from '../users-channel';
import { UserEventEmitter } from "../users-event";

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
    this.subSink = this.eventBusService.on<User[]>(new UsersChannelListening(UserEventsEnum.USERS_FOUNDED), users => {
      this.users = users;
    });
  }

  userSelected(user: User): void {
    this.eventBusService.emit(new UserEventEmitter<User>(UserEventsEnum.USER_DETAIL, user));

    this.eventBusService
      .emit(new UserEventEmitter<{ url: string, id: string }>(UserEventsEnum.USER_PANEL, { url: user.repos_url, id: user.id }));
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
