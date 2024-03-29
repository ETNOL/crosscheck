'use strict';


app.controller('ListCtrl', function ($location, Team, List, $routeParams, $scope, User, $firebase, FIREBASE_URL) {
 
	$scope.items;

	$scope.team;	

	$scope.checksAsArray = function(index) {
		return List.checksAsArray(index);
	};

	$scope.checks = function(index) {
		return List.checks(index);
	};

	$scope.checkItem = function(index) {
		List.check(index);
	};

	$scope.addItem = function () {
		List.add(newItem());
		$scope.item.description = "";
	};

	$scope.resetList = function() {
		if ( confirm("Are you sure you want to reset the list?") ) {
			List.resetList();
		}
	};

	$scope.deleteList = function() {
		if ($scope.confirmDelete() ) {
			List.deleteList($routeParams.listid);
			Team.deleteLists($routeParams.listid, Team.members);
			$location.path('/lists');
		}
	}
	


	

	function initializeListItems () {
		User.getCurrent().then(function(user) {
			var ref = new Firebase(FIREBASE_URL + "/lists");
			List.object = $firebase(ref.child($routeParams.listid)).$asObject(); 
			List.items = $firebase(ref.child($routeParams.listid).child("items")).$asArray();
			Team.members = $firebase(ref.child($routeParams.listid).child("members")).$asArray();
			$scope.items = List.items;
			$scope.team = Team.members;
		})
	};

	function newItem () {
		return {
			item:$scope.item.description,
			checks:0
		}
	}

	$scope.confirmDelete = function () {
		return confirm("Are you sure you want to delete this list?");
	}

	initializeListItems();
});