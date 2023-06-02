import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/shared/guards/auth";
import { LoginComponent } from "./auth/login/login.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "emails",
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    loadChildren: () =>
      import("./email/email.module").then((m) => m.EmailModule),
  },

  {
    path: "**",
    redirectTo: "/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
