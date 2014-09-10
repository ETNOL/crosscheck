'use strict';


app.factory('User', function($rootScope) {

	var users = [
	{
		name:"Eric",
		avatar:"http://www.adventureforbreakfast.com/web/images/Eric.jpg"
	}, {
		name:"Ariel",
		avatar:"http://www.adventureforbreakfast.com/web/images/ariel.jpg"
	}];

	var User = {

		users:users,

		setCurrent:function(user) {
			$rootScope.currentUser = user;
		},

		getCurrent:function() {
			return $rootScope.currentUser;
		},

		signedIn:function() {
			return this.getCurrent() !== undefined;
		}

	}

	return User;

})