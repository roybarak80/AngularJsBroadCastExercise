angular
  .module("myApp")
  .controller("homeController", function($scope, GetUsers, $rootScope) {
    $scope.user = "Goo";
    $scope.usersList = [];

    $scope.changeUser = function() {
      $scope.$emit("userChange", {
        currUser: $scope.selectedUser
      });
    };

    $scope.$on("broadcastUsers", function(event, obj) {
      $scope.usersList = obj;
    });

    $scope.$on("currSelectedUser", function(event, obj) {
      $scope.selectedUser = obj.currSelectedUser;
     
    });

    // this.$onDestroy = function() {
    //   currUser.dispose();
    // };
  });
