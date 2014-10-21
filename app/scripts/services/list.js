'use strict';


app.factory("List", function($rootScope, User, $firebase, FIREBASE_URL) {
	
	var List = {

		object:{},
		
		items:[],

		add: function (input) {
			this.items.$add(input);
		},
		remove: function(index) {
			this.items.$remove(index);
		},
		check: function(index) {
			//Checks will need its own Ref established to push each individually relative check//
			var currentUserId = $rootScope.currentUser.id;
			var checkedArray = [];
			
			if (this.items[index].checks) {
				for (var i = 0; i < this.items[index].checks.length; i++) {
					checkedArray.push(this.items[index].checks[i]);
				}
			}

			if (checkedArray.length == 0) {
				this.items[index].checks = {0:currentUserId};
			} else if (checkedArray.indexOf(currentUserId) == -1) {
				this.items[index].checks[checkedArray.length] = currentUserId;
			} else {
				var indexToDelete = checkedArray.indexOf(currentUserId);
				this.items[index].checks.splice(indexToDelete, 1);
			}
			
			this.items.$save(index);
		},
		checks: function(index) {
			if (this.items[index].checks) {
				return this.items[index].checks.length;
			} else {
				return 0;
			}			
		},

		resetList: function() {
			console.log("reset called!");
			for (var i = 0; i < this.items.length; i++) {
				this.items[i].checks = 0;
				this.items.$save(i);
			}
		},

		checksAsArray: function (index) {
			var checkArray = [];
			for (var i = 0; i < this.checks(index); i++) {
				checkArray.push(i);
			}
			return checkArray;
		},

		deleteList: function(listID) {
			var listRef = new Firebase (FIREBASE_URL + '/lists/' + listID.listid);
			listRef.remove();
			
		}
			
	};

	return List;
})