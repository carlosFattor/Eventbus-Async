import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from "src/app/models/user";
import { EventBusService } from "src/app/services/event-bus.service";
import { UsersChannel } from "../users-channel";
import { UserEvent } from "../users-event";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  subSink = new Subscription();
  constructor(private eventBusService: EventBusService) { }

  ngOnInit() {
    this.subSink = this.eventBusService.on(
      new UsersChannel("USER_DETAIL"),
      (user: UserEvent) => {
        this.user = user.value;
      }
    );
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
