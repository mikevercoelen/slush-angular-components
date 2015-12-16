/**
 * This is the main route :)
 */

function main ($stateProvider) {
  $stateProvider.state('main', {
    url: '/',
    templateUrl: 'main/main.html',
    controller: 'MainController'
  });
}
