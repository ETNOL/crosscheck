'use strict';


app.controller("ListsCtrl", function($scope, $rootScope, $firebase, FIREBASE_URL, $location, User) {
	

	var ref = new Firebase(FIREBASE_URL + "/lists");


	$scope.user;

	$scope.lists;

	$scope.loadList = function (list) {
		$location.path( "list/" + list.$id );
	}

	$scope.newList = function() {
		var userId = $rootScope.currentUser.id;
		var list = new Firebase(FIREBASE_URL + "/lists/" + userId);
		var newList = {
			listName:$scope.newList.listName
		};
		list.push(newList);
	}

});