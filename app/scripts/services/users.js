'use strict';


app.factory('User', function($rootScope, $firebase, FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL + 'users');



	var User = {

		setCurrent:function(user) {
			$rootScope.currentUser = user;
		},

		getCurrent:function() {
			return $rootScope.currentUser;
		},
		signedIn:function() {
			return $rootScope.currentUser !== undefined;
		}, 
	};

	
	function setCurrentUser (username) {
		$rootScope.currentUser = User.findByUsername(username);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid)).$asArray();

		query.$loaded(function () {
			setCurrentUser(query[0].username);
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function() {
		delete $rootScope.currentUser;
	});

	return User;

})