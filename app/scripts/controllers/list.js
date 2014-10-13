'use strict';


app.controller('ListCtrl', function (Team, List, $routeParams, $scope, User, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + "/lists")
 
	$scope.items;

	$scope.team;

	$scope.teamSize = Team.all.length;

	

	$scope.totalChecks = function(index) {
		var checkArray = [];
		for (var i = 0; i < List.checks(index); i++) {
			checkArray.push(i);
		}
		return checkArray;
	};

	$scope.checks = function(index) {
		return List.checks(index);
	};

	$scope.checkItem = function(index) {
		List.check(index);
	};

	$scope.addItem = function () {
		List.add({
			item:$scope.item.description,
			checks:0
							});
		$scope.item = {description:""};
	};

	$scope.checked = function (item) {
		if (item.checks == 1 ) {
			return true;
		}
	};

	$scope.resetList = function() {
		var confirmed = confirm("Are you sure you want to reset the list?");
		if (confirmed) {
			List.resetList();
		}
	};
	
	$scope.openTeamMenu = false;
	$scope.teamMenu = function() {
		return $scope.openTeamMenu;
	}
	$scope.toggleTeamMenu = function() {
		$scope.openTeamMenu = !$scope.openTeamMenu;	
	}

	

	function initializeListItems () {
		User.getCurrent().then(function(user) {
			console.log($routeParams);
			List.items = $firebase(ref.child(user.id).child($routeParams.listid).child("items")).$asArray();
			Team.members = $firebase(ref.child(user.id).child($routeParams.listid).child("team")).$asArray();
			$scope.items = List.items;
			$scope.team = List.team;
		})
	}

	initializeListItems();
});