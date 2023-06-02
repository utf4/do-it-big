import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail/detail.component';
import { EmailsComponent } from './emails/emails.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmailRoutingModule } from './email-routing-module';

@NgModule({
  declarations: [DetailComponent,EmailsComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class EmailModule { }
