function documents () {
  return {
    restrict: 'E',
    templateUrl: 'documents/documents.html',
    controller: 'DocumentsController',
    bindToController: true,
    controllerAs: 'vm',
    scope: {}
  };
}
