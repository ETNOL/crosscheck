'use strict';



app.controller("AuthCtrl", function($location, $scope, $rootScope, Auth) {


	$scope.login = function(user) {
		Auth.login(user);
		$location.path("/list");
	}

	$scope.$on('$firebaseSimpleLogin:login', function() {
		$location.path('/');
	});

});