import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitoring-system-front-end';

  constructor(private themeService: NbThemeService) {
    const theme = localStorage.getItem('user-theme')?.length ? localStorage.getItem('user-theme') : 'default';
    this.themeService.changeTheme(theme);
  }
}
