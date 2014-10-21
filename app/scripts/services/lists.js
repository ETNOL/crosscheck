'use strict';
app.factory("Lists", ['$firebase', 'FIREBASE_URL', 'User', 
	function($firebase, FIREBASE_URL, User) {

	var Lists = {

		lists:undefined,

		newList: function (listsRef, list) {
			var lists = $firebase(listsRef).$asArray();
			lists.$loaded( function () {
				lists.$add(list).then(function (data) {
					var listID = data.name();
					var listName = list.listName;
					User.addList(listID, listName);
				});
			});
		}

	}



	return Lists;
}]);