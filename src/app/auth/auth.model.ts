import { HttpResponse } from '@angular/common/http';
import { NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { environment } from 'src/environments/environment';

export enum Authority {
    ADMIN = 'ROLE_ADMIN',
    SENSING_NODE = 'ROLE_SENSING_NODE',
    USER = 'ROLE_USER',
    ANONYMOUS = 'ROLE_ANONYMOUS'
}

export const AUTHORITIES = [Authority.ADMIN, Authority.SENSING_NODE, Authority.USER, Authority.ANONYMOUS];

const AUTH_URL = `${environment.baseUrl}/auth`;

export const LOGIN_ENDPOINT = `${AUTH_URL}/login`;
export const LOGOUT_ENDPOINT = `${AUTH_URL}/logout`;

export function oAuth2TokenGetter(module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) {
    return res.body;
}