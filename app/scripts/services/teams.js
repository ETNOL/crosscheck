'use strict';


app.factory('Team', function(FIREBASE_URL) {

	var team = [
	{
		name:"Eric"
	},{
		name:"Ariel"
	}
	];

	var ref = new Firebase(FIREBASE_URL + 'teams');

	var Team = {
		
		all:team,
		
		memberCount:team.length
	};

	return Team;

});