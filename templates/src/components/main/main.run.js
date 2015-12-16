/**
 * This is the main, run file
 */

function main ($rootScope, $window) {

  // always scroll to the top when a new view is loaded.
  $rootScope.$on('$viewContentLoaded', function () {
    $window.scrollTo(0, 0);
  });
}
