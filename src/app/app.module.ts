import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

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
        }),
      ],
      forms: {},
    }),
    NbLayoutModule,
    NbEvaIconsModule,
    LeafletModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     allowedDomains: environment.allowedDomains,
    //     disallowedRoutes: environment.disallowedRoutes,
    //   },
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
