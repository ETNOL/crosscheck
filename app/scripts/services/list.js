'use strict';


app.factory("List", function($rootScope, $firebase, FIREBASE_URL) {


	var ref = new Firebase(FIREBASE_URL + "items" );

	var items = $firebase(ref).$asArray();

	var List = {
		
		all:items,
		
		add: function (input) {
			items.$add(input);
		},
		remove: function(index) {
			items.$remove(index);
		},
		check: function(index) {
			items[index].checked++;
			items.$save(index);
		},
		checks: function(index) {
			return items[index].checked;
		},

		resetList: function() {
			console.log("reset called!");
			for (var i = 0; i < items.length; i++) {
				items[i].checked = 0;
				items.$save(i);
			}
		}

	}

	return List;
})