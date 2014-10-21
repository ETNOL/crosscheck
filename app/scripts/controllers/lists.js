'use strict';


app.controller("ListsCtrl", function($scope, $firebase, FIREBASE_URL, $location, User, Lists) {
	
	var listRef = new Firebase(FIREBASE_URL + "/lists");
	var userRef = new Firebase(FIREBASE_URL + "/crossCheckUsers");
	$scope.lists;

	$scope.loadList = function (list) {
		$location.path( "list/" + list.$id );
	}

	$scope.newList = function() {
		Lists.newList(listRef, newListObject());
		$scope.newList.listName = "";	
	}

	$scope.deleteList = function (list) {
		Lists.deleteList(listRef, list);
	}

	// Asynch init functions (for Firebase asynch user auth) //
	function initLists () {
		var user = User.getCurrent().then(function(user_data) {
			var username = User.findByEmail(user_data.email);
			username.$loaded(function() {
				// Returns an array.  Maybe refactor findByEmail to unwrap?
				setLists(username[0].$id);
				setUser(username[0].$id);
			});
		});
	}

	function setLists(username) {
		//$scope.lists = $firebase(userRef.child(username).child("lists")).$asArray();
		Lists.lists = $firebase(userRef.child(username).child("lists")).$asArray();
		$scope.lists = Lists.lists
	}

	function setUser(user) {
		User.user = user;
	}

	function newListObject() {
		return {
			listName:$scope.newList.listName,
			members:{ owner:User.user  }	
		};
	}

	initLists();

});