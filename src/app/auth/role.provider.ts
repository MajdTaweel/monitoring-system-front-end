import { Injectable } from '@angular/core';
import { NbRoleProvider } from '@nebular/security';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from '../account/account.model';
import { AccountService } from '../account/account.service';
import { Authority } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class RoleProvider implements NbRoleProvider {

  constructor(private accountService: AccountService) { }

  getRole(): Observable<string | string[]> {
    return this.accountService.getAccount()
      .pipe(
        map((account: Account) => account?.authorities || Authority.ANONYMOUS),
      );
  }
}
