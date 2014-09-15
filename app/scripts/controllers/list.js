'use strict';


app.controller('ListCtrl', function (Team, List, $scope) {


 $scope.items = List.all;

 $scope.teamSize = Team.all.length;

	$scope.totalChecks = function(index) {
		var checkArray = [];
		for (var i = 0; i < List.checks(index); i++) {
			checkArray.push(i);
		}
		return checkArray;
	};

	$scope.checks = function(index) {
		return $scope.items[index].checked;
	};

	$scope.checkItem = function(index) {
		List.check(index);
	};

	$scope.addItem = function () {
		List.add({
			item:$scope.item.description,
			checked:0
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


});