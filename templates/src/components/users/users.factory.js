function users ($q, $http, $timeout) {
  var get = function () {
    var defer = $q.defer();

    const users = [{
      id: 1,
      name: 'Michel'
    }, {
      id: 2,
      name: 'Tom'
    }, {
      id: 3,
      name: 'Richard'
    }];

    $timeout(() => {
      defer.resolve(users);
    }, 1000);

    return defer.promise;
  };

  return {
    get: get
  };
}
