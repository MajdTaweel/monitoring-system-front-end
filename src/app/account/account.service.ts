import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Account, ACCOUNT_ENDPOINT } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private authService: NbAuthService, private http: HttpClient) { }

  getAccount(): Observable<Account> {
    return this.authService.onTokenChange()
      .pipe(
        switchMap(_ => this.http.get<Account>(ACCOUNT_ENDPOINT)),
        catchError(error => {
          console.log(error);
          return of(null);
        }),
      );
  }
}
