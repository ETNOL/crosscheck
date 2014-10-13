'use strict';

app.controller('TeamCtrl', function($scope, Team, User) {

$scope.team;

	$scope.addMember = function() {
		var newMember = User.findByEmail($scope.newMember.email);
		newMember.$loaded(function() {
			var memberObject = newMember[0];
			Team.add(memberObject);
			$scope.newMember.email = '';
		});
	};


})