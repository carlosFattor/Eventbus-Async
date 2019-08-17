import { Component, OnInit } from "@angular/core";
import { EventBusService } from "src/app/services/event-bus.service";
import { User } from "src/app/models/user";
import { UserEvent } from "../users-event";
import { UsersChannel } from "../users-channel";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  user: User;
  constructor(private eventBusService: EventBusService) {}

  ngOnInit() {
    this.eventBusService.on(
      new UsersChannel("USER_DETAIL"),
      (user: UserEvent) => {
        this.user = user.value;
      }
    );
  }
}
