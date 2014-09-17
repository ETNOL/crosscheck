'use strict';


app.factory("List", function(User, $rootScope, $firebase, FIREBASE_URL) {
	
	var ref = new Firebase(FIREBASE_URL + "/lists")
	
	var list = $firebase(ref.child($rootScope.currentUser.$id).child($rootScope.listId)).$asObject();
	var items = $firebase(ref.child($rootScope.currentUser.$id).child($rootScope.listId).child("items")).$asArray();

	var List = {
		
		items:items,

		add: function (input) {
			items.$add(input);
		},
		remove: function(index) {
			items.$remove(index);
		},
		check: function(index) {
			items[index].checks++;
			items.$save(index);
		},
		checks: function(index) {
			return items[index].checks;
		},

		resetList: function() {
			console.log("reset called!");
			for (var i = 0; i < items.length; i++) {
				items[i].checks = 0;
				items.$save(i);
			}
		}
	};

	return List;
})