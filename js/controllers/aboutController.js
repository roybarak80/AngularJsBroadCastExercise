angular
  .module("myApp")
  .controller("aboutController", function($scope, $rootScope) {
    $scope.currUser = "";
    $scope.foo = "";

    $scope.$on("currUserObj", function(event, obj) {
      $scope.currUser = obj.currUserObj;
    });
  });
