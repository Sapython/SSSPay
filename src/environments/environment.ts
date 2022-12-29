// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ssspay-prod',
    appId: '1:1044964269542:web:37d8bc1cdcf54eaa994a27',
    storageBucket: 'ssspay-prod.appspot.com',
    apiKey: 'AIzaSyBYkJgA0m1DBSaWlCiY2FtOoVNBgSyH_sY',
    authDomain: 'ssspay-prod.firebaseapp.com',
    messagingSenderId: '1044964269542',
    measurementId: 'G-QL9TMZGB6C',
  },
  production: false,
  serverBaseUrl: 'http://localhost:8081',
  // serverBaseUrl: 'https://ssspay-proxy-server-76zqkqboia-em.a.run.app',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
