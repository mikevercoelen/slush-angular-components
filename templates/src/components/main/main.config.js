/**
 * This it the main, module config file
 */

function main ($locationProvider, $compileProvider) {

  // @if NODE_ENV='production'
  $compileProvider.debugInfoEnabled(false);
  // @endif

  $locationProvider
    .html5Mode(true)
    .hashPrefix('!');
}
