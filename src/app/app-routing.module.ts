import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserPanelComponent } from "./components/users-events/user-panel/user-panel.component";

const routes: Routes = [{ path: "users", component: UserPanelComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
