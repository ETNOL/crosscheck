'use strict';


app.factory("List", function(User, $rootScope, $firebase, FIREBASE_URL) {
	
	var List = {
		
		items:[],

		setItems:function (itemsArray) {
			this.items = itemsArray;
		},

		add: function (input) {
			this.items.$add(input);
		},
		remove: function(index) {
			this.items.$remove(index);
		},
		check: function(index) {
			this.items[index].checks++;
			this.items.$save(index);
		},
		checks: function(index) {
			return this.items[index].checks;
		},

		resetList: function() {
			console.log("reset called!");
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].checks = 0;
				this.items.$save(i);
			}
		}
	};

	return List;
})