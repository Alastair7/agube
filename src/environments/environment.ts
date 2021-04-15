// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  apiUrl: 'http://localhost:4000',
  // docker-compose.yml contains port config
  agubeBackendUrl: 'http://localhost:8003/api/v1/agube',
  contactBookBackendUrl: 'http://localhost:8002/api/v1/contact-book',
  subscriptionBackendUrl: 'http://localhost:8001/api/v1/subscription',
  authBackendUrl: 'http://localhost:8000/api/v1/auth',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
