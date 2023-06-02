import {  Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Emails } from "src/interfaces/emails";
import { EmailService } from "src/service/emails";
import { Router } from "@angular/router";

@Component({
  selector: "app-emails",
  templateUrl: "./emails.component.html",
  styleUrls: ["./emails.component.scss"],
})
export class EmailsComponent implements OnInit {
  public displayedColumns: Array<string> = [
    "name",
    "subject",
    "body",
    "sentAt",
  ];
  dataSource: MatTableDataSource<Emails>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private emailService: EmailService,private readonly router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.emailService.emails().subscribe({
      next: (result: any) => {
        this.dataSource.data = result.data;
      },
      error: (error) => {
        if (Array.isArray(error?.error?.message)) {
          alert(error.error.message[0]);
        } else {
          alert(error.error.message);
        }
      },
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(["/login"]).catch((_error) => undefined);
   
  }
}
