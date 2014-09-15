'use strict';


app.factory('User', function($rootScope, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'crossCheckUsers');

	var lists = new Firebase(FIREBASE_URL + 'lists');

	var User = {

		create:function(authUser, username) {
			var user = $firebase(ref.child(username)).$asObject();

			return user.$loaded(function() {
				user.username = username;
				user.$priority = authUser.uid;
				user.$save();
			});
		},

		findByName: function(email) {
			if (name) {
				return $firebase(ref.child(email)).$asObject();
			}
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
		
		lists:function(username) {
			var userLists = $firebase(lists.child(username).$asArray();
				console.log(userLists);
				return userLists;
		}

	};

	// Sets up current user on the root scope during $firebase emitter at first load //
	function setCurrentUser (email) {
		$rootScope.currentUser = User.findByUsername(email);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid)).$asArray();

		query.$loaded(function () {
			setCurrentUser(query[0].name);
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
	});

	return User;

})