import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NbAuthJWTInterceptor, NbAuthModule, NbPasswordAuthStrategy, NB_AUTH_TOKEN_INTERCEPTOR_FILTER } from '@nebular/auth';

@NgModule({
  declarations: [
    AppComponent
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
          validation: {
            email: {
              regexp: null,
              required: true,
            },
          },
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
            key: 'access_token',
          },
        }),
      ],
      forms: {},
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    LeafletModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
    { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: (req: HttpRequest<any>) => environment.disallowedRoutes.includes(req.url) },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
