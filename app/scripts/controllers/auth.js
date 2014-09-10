'use strict';



app.controller("AuthCtrl", function($location, $scope, $rootScope, User) {

	$scope.users = User.users;

	$scope.signIn = function(user) {
		User.setCurrent(user);
		$location.path("/list");
	}

});