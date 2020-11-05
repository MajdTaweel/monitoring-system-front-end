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

const UAA_SERVICE_API_URL = `${environment.baseUrl}/services/uaa/api`;

export const REGISTER_ENDPOINT = `${UAA_SERVICE_API_URL}/register`;
export const RESET_PASSWORD_INIT_ENDPOINT = `${UAA_SERVICE_API_URL}/account/reset-password/init`;
export const RESET_PASSWORD_FINISH_ENDPOINT = `${UAA_SERVICE_API_URL}/account/reset-password/finish`;
export const CHANGE_PASSWORD_ENDPOINT = `${UAA_SERVICE_API_URL}/account/change-password`;
export const ACCOUNT_ENDPOINT = `${UAA_SERVICE_API_URL}/account`;