import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventBusService } from "src/app/services/event-bus.service";
import { UsersChannel } from "../users-channel";
import { User } from "src/app/models/user";
import { UserEvent } from "../users-event";
import { UserService } from "src/app/services/user.service";
import { Observable, Subscription } from "rxjs";
import { Repos } from "src/app/models/repos";

@Component({
  selector: "app-user-rep",
  templateUrl: "./user-rep.component.html",
  styleUrls: ["./user-rep.component.scss"]
})
export class UserRepComponent implements OnInit, OnDestroy {
  repos: Observable<Repos[]>;
  private subSink: Subscription;
  constructor(
    private eventBusService: EventBusService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subSink = this.eventBusService.on(
      new UsersChannel("USER_PANEL"),
      (repos_url: UserEvent) => {
        this.repos = this.userService.getRepos(repos_url.value);
      }
    );
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
