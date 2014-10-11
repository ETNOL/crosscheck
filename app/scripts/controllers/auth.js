'use strict';



app.controller("AuthCtrl", function($location, $scope, $rootScope, Auth, User) {

	if ( User.signedIn() ) {
		$location.path("/lists");
	}

	$scope.login = function(user) {
		Auth.login($scope.user);
		$location.path('/lists');
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function(authUser) {
			User.create(authUser, $scope.user.username);}).then(function() {
			$location.path("/login");
		}, function(error) {
			$scope.error = error.toString();
		}) ;
	};

});