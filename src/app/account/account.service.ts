import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthService } from '@nebular/auth';
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
        switchMap((token: NbAuthOAuth2Token) => token?.getValue()?.length ? this.http.get<Account>(ACCOUNT_ENDPOINT) : of(null)),
        catchError(error => {
          console.log(error);
          return of(null);
        }),
      );
  }
}
