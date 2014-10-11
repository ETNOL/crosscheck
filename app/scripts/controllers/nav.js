'use strict';


app.controller('NavCtrl', function($location, $scope, User, Auth) {

	$scope.user = User.getCurrent();

	$scope.signedIn = function() {
		return User.signedIn();
	}

	$scope.home = function() {
		$location.path('/');
	}

	$scope.logout = function() {
		Auth.logout();
	}


})