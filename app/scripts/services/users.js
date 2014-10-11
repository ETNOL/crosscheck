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
		var query = $firebase(ref.startAt(authUser.$id).endAt(authUser.$id)).$asArray();
		query.$loaded(function () {
			setCurrentUser(authUser);
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
		delete $rootScope.userLists;
		delete $rootScope.listId;
	});

	return User;

})