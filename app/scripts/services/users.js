'use strict';


app.factory('User', function($rootScope, $q, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'crossCheckUsers');

	var User = {

		create:function(authUser, username) {
			var user = $firebase(ref.child(username)).$asObject();

			return user.$loaded(function() {
				user.lists = "0";
				user.email = authUser.email;
				user.id = authUser.id;
				user.$priority = authUser.email;
				user.$save();
			});
		},

		findByEmail:function(email) {
			return $firebase(ref.startAt(email).endAt(email)).$asArray();
		},

		// findById: function(id) {
		// 	console.log("User.findById:" + id);
		// 	var user = $firebase(ref.child(id)).$asObject();
		// 	return user;
		// },

		// findByUsername: function(username) {
		// 	var deferred = $q.defer();
		//   setTimeout(function() {
		//     console.log("fetching user...");
		// 		var user = $firebase(ref.child(username)).$asObject();
		// 		if ( user != undefined ) {
	 //      	deferred.resolve(user);
	 //    	} else {
	 //      	deferred.reject("No user found");
	 //    	}
		//   }, 1000);

		//   return deferred.promise;
		// },

		setCurrent:function(user) {
			$rootScope.currentUser = user;
		},

		getCurrent:function () {
		  var deferred = $q.defer();

		  setTimeout(function() {
		    deferred.notify("fetching user...");

		    if ($rootScope.currentUser != undefined) {
		      deferred.resolve($rootScope.currentUser);
		    } else {
		      deferred.reject("User read failure");
		    }
		  }, 1000);

		  return deferred.promise;
		},

		signedIn:function() {
			return $rootScope.currentUser !== undefined;
		},

		addList:function(listId, listName, email) {
			var userEmail = email || $rootScope.currentUser.email;
			var userArray = this.findByEmail(userEmail);
			userArray.$loaded(function(user) {
				var username = user[0].$id;
				var userRef = $firebase(ref.child(username).child("lists").child(listId)).$asObject();
				userRef.$loaded(function() {
					console.log(userRef);
					userRef.name = listName;
					userRef.$save();
				});
			});	
		}

	};

	// Sets up current user on the root scope during $firebase emitter at first load //
	function setCurrentUser (user) {
		User.setCurrent(user);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		setCurrentUser(authUser);
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
		delete $rootScope.userLists;
		delete $rootScope.listId;
	});

	return User;

})