export enum Authority {
    ADMIN = 'ROLE_ADMIN',
    SENSING_NODE = 'ROLE_SENSING_NODE',
    USER = 'ROLE_USER',
    ANONYMOUS = 'ROLE_ANONYMOUS'
}

export const AUTHORITIES = [Authority.ADMIN, Authority.SENSING_NODE, Authority.USER, Authority.ANONYMOUS];