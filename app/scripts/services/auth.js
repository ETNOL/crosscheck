'use strict';



app.factory("Auth", function($rootScope, $firebaseSimpleLogin, FIREBASE_URL) {


	var ref = new Firebase(FIREBASE_URL);

	var auth = $firebaseSimpleLogin(ref);

	var Auth = {
		login:function(user) {
			return auth.$login('password', user);
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