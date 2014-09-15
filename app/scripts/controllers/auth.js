'use strict';



app.controller("AuthCtrl", function($location, $scope, $rootScope, Auth, User) {


	$scope.login = function(user) {
		Auth.login(user);
		$location.path("/list");
	};

	$scope.register = function() {
		Auth.register($scope.user).then(function(authUser) {
			User.create(authUser, $scope.user.username);}).then(function() {
			$location.path("/login");
		}, function(error) {
			$scope.error = error.toString();
		}) ;
	};

	$scope.$on('$firebaseSimpleLogin:login', function() {
		$location.path('/');
	});



});