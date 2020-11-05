// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL = 'http://localhost:8080';
const SERVICES_URL = BASE_URL + '/services';
const AUTH_URL = BASE_URL + '/auth';
const UAA_SERVICE_API_URL = `${SERVICES_URL}/uaa/api`

export const environment = {
  production: false,
  // TODO: RM all urls except for baseUrl
  baseUrl: BASE_URL,
  loginUrl: AUTH_URL + '/login',
  logoutUrl: AUTH_URL + '/logout',
  registerUrl: `${UAA_SERVICE_API_URL}/register`,
  changePasswordUrl: `${UAA_SERVICE_API_URL}/account/change-password`,
  resetPasswordUrl: `${UAA_SERVICE_API_URL}/account/reset-password/init`,
  sensingNodeServiceApiUrl: SERVICES_URL + '/sensingnode/api',
  xhrWithCredentials: true,
  uaaServiceApiUrl: UAA_SERVICE_API_URL,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
