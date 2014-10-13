'use strict';

app.controller('TeamCtrl', function($scope, Team, List) {

$scope.team;

	$scope.addMember = function() {
		Team.add($scope.newMember.email);
	};


})