import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbIconModule, NbButtonModule, NbContextMenuModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule, NbAuthOAuth2Token, NbPasswordAuthStrategy } from '@nebular/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './shared/header/header.component';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './auth/role.provider';
import { Authority, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, oAuth2TokenGetter } from './auth/auth.model';
import { REGISTER_ENDPOINT, RESET_PASSWORD_FINISH_ENDPOINT, RESET_PASSWORD_INIT_ENDPOINT } from './account/account.model';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '',
          login: {
            endpoint: LOGIN_ENDPOINT,
            method: 'post',
          },
          register: {
            endpoint: REGISTER_ENDPOINT,
            method: 'post',
          },
          logout: {
            endpoint: LOGOUT_ENDPOINT,
            method: 'post',
          },
          requestPass: {
            endpoint: RESET_PASSWORD_INIT_ENDPOINT,
            method: 'post',
          },
          resetPass: {
            endpoint: RESET_PASSWORD_FINISH_ENDPOINT,
            method: 'post',
          },
          token: {
            class: NbAuthOAuth2Token,
            key: 'token',
            getter: oAuth2TokenGetter,
          },
        }),
      ],
      forms: {},
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    LeafletModule,
    NgbModule,
    FontAwesomeModule,
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbContextMenuModule,
    NbSecurityModule.forRoot({
      accessControl: {
        [Authority.ANONYMOUS]: {
          view: ['auth'],
        },
        [Authority.USER]: {
          view: ['account'],
        },
      },
    }),
    NbCardModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NbRoleProvider, useClass: RoleProvider },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
