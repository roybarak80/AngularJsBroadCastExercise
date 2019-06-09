angular.module("myApp").service("GetUsers", [
  "$http",
  "$q",
  function($http, $q) {
    var deferObject,
      users = {
        getUsers: function() {
          var promise = $http.get("https://jsonplaceholder.typicode.com/users"),
            deferObject = deferObject || $q.defer();

          promise.then(
            // OnSuccess function
            function(users) {
              // This code will only run if we have a successful promise.
              deferObject.resolve(users);
            },
            // OnFailure function
            function(reason) {
              // This code will only run if we have a failed promise.
              deferObject.reject(users);
            }
          );

          return deferObject.promise;
        }
      };

    return users;
  }
]);
