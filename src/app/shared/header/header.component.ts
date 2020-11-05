import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: NbMenuItem[] = [
    {
      title: 'Sensors Monitoring',
      link: '/sensing-nodes-monitoring',
    },
  ];

  anonymousMenuItems: NbMenuItem[] = [
    {
      title: 'Login',
      link: '/auth/login',
    },
    {
      title: 'Register',
      link: '/auth/register',
    },
  ];

  contextMenuItems: NbMenuItem[] = [
    {
      title: 'Logout',
      link: '/auth/logout'
    },
  ];

  themeIcon: string;

  constructor(public themeService: NbThemeService, private accountService: AccountService) {
    this.themeService.onThemeChange().subscribe(currentTheme => this.themeIcon = currentTheme?.name === 'default' ? 'moon-outline' : 'moon');
    this.accountService.getAccount().subscribe(account => console.log(account));
  }

  ngOnInit(): void {
  }

  toggleDarkMode(): void {
    this.themeService.currentTheme === 'default'
      ? this.themeService.changeTheme('dark')
      : this.themeService.changeTheme('default');
  }

  getThemeButtonIcon(): string {
    return this.themeService.currentTheme === 'default' ? 'moon-outline' : 'moon';
  }
}
