const BASE_URL = 'http://176.119.254.185';
const SERVICES_URL = BASE_URL + '/services';
const AUTH_URL = BASE_URL + '/auth';
const UAA_SERVICE_API_URL = `${SERVICES_URL}/uaa`

export const environment = {
  production: true,
  baseUrl: BASE_URL,
  loginUrl: AUTH_URL + '/login',
  logoutUrl: AUTH_URL + '/logout',
  registerUrl: `${UAA_SERVICE_API_URL}/register`,
  changePasswordUrl: `${UAA_SERVICE_API_URL}/account/change-password`,
  resetPasswordUrl: `${UAA_SERVICE_API_URL}/account/reset-password/init`,
  sensingNodeServiceApiUrl: SERVICES_URL + '/sensingnode/api',
  disallowedRoutes: [`${AUTH_URL}/login`, `${UAA_SERVICE_API_URL}/register`],
  xhrWithCredentials: true,
};
