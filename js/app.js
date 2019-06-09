var app = angular.module("myApp", ["ngRoute"]);

app.controller("mainController", [
  "$scope",
  "$http",
  "$rootScope",
  "GetUsers",
  "$timeout",
  function($scope, $http, $rootScope, GetUsers, $timeout) {
    $scope.currUser = "Anonymous";

    $scope.$on("userChange", function(event, obj) {
      $scope.currUser = obj.currUser;
    });

    $scope.$on("$routeChangeStart", function($event, next, current) {
      if (!!$scope.users && $scope.users.length > 0) {
        $scope.currUserObj = $scope.users.filter(function(prmItem) {
          return prmItem.name == $scope.currUser;
        })[0];

        $timeout(function() {
          $scope.$broadcast("currUserObj", {
            currUserObj: $scope.currUserObj
          });
        }, 10);
      }

      $timeout(function() {
        $scope.$broadcast("currSelectedUser", {
          currSelectedUser: $scope.currUser
        });
      }, 10);
      // console.log($scope.currUser);

      var askForPromise = GetUsers.getUsers();

      askForPromise.then(
        function(res) {
          if (!!res) {
            $scope.users = res.data;
            $scope.usersListArray = res.data.map(function(prmItem) {
              return prmItem.name;
            });
            $timeout(function() {
              $scope.$broadcast("broadcastUsers", $scope.usersListArray);
            }, 0);
          }
        },

        function(reason) {
          $scope.somethingWrong = reason;
          $scope.error = true;
        }
      );
    });
  }
]);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "pages/home.html",
      controller: "homeController"
    })
    .when("/about", {
      templateUrl: "pages/about.html",
      controller: "aboutController"
    })
    .otherwise({
      redirectTo: "/"
    });
});
