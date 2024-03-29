'use strict';


app.factory('User', function($rootScope, $q, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'crossCheckUsers');

	var User = {
		
		// User.create(authUser, username).then();
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

		// User.findByEmail(email).then();
		findByEmail:function(email) {
			return $firebase(ref.startAt(email).endAt(email)).$asArray();
		},

		// User.setCurrent(user);
		setCurrent:function(user) {
			$rootScope.currentUser = user;
		},

		//User.getCurrent();
		getCurrent:function () {
		  var deferred = $q.defer();

		  setTimeout(function() {
		    deferred.notify("fetching user...");

		    if ($rootScope.currentUser) {
		      deferred.resolve($rootScope.currentUser);
		    } else {
		      deferred.reject("User read failure");
		    }
		  }, 1500);

		  return deferred.promise;
		},

		// User.signedIn();
		signedIn:function() {
			return $rootScope.currentUser !== undefined;
		},

		// User.addList(listId, listName, email);
		addList:function(listId, listName, email) {
			var userEmail = email || $rootScope.currentUser.email;
			var userArray = this.findByEmail(userEmail);
			userArray.$loaded(function(user) {
				var username = user[0].$id;
				var userRef = $firebase(ref.child(username).child("lists").child(listId)).$asObject();
				userRef.$loaded(function() {
					userRef.name = listName;
					userRef.$save();
				});
			});	
		},

		// User.deleteList(listId, username);
		deleteList:function(listId, username) {
			var ref = new Firebase(FIREBASE_URL + '/crossCheckUsers/' + 
				username + '/lists/' + listId);
			ref.remove();
		}
	};

	// Sets up current user on the root scope during $firebase emitter at first load //

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		User.setCurrent(authUser);
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
		delete $rootScope.userLists;
		delete $rootScope.listId;
	});

	return User;

})