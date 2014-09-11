'use strict';


app.controller('NavCtrl', function($location, $scope, User) {

	$scope.user = User.getCurrent();

	$scope.signedIn = function() {
		return User.signedIn();
	}

	$scope.home = function() {
		$location.path('/');
	}


})