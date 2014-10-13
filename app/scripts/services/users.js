'use strict';


app.factory('User', function($rootScope, $q, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'crossCheckUsers');

	var lists = new Firebase(FIREBASE_URL + 'lists');

	var User = {

		create:function(authUser, username) {
			console.log(authUser.id);
			var user = $firebase(ref.child(authUser.id)).$asObject();

			return user.$loaded(function() {
				user.email = authUser.email;
				user.id = authUser.id;
				user.$priority = authUser.uid;
				user.$save();
			});
		},

		findById: function(id) {
			var user = $firebase(ref.child(id)).$asObject();
			return user;
		},

		findByEmail: function(email) {
			var deferred = $q.defer();
		  setTimeout(function() {
		    console.log("fetching user...");
				var users = $firebase(ref).$asArray();
				for (var user in users) {
					console.log(user);
					if ( user.email && user.email == email) {
						console.log("if" + user);
		      	deferred.resolve(user);
		    	} else {
		    		console.log("else");
		      	deferred.reject("No user found");
		    	}
				}
		  }, 1000);

		  return deferred.promise;
		},

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

		initLists: function(user) {
			return $rootScope.lists = $firebase(lists.child(user.id)).$asArray();
		}

	};

	// Sets up current user on the root scope during $firebase emitter at first load //
	function setCurrentUser (user) {
		User.setCurrent(user);
		User.initLists(user);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		console.log(authUser);
		var query = $firebase(ref.child(authUser.id)).$asObject();
		query.$loaded(function () {
			setCurrentUser(query);
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
		delete $rootScope.userLists;
		delete $rootScope.listId;
	});

	return User;

})