// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

// config for the movie data base
export const API_KEY_TMDB = '22dc9b78f6bcd585826f932a48fa87a3';

export const URL_API_TMDB = 'https://api.themoviedb.org/3/movie/';

export const URL_IMG_TMDB = 'https://image.tmdb.org/t/p/original';

// config for gdriveplayer api
export const URL_API_GDPLA_MOVIE = 'https://api.gdriveplayer.us/v1/movie/';


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
