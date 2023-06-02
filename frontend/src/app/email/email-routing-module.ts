import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./detail/detail.component";
import { EmailsComponent } from "./emails/emails.component";

const routes: Routes = [
  {
    path: "",
    component: EmailsComponent,
    pathMatch: "full",
  },

  {
    path: ":id",
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}
