'use strict';


app.factory('User', function($rootScope, $location, $firebase, FIREBASE_URL) {

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

		getCurrent:function() {
			return $rootScope.currentUser;
		},

		signedIn:function() {
			return $rootScope.currentUser !== undefined;
		},
		// Grab user object and save it to $rootscope.
		initUser: function(user) {
			User.setCurrent(user);
			User.initLists(user.id);
			console.log("User initialized!");
		},
		
		initLists:function(id) {
			var userLists = $firebase(lists.child(id)).$asArray();
			$rootScope.userLists = userLists;
		}

	};

	// Sets up current user on the root scope during $firebase emitter at first load //
	function setCurrentUser (user) {
		User.initUser(user);
	}

$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
	console.log(authUser);
	var query = $firebase(ref.startAt(authUser.$id).endAt(authUser.$id)).$asArray();
	query.$loaded(function () {
		setCurrentUser(query[0]);
		$location.path("/lists");
	});
});

$rootScope.$on('$firebaseSimpleLogin:logout', function() {
	delete $rootScope.currentUser;
});

return User;

})