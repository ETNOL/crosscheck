'use strict';

app.controller('TeamCtrl', function($scope, Team, User) {

	$scope.team;

	$scope.openTeamMenu = false;
		
	$scope.teamMenu = function() {
			return $scope.openTeamMenu;
		};

	$scope.toggleTeamMenu = function() {
		$scope.openTeamMenu = !$scope.openTeamMenu;	
	};

	$scope.addMember = function() {
		var newMember = User.findByEmail($scope.newMember.email);
		newMember.$loaded(function() {
			var memberObject = newMember[0];

			if (memberObject == undefined ) {
				$scope.notificationStyle = "bg-danger";
				return $scope.notification = "Crosscheck member not found!";
			}
			Team.add(memberObject);
			confirmTeamMemberAdded();
		});
	};

	function confirmTeamMemberAdded () {
		$scope.notificationStyle = "bg-success";
		$scope.notification = "Team member added!";
		$scope.newMember.email = '';

	}


})