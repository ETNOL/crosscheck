'use strict';



app.factory("Auth", function(User, $location, $rootScope, $firebaseSimpleLogin, FIREBASE_URL) {


	var ref = new Firebase(FIREBASE_URL);

	var auth = $firebaseSimpleLogin(ref);

	var Auth = {
		register:function(user) {
			return auth.$createUser(user.email, user.password);
		},

		login:function(user) {
			user.rememberMe = "true";
			auth.$login('password', user).then(function(user) {
				$location.path("/lists");
			}, function(e) {
				console.log(e);
			});
		},
		signedIn:function() {
			return auth.user !== null;
		},
		logout:function() {
			auth.$logout();
			$location.path('/');
			delete $rootScope.currentUser;
			delete $rootScope.userLists;
			delete $rootScope.listId;
		}

	};

	$rootScope.signedIn = function() {
		return Auth.signedIn();
	};


	return Auth;


});