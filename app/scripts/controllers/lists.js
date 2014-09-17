'use strict';


app.controller("ListsCtrl", function($scope, $rootScope, $firebase, FIREBASE_URL, $location, User) {
	
	if ( !User.signedIn() ) {
		$location.path("/");
	}

	var ref = new Firebase(FIREBASE_URL + "/lists");

	$scope.user = User.getCurrent();

	$scope.lists = $rootScope.userLists;

	$scope.loadList = function (list) {
		$rootScope.listId = list.$id;
		$location.path("/list");
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