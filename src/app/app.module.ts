import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbMenuModule, NbIconModule, NbButtonModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthModule, NbAuthOAuth2Token, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './shared/header/header.component';
import { NbSecurityModule } from '@nebular/security';

function oAuth2TokenGetter(module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) {
  return res.body;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
            endpoint: environment.loginUrl,
            method: 'post',
          },
          register: {
            endpoint: environment.registerUrl,
            method: 'post',
          },
          logout: {
            endpoint: environment.logoutUrl,
            method: 'post',
          },
          requestPass: {
            endpoint: environment.changePasswordUrl,
            method: 'post',
          },
          resetPass: {
            endpoint: environment.resetPasswordUrl,
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
    NbSecurityModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: NbRoleProvider, useClass: RoleProvider },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
