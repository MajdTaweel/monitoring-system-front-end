import { environment } from 'src/environments/environment'
import { Authority } from '../auth/auth.model'
import { AbstractAuditingEntity } from '../shared/model/abstract-auditing-entity.model';

export class Account extends AbstractAuditingEntity {
    activated: true;
    authorities: Authority[];
    email: string;
    firstName: string;
    id: number;
    imageUrl: string;
    langKey: string;
    lastName: string;
    login: string;
}

export const ACCOUNT_ENDPOINT = `${environment.uaaServiceApiUrl}/account`;