'use strict';


app.controller('ListCtrl', function (Team, User, List, $scope) {


 $scope.items = List.all;

 $scope.checkItem = function(index) {
	List.check(index);
	if ( List.countChecks == Team.memberCount ) {
		List.remove(index);
	}
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


});