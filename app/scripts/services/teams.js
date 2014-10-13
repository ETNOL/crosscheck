'use strict';


app.factory('Team', function(User, FIREBASE_URL) {

	var team = [
	{
		name:"Eric"
	},{
		name:"Ariel"
	}
	];

	var Team = {
		
		all:team,
		
		memberCount:team.length,

		add: function(email) {
			User.findByEmail(email).then(function(user) {
			console.log("User found!" + user);
			});
		}
	};

	return Team;

});