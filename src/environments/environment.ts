// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase : {
    apiKey: "your-firebase-api-key",
    authDomain: "fir-demo-57c5b.firebaseapp.com",
    databaseURL: "https://fir-demo-57c5b-default-rtdb.firebaseio.com",
    projectId: "fir-demo-57c5b",
    storageBucket: "fir-demo-57c5b.appspot.com",
    messagingSenderId: "324370600645",
    appId: "1:324370600645:web:372ec77189de0da28756ac",
    measurementId: "G-DVJBQPJX6L"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
