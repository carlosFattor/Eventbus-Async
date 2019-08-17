import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./components/users-events/search/search.component";
import { ListUsersComponent } from "./components/users-events/list-users/list-users.component";
import { UserDetailComponent } from "./components/users-events/user-detail/user-detail.component";
import { UserRepComponent } from "./components/users-events/user-rep/user-rep.component";
import { UserPanelComponent } from "./components/users-events/user-panel/user-panel.component";
import { UserService } from "./services/user.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListUsersComponent,
    UserDetailComponent,
    UserRepComponent,
    UserPanelComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
