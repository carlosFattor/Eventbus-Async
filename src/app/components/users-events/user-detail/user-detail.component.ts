import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from "src/app/models/user";
import { EventBusService } from "src/app/services/event-bus.service";
import { UserEventsEnum } from 'src/app/services/user-events.enum';
import { UsersChannelListening } from '../users-channel';

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
    this.subSink = this.eventBusService
      .on<User>(new UsersChannelListening(UserEventsEnum.USER_DETAIL), (value: User) => {
        this.user = value;
      });
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
