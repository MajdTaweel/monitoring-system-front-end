// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, tap } from 'rxjs/operators';
// import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Router } from '@angular/router';
// import { LOGIN_URL, LOGOUT_URL, RegisterParams, REGISTER_URL, Token } from './auth.model';
// // import { AlertService } from '../alert/alert.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private tokenChange = new BehaviorSubject<string>(null);
//   private loginSubscription: Subscription;
//   private logoutSubscription: Subscription;

//   constructor(
//     private httpClient: HttpClient,
//     private jwtHelperService: JwtHelperService,
//     // private alertService: AlertService,
//     private router: Router,
//   ) {
//   }

//   logIn(username: string, password: string): void {
//     if (this.loginSubscription) {
//       this.loginSubscription.unsubscribe();
//     }
//     this.loginSubscription = this.httpClient.post<Token>(
//       LOGIN_URL,
//       {
//         username,
//         password,
//         rememberMe: true,
//       }
//     ).pipe(
//       tap(token => this.storeUsernameAndToken(username, token.access_token)),
//       catchError(error => of(this.handleLoginException(error)))
//     ).subscribe();
//   }

//   register(registerParams: RegisterParams): void {
//     this.httpClient.post(
//       REGISTER_URL,
//       { ...registerParams, langKey: 'en', passwordConfirmation: undefined }
//     ).pipe(
//       tap(_ => this.logIn(registerParams.login, registerParams.password))
//     ).subscribe();
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('access_token')?.length
//       && !this.jwtHelperService.isTokenExpired(localStorage.getItem('access_token'));
//   }

//   logOut(): void {
//     if (this.logoutSubscription) {
//       this.logoutSubscription.unsubscribe();
//     }
//     this.logoutSubscription = this.httpClient.post(LOGOUT_URL, null).subscribe();
//     this.emptyUsernameAndToken();
//     this.navigateToLogin().then(value => console.log('Navigated to login after logging out', value));
//   }

//   get tokenChanges(): Observable<string> {
//     return this.tokenChange.asObservable();
//   }

//   private storeUsernameAndToken(username: string, token: string): void {
//     localStorage.setItem('username', username);
//     localStorage.setItem('access_token', token);
//     this.tokenChange.next(username);
//     console.log('JWT:', token);
//   }

//   private handleLoginException(error: any): null {
//     this.emptyUsernameAndToken();
//     this.presentLoginErrorDialog(error);
//     return null;
//   }

//   private emptyUsernameAndToken(): void {
//     localStorage.removeItem('username');
//     localStorage.removeItem('access_token');
//     this.tokenChange.next(null);
//   }

//   private presentLoginErrorDialog(error: any): void {
//     console.log(error);
//     if (!!error?.error?.detail) {
//       this.openAlertDialog(error.error.title, error.error.detail);
//     } else {
//       this.openAlertDialog('Something Went Wrong', 'Please check your internet connection.');
//     }
//   }

//   private openAlertDialog(title: string, message: string): void {
//     // this.alertService.displaySimpleAlertDialog(title, message);
//   }

//   private navigateToLogin(): Promise<boolean> {
//     return this.router.navigate(['/', 'login']);
//   }
// }
