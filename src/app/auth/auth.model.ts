export enum Authority {
    ANONYMOUS = 'ROLE_ANONYMOUS',
    ADMIN = 'ROLE_ADMIN',
    USER = 'ROLE_USER',
    SENSING_NODE = 'ROLE_SENSING_NODE'
}

export const AUTHORITIES = [Authority.ANONYMOUS, Authority.USER, Authority.ADMIN, Authority.SENSING_NODE];