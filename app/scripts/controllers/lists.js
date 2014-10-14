'use strict';


app.controller("ListsCtrl", function($scope, $firebase, FIREBASE_URL, $location, User) {
	
	var listRef = new Firebase(FIREBASE_URL + "/lists");
	var userRef = new Firebase(FIREBASE_URL + "/crossCheckUsers");
	$scope.lists;

	$scope.user;

	$scope.loadList = function (list) {
		$location.path( "list/" + list.$id );
	}

	$scope.newList = function() {
		var lists = $firebase(listRef).$asArray();	
		var newList = newListObject();
			// First add to lists reference
		lists.$add(newList).then(function (list) {	
			var listId = list.name();
			var listName = $scope.newList.listName;
			//Then add to user's lists
			User.addList(listId, listName);
			$scope.newList.listName = "";	
		});
	}

	// Asynch init functions (for Firebase asynch user auth) //
	function initLists () {
		var user = User.getCurrent().then(function(user) {
			console.log(user);
			setUserOnScope(user);
			var username = User.findByEmail(user.email);
			username.$loaded(function() {
				setLists(username[0].$id);
			});
		});
	}

	function setLists(username) {
		$scope.lists = $firebase(userRef.child(username).child("lists")).$asArray();
	}

	function setUserOnScope(user) {
		$scope.user = user;
	}

	function newListObject() {
		return {
			listName:$scope.newList.listName,
			members:{owner: $scope.user }	
		};
	}

	initLists();

});