import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs';

import { HttpResponse } from 'src/interfaces/https-response';
import { Users } from 'src/interfaces/users';
import { BaseService } from './base-service';

@Injectable()
export class AuthService extends BaseService {
	constructor(readonly http: HttpClient) {
		super();
	}

    public login(email:string,password:string) {
		return this.http.post<HttpResponse<Users>>(`${this.baseUrl}/auth/login`, {
			email,password
		});
	}

}
