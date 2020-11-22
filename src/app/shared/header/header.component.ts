import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem, NbThemeService } from '@nebular/theme';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  themeIcon: string;

  contextMenuItems: NbMenuItem[] = [
    {
      title: 'Logout',
      link: 'auth/logout'
    },
  ];

  private permittedMenuItems: NbMenuItem[] = [
    {
      title: 'Sensors Monitoring',
      link: 'sensing-nodes-monitoring',
    },
  ];

  private authMenuItems: NbMenuItem[] = [
    {
      title: 'Login',
      link: 'auth/login',
    },
    {
      title: 'Register',
      link: 'auth/register',
    },
  ];

  private menuItems = new BehaviorSubject<NbMenuItem[]>([]);

  private subscriptions = new Subscription();

  constructor(private themeService: NbThemeService, private accessChecker: NbAccessChecker) {
    const sub1 = this.themeService.onThemeChange()
      .subscribe(currentTheme => this.themeIcon = currentTheme?.name === 'default' ? 'moon' : 'sun-outline');
    const sub2 = this.accessChecker.isGranted('view', 'auth')
      .subscribe(isGranted => this.menuItems.next(isGranted ? [...this.permittedMenuItems, ...this.authMenuItems] : [...this.permittedMenuItems]));
    this.subscriptions.add(sub1);
    this.subscriptions.add(sub2);
  }

  ngOnInit(): void {
  }

  toggleDarkMode(): void {
    this.themeService.currentTheme === 'default'
      ? this.themeService.changeTheme('dark')
      : this.themeService.changeTheme('default');
    localStorage.setItem('user-theme', this.themeService.currentTheme);
  }

  getMenuItems(): Observable<NbMenuItem[]> {
    return this.menuItems.asObservable();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
