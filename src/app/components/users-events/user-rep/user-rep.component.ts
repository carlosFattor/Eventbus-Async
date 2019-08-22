import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Repos } from "src/app/models/repos";
import { EventBusService } from "src/app/services/event-bus.service";
import { UserService } from "src/app/services/user.service";
import { UsersChannelListening } from "../users-channel";

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
  ) { }

  ngOnInit() {
    this.subSink = this.eventBusService
      .on<{ url: string, id: string }>(new UsersChannelListening("USER_PANEL"), userEvent => {
        this.repos = this.userService.getRepos(userEvent.url).pipe(
          map((repos: Repos[]) => {
            return repos.filter(repo => {
              return repo.owner.id === userEvent.id;
            });
          })
        );
      });
  }
  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
