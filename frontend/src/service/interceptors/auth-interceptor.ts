// import { AuthService } from '../auth.service';
import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let user;
    user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      req = req.clone({
        headers: req.headers.set(
          "Authorization",
          `Bearer ${user.accessToken} `
        ),
      });
    }

    // send cloned request with header to the next handler.
    // return next.handle(authReq);
    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {

          if (error.status === 0) {
            alert(
              "Something went wrong, Please check server status and all other dependencies."
            );
          } else if (error.status === 403) {
            localStorage.removeItem("user");
            this.router.navigate([""]).catch((_error) => undefined);
          }
        }
      )
    );
  }
}
