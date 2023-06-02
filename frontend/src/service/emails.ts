import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { catchError } from "rxjs";
import { Emails } from "src/interfaces/emails";

import { HttpResponse } from "src/interfaces/https-response";
import { BaseService } from "./base-service";

@Injectable()
export class EmailService extends BaseService {
  constructor(readonly http: HttpClient) {
    super();
  }

  public emails() {
    return this.http.get<HttpResponse<Array<Emails>>>(`${this.baseUrl}/emails`);
  }

  public email(id: string) {
    return this.http.get<HttpResponse<Emails>>(`${this.baseUrl}/emails/${id}`);
  }

  public reply(id: string, body: string) {
    return this.http.post<HttpResponse<Emails>>(
      `${this.baseUrl}/emails/${id}/reply`,
      { body }
    );
  }
}
