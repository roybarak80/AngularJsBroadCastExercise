var app = angular.module("myApp", []);

app.controller("MyCtrl", [
  "$scope", "$http",
  function ($scope, $http) {
$scope.hello = 'Hello'

  }
]);