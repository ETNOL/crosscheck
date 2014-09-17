'use strict';



app.factory("Auth", function(User, $rootScope, $firebaseSimpleLogin, FIREBASE_URL) {


	var ref = new Firebase(FIREBASE_URL);

	var auth = $firebaseSimpleLogin(ref);

	var Auth = {
		register:function(user) {
			return auth.$createUser(user.email, user.password);
		},

		login:function(user) {
			user.rememberMe = "true";
			auth.$login('password', user).then(function(user) {
				console.log("Auth.login user:\n ");
				console.log(user);
				User.initUser(user);
			}, function(e) {
				console.log(e);
			});
		},
		signedIn:function() {
			return auth.user !== null;
		},
		logout:function() {
			auth.$logout();
		}

	};

	$rootScope.signedIn = function() {
		return Auth.signedIn();
	};


	return Auth;


});