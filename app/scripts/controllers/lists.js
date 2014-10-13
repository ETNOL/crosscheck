'use strict';


app.controller("ListsCtrl", function($scope, $rootScope, $firebase, FIREBASE_URL, $location, User) {
	
	var listRef = new Firebase(FIREBASE_URL + "/lists");
	var userRef = new Firebase(FIREBASE_URL + "/crossCheckUsers");
	$scope.lists;

	$scope.loadList = function (list) {
		$location.path( "list/" + list.$id );
	}

	$scope.newList = function() {
		var userId = $rootScope.currentUser.id;
		var lists = $firebase(listRef).$asArray();

		var newList = {
			listName:$scope.newList.listName,
			members:{owner: $rootScope.currentUser}
		};

		lists.$add(newList).then(function(list) {
			var listId = list.name();
			var listName = $scope.newList.listName;
			User.addList(listId, listName);
			$scope.newList.listName = "";	
		});
	}

	// Asynch init functions (for Firebase asynch user auth) //
	function initLists () {
		var user = User.getCurrent().then(function(user) {
			var username = User.findByEmail(user.email);
			username.$loaded(function() {
				setLists(username[0].$id);
			});
		});
	}

	function setLists(username) {
		$scope.lists = $firebase(userRef.child(username).child("lists")).$asArray();
		console.log($scope.lists);
	}

	initLists();

});